# Fieldnotes Blog

A small Next.js App Router project comparing static generation, incremental static regeneration, server rendering, and React Server Components with JSONPlaceholder data.

## Requirements

- Node.js 20.9 or later
- Network access to JSONPlaceholder during the production build and when testing request-time routes

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to explore the app.

## Verify rendering modes

```bash
npm run typecheck
npm run lint
npm run build
```

The build summary identifies prerendered (`○`/`●`) and dynamic (`ƒ`) routes. `/posts` is statically generated, `/posts/[id]` is generated for IDs 1-10 and revalidated every 60 seconds, and `/dashboard` is rendered dynamically for each request. `/rsc` is an RSC route revalidated every 5 minutes; RSC is an architecture, not a rendering mode.

## Measure response timing

Start the production server in one terminal:

```bash
npm run start
```

In another terminal, run `npm run measure:ttfb`. Set `BASE_URL` to target another running production server and `ITERATIONS` to change the number of samples, for example `BASE_URL=http://localhost:3001 ITERATIONS=7 npm run measure:ttfb`. The script warms `/posts/1` before timing ISR and saves actual results to `data/ttfb-results.json`; the performance page reads that file. Re-run the script to refresh it. The warm-up does not force a regeneration, so the script cannot measure the regeneration event itself.

These timings approximate Node.js time until `fetch()` receives response headers; they are not browser navigation TTFB. To inspect browser TTFB, open Chrome DevTools → Network, select a document request, and inspect Timing (especially Waiting for server response / TTFB). Browser timings include browser and network conditions and are not directly comparable to this script.

All user and post content is public mock data from JSONPlaceholder. The dashboard has no authentication and does not represent a real user account.