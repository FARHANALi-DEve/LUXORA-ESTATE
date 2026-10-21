# LUXORA v5 — start here

**Do not deploy as production-ready before the release checks in `docs/QA-REPORT-v5.md`.** This source contains the original full-stack site plus a new 3D study, but its Next.js production build / live WebGL rendering / real database flows could not be certified in this sandbox.

## Preview the 3D first
Double-click `OPEN-3D-DEMO.html` for the offline standalone WebGL study (the demo is not your full Next.js website). Use drag to rotate, scroll to zoom, 01–06 camera controls to visit inside/outside, and OPEN FLOORS to slide walls and floors apart. It requires a browser with WebGL enabled.

## Run the actual website
Install Node.js 20.9+ and npm on a computer with internet access, optionally start local MongoDB. Open a terminal in this folder:

```bash
npm install
npm test
npm run build
npm run dev
```

Visit `http://localhost:3000` (home), `http://localhost:3000/experience` (3D), `/properties` (collection), and `/login` (owner access). For a database, copy `.env.example` to `.env.local`, set real credentials/MONGODB_URI, run `npm run db:check` and `npm run db:seed` as described in `docs/MONGODB-SETUP.md`.

## Verification honesty
This archive passed 39 Node.js tests and JS/JSX syntax checks, plus browser UI behavior checks with a **mock** WebGL context. Those checks do not validate actual GPU rendering, npm build or MongoDB. See `docs/QA-REPORT-v5.md`.
