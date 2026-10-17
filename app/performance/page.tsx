import type { Metadata } from "next";
import { readMeasurements } from "@/lib/performance";

export const metadata: Metadata = { title: "Performance comparison" };
export const dynamic = "force-dynamic";

function formatMs(value: number | null) {
  return value === null ? "—" : `${value.toFixed(1)} ms`;
}

export default async function PerformancePage() {
  const measurements = await readMeasurements();
  const isMeasured = Boolean(measurements.measuredAt);

  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">Response timing lab</p>
        <h1 className="section-title">A careful comparison</h1>
        <p className="lead">Saved Node.js response-time samples from a running production server. No demo numbers are filled in.</p>
      </section>
      <section className="container performance-wrap">
        <aside className="explain-box">
          <strong>How to refresh:</strong> run `npm run build`, start the production server with `npm run start`, then run `npm run measure:ttfb` in a second terminal. Set `BASE_URL` to select the server. The script uses a fixed route list and stores its real results in `data/ttfb-results.json`.
        </aside>
        <div className="table-scroll">
          <table className="performance-table">
            <thead><tr><th scope="col">Route</th><th scope="col">Rendering strategy</th><th scope="col">Median</th><th scope="col">Average</th></tr></thead>
            <tbody>
              {measurements.results.map((item) => (
                <tr key={item.path}>
                  <td><code>{item.path}</code></td><td>{item.strategy}</td>
                  <td>{formatMs(item.medianMs)}</td><td>{formatMs(item.averageMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote" aria-live="polite">{isMeasured ? `Last measured ${new Date(measurements.measuredAt!).toLocaleString()} · ${measurements.iterations} sample(s) per route · ${measurements.note}` : measurements.note}</p>
        <div style={{ marginTop: 28 }}>
          <h2 className="section-title" style={{ fontSize: 27 }}>Reading the results</h2>
          <p className="lead" style={{ fontSize: 14 }}>The script times Node.js `fetch()` until response headers arrive. This is an approximate server-side response timing, not browser-measured navigation TTFB. SSG and warm-cache ISR can be faster because they can serve prebuilt or cached output; SSR performs request-time work. ISR is explicitly warmed before samples, so this does not measure regeneration latency and cannot reliably force a regeneration event.</p>
          <p className="footnote">Browser check: Chrome DevTools → Network → select a document request → Timing → inspect Waiting for server response (TTFB). Network and browser conditions affect that measurement. RSC alone does not determine a route’s rendering strategy or TTFB; this route combines RSC with revalidation.</p>
        </div>
      </section>
    </>
  );
}