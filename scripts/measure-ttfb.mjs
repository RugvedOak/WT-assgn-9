import { rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

const baseUrl = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const iterations = Number.parseInt(process.env.ITERATIONS ?? "100", 10);
if (!Number.isInteger(iterations) || iterations < 1 || iterations > 100) {
  throw new Error("ITERATIONS must be an integer between 1 and 100.");
}

const routes = [
  { path: "/posts", strategy: "SSG" },
  { path: "/posts/1", strategy: "ISR · warm cache", warm: true },
  { path: "/dashboard", strategy: "SSR" },
  { path: "/rsc", strategy: "RSC · revalidate 300s" },
];

async function request(pathname) {
  const started = performance.now();
  try {
    const response = await fetch(new URL(pathname, `${baseUrl}/`), { redirect: "manual" });
    const elapsedMs = performance.now() - started;
    await response.body?.cancel();
    return { elapsedMs, status: response.status };
  } catch (error) {
    return { elapsedMs: null, status: null, error: error instanceof Error ? error.message : String(error) };
  }
}

function median(values) {
  const ordered = [...values].sort((a, b) => a - b);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}

const results = [];
for (const route of routes) {
  const warmup = route.warm ? await request(route.path) : null;
  const samples = [];
  for (let index = 0; index < iterations; index += 1) samples.push(await request(route.path));
  const successfulTimes = samples.filter((sample) => sample.status !== null && sample.status >= 200 && sample.status < 400 && sample.elapsedMs !== null).map((sample) => sample.elapsedMs);
  const failureCount = samples.length - successfulTimes.length;
  const statuses = samples.map((sample) => sample.status);

  results.push({
    path: route.path,
    strategy: route.strategy,
    medianMs: successfulTimes.length ? Number(median(successfulTimes).toFixed(2)) : null,
    averageMs: successfulTimes.length ? Number((successfulTimes.reduce((sum, value) => sum + value, 0) / successfulTimes.length).toFixed(2)) : null,
    status: successfulTimes.length === 0 ? "failed" : failureCount === 0 ? "ok" : "partial",
    responseStatuses: statuses,
    warmupStatus: warmup?.status ?? null,
    samples: samples.map((sample) => ({ status: sample.status, elapsedMs: sample.elapsedMs === null ? null : Number(sample.elapsedMs.toFixed(2)), ...(sample.error ? { error: sample.error } : {}) })),
  });
}

const outputPath = path.resolve("data/ttfb-results.json");
const temporaryPath = `${outputPath}.tmp`;
const resultDocument = {
  measuredAt: new Date().toISOString(),
  baseUrl,
  iterations,
  note: "Node.js fetch() time until response headers; approximate response timing, not browser TTFB. ISR samples follow a warm-up request and do not measure regeneration.",
  results,
};
await writeFile(temporaryPath, `${JSON.stringify(resultDocument, null, 2)}\n`);
await rename(temporaryPath, outputPath);

for (const result of results) {
  console.log(`${result.path.padEnd(14)} ${result.status.padEnd(7)} median=${result.medianMs === null ? "n/a" : `${result.medianMs} ms`} average=${result.averageMs === null ? "n/a" : `${result.averageMs} ms`} statuses=${result.responseStatuses.map((status) => status ?? "ERR").join(",")}${result.warmupStatus === null ? "" : ` warmup=${result.warmupStatus}`}`);
  for (const sample of result.samples) if (sample.error) console.error(`  ${result.path}: ${sample.error}`);
}
console.log(`Saved actual samples to ${outputPath}`);