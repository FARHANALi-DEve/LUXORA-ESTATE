# LUXORA v3 — Integration and acceptance matrix

| User flow | Frontend | API and persisted data | Evidence level |
| --- | --- | --- | --- |
| Browse homes | `/`, `/properties` | `listProperties()` selects `Property` Mongoose model or local demo | Code/syntax checks; live Mongo untested |
| Residence details | `/properties/[slug]` | `findProperty(slug)` reads database record; now reports DB failure instead of false 404 | Code/syntax checks |
| Search/filter/sort | `PropertyExplorer.jsx` | Frontend filters API-sourced property collection | Automated filter tests pass |
| Save inquiry | `InquiryForm.jsx` | `POST /api/inquiries` → `inquiries` collection or local store | Validation/local persistence tests pass; live Mongo untested |
| Request viewing | Detail form date/time → admin inbox | Same inquiry API, `requestType` / `viewingDate` / `viewingTime` | Date validation and local persistence tests pass |
| Admin sign in | `/login` | HTTP-only signed session → restricted APIs | Code/syntax checked; browser flow not exercised |
| Admin property CRUD | `/admin` | Authenticated `/api/properties` CRUD → `properties` | Server-side code/syntax checked; live Mongo untested |
| Admin inquiry statuses | `/admin` | Authenticated `GET/PATCH/DELETE /api/inquiries` | Code/syntax checked; live Mongo untested |
| Upload cover/gallery | `/admin` | `POST /api/upload`: MongoDB GridFS in DB mode, local filesystem in demo mode | File signature, URL and route code checks; live upload untested |
| Download hosted image | Public property pages | `GET /api/media/[id]`: GridFS file/chunks, MIME validated | URL contract checks; live stream untested |
| Check DB | Admin header | Authenticated `GET /api/system` → MongoDB `ping` | Code/syntax checked; actual ping not tested |
| Seed examples | Terminal `npm run db:seed` | Upsert `$setOnInsert` into MongoDB `properties` | Script code/syntax checked; live Mongo untested |
| Interactive 3D | `/experience` | Real R3F WebGL mesh model, OrbitControls, scene controls | Code/syntax checked; live GPU/WebGL untested |

**Production gate**: install dependencies, connect real MongoDB, run production build, browser test all frontend/API workflows, test deployed image media and conduct security/privacy review before launching to customers.
