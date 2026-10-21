# LUXORA v5 — QA and release status

## Scope and truth-in-advertising
This is a **Next.js/JavaScript source upgrade** to the user's existing LUXORA ESTATE real-estate website. It includes a procedural 3D building; it does **not** provide a surveyed property digital twin, furnished photorealistic GLB assets, a physical navigation collision engine, VR support, or a confirmed deployment. An interior camera *view* is not a complete WASD/free-walk system. All properties in the seed data are fictional.

## Changes implemented
- Six camera poses: aerial, front façade, pool, in-building ground-floor lounge, in-building upper bedroom suite, terrace. Accessible via six direct buttons or a timed tour.
- Front architectural panels physically slide away during exploded-floor animation; the lower ceiling slides aside, upper slab and roof lift independently. Clickable building markers select levels.
- Floor labels and highlighting, animated pool surface, day/night, orbit, zoom, wireframe, automatic orbit toggle, guided tour play/pause, reset, CSS immersive mode, responsive touch controls, reduced-motion support.
- WebGL2 detection before mounting the Next.js R3F canvas and a retryable fallback; homepage WebGL2 detection before mounting the hero canvas.
- Live 3D architectural art also mounts on collection/about headers, and property detail pages include the complete separate 3D study with an explicit notice that it does not depict that listing.
- Offline vanilla-WebGL architectural study upgraded with six camera views and moving façade sections, kept as a standalone proof rather than falsely representing the entire full-stack site.

## Verified in this environment
- `npm test`: **39/39 PASS** (includes tests for tour positions, cyclic navigation, existing API contract/local storage/validation and inventoried UI hooks).
- TypeScript's syntax parser used *only as a JavaScript/JSX parser*, not to add TypeScript to the project. No syntax diagnostics across inspected application and test JavaScript/JSX files.
- The self-contained demo's JavaScript parses with `node --check`.
- Browser DOM interaction smoke tests: six waypoint buttons, open floors, night mode, reset in Chromium at 1440x900 and 390x844, with **a fake WebGL context** (tests event wiring, not shaders or graphics). Zero JS page errors in those runs. CSS UI layout inspected at 1440, 768, 390 and 320px.

## NOT verified; blocks release certification
- `npm install`/`npm run build`: npm registry not resolvable (EAI_AGAIN); Next.js is not locally installed.
- **Actual visible GPU 3D render**: headless Chromium returned no real WebGL context, including SwiftShader attempts. Shader correctness, image quality, framerate and mesh occlusion require a real browser on a working GPU.
- Mobile GPU devices/real Safari/Firefox/Chrome; touch gesture smoothness and high/low-power performance.
- Live Atlas/MongoDB connection, protected admin login, inquiry submissions, image uploads and persistence, actual Next API requests.
- Cross-browser production integration, security audit, hosting setup and domain verification.

## Before handing out as production-ready
1. Use Node 20.9+ with npm network access; `npm install && npm test && npm run build` must all pass.
2. Set up `.env.local` with unique secrets and reachable MongoDB URI; `npm run db:check && npm run db:seed`.
3. Run `npm run dev`; validate full homepage and `/experience` on physical desktop and mobile WebGL2 browsers; click every control and inspect model with exploded and interior views.
4. Check `/properties`, detail pages, enquiry/admin login, CRUD, uploads, local/mobile menu and reduced-motion behavior end to end.
5. Only then release or deploy. Until then, call this **development source**, not a fully tested production website.
