# LUXORA database reliability plan — 2026-10-20

## Goals
- Existing JavaScript-only website reads/writes real MongoDB collections when MONGODB_URI is set.
- Development remains runnable without any external credential through explicit local demo mode; production fails safely without a database.
- Admins can check database status, seed initial demo inventory intentionally and upload images that persist in MongoDB GridFS.
- Database connection failure must not be misrepresented as empty inventory or silently replaced by demo data.
- Preserve all 3D, animation, listing and admin UI features.

## Tasks and evidence
1. Centralize runtime DB mode/URI checks; unit test URI validation and fallback policy.
2. Implement a cached Mongoose connection + GridFS media helpers; test media URL validation and smoke-check JS syntax.
3. Update store with coherent Mongo record serialization + safe CRUD and collision handling; run integration contracts and local persistence tests.
4. Add admin-only DB status endpoint and dashboard indicator; verify auth is checked before providing status.
5. Provide seed/check/credential scripts, Docker Compose, setup docs; verify scripts syntax and contract tests.
6. Remove fake inventory fallback when database is unavailable; show proper error screen and document remaining environmental limitations.
7. Zip final code; independently verify archive integrity, included paths and test output. No production verification claim without a real MongoDB connection.

## Constraints
No TypeScript. Do not include real connection strings or admin secrets. Persist real uploaded media in MongoDB or a local development directory according to mode. Do not imply a booking is confirmed by a viewing request. Keep visual 3D scene as a representational model, not an imported photorealistic building.
