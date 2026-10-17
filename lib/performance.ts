import { readFile } from "node:fs/promises";
import path from "node:path";

export type Measurement = {
  path: string;
  strategy: string;
  medianMs: number | null;
  averageMs: number | null;
  status: "not-measured" | "ok" | "partial" | "failed";
  responseStatuses: number[];
  warmupStatus?: number | null;
};

export type MeasurementResults = {
  measuredAt: string | null;
  baseUrl: string | null;
  iterations: number;
  note: string;
  results: Measurement[];
};

const emptyResults: MeasurementResults = {
  measuredAt: null,
  baseUrl: null,
  iterations: 0,
  note: "No production-server measurements have been saved yet.",
  results: [
    { path: "/posts", strategy: "SSG", medianMs: null, averageMs: null, status: "not-measured", responseStatuses: [] },
    { path: "/posts/1", strategy: "ISR · warm cache", medianMs: null, averageMs: null, status: "not-measured", responseStatuses: [], warmupStatus: null },
    { path: "/dashboard", strategy: "SSR", medianMs: null, averageMs: null, status: "not-measured", responseStatuses: [] },
    { path: "/rsc", strategy: "RSC · revalidate 300s", medianMs: null, averageMs: null, status: "not-measured", responseStatuses: [] },
  ],
};

export async function readMeasurements(): Promise<MeasurementResults> {
  try {
    const content = await readFile(path.join(process.cwd(), "data/ttfb-results.json"), "utf8");
    return JSON.parse(content) as MeasurementResults;
  } catch {
    return emptyResults;
  }
}