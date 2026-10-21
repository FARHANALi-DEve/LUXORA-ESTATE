# LUXORA ESTATE — IMMERSIVE WEBGL EDITION (v5)

This is an upgrade of the **original LUXORA ESTATE** Next.js project, not a disconnected template. Existing property listings, APIs, authentication, MongoDB/local store, and Farhan Ali founder footer remain in place.

## First: view the 3D immediately

Double-click **`OPEN-3D-DEMO.html`**. It is a **standalone zero-dependency WebGL prototype** that supports mouse/touch orbit, scroll zoom, 3D floor separation, movable façade sections, six cinematic camera viewpoints (including two inside the model), night shading, and reset. It is not the Next.js production site, but it makes the interactive geometry inspectable without installing packages. WebGL-capable browser required; fonts gracefully fall back if offline.

## Full Next.js experience

```bash
npm install
cp .env.example .env.local    # optional: adjust local DB / MongoDB configuration
npm run dev
```

Then visit `http://localhost:3000` and `http://localhost:3000/experience`.

**New full-site features:** live procedural 3D model in the homepage hero; full 3D studio page; six exterior/interior cinematic camera presets; orbit and pinch-to-zoom; interactive ground/upper-floor hotspots; animated exploded floors, moving façade and roof; day/night illumination; wireframe topology mode; auto-rotation; reset; immersive full-screen view; mobile-aware controls and reduced-motion preference. These are real Three.js/WebGL meshes, not screenshots or CSS-only imitations.

**Accuracy note:** this is a fictional/conceptual architectural model, not a surveyed 3D asset or an accurate floor plan of a property for sale. Real property tours need licensed photos, actual 3D scans/GLB/BIM assets, and authorization from the relevant rights holder.

**Verification in this delivery:** 39 Node.js test cases pass, the WebGL preview JavaScript passes syntax validation, and browser UI interactions were exercised in a mock-WebGL environment at desktop/mobile widths. **These tests do not verify GPU rendering.** The Next.js production build and MongoDB API end-to-end flows remain unverified: npm registry DNS is unavailable in this runtime (`EAI_AGAIN`) and headless Chromium has no working WebGL context. Read `docs/QA-REPORT-v5.md` before release; do not describe this ZIP as production-certified.

---

# LUXORA ESTATE — Luxury Real Estate in 3D

An original, cinematic full-stack real-estate concept built with **Next.js App Router, JavaScript/JSX, MongoDB + Mongoose, MongoDB GridFS, Tailwind CSS, GSAP and React Three Fiber / Three.js**. No TypeScript. The code includes a public site, live-mesh 3D architectural scene, property explorer and owner management studio.

> **Demonstration note:** Included property names, geographical associations, prices and availabilities are **fictional**. The photography is illustrative Unsplash stock photography rather than images of actual listed residences. The 3D villa is a **procedural architectural study**, not an interior walk-through or a digital twin. Viewing requests are **not confirmed bookings**. This is source code, not a deployed and fully certified production service.

## Run the project with a REAL MongoDB database

Requires Node.js 20.9+ and npm. Choose either MongoDB Atlas (cloud) or MongoDB running locally.

### Option 1: Local MongoDB through Docker

```bash
docker compose up -d
npm install
cp .env.example .env.local
```

Windows PowerShell: replace `cp` with `Copy-Item .env.example .env.local`. Edit `.env.local`: provide your own `ADMIN_EMAIL`, strong `ADMIN_PASSWORD`, random `AUTH_SECRET` (at least 32 characters) and site contact email. The sample already contains `mongodb://127.0.0.1:27017/luxora_estate`.

```bash
npm run db:check
npm run db:seed
npm test
npm run dev
```

Open `http://localhost:3000` for the site, `/experience` for interactive Three.js, `/properties` for listings and `/login` to access `/admin`. In the admin header, the connection indicator reports whether MongoDB is connected, offline, or only a local demo store.

### Option 2: MongoDB Atlas

Set the Atlas URI as `MONGODB_URI` in `.env.local` instead of the local URL. Make sure the Atlas database user, password and network rules allow the connection. `npm run db:check` verifies your connection and `npm run db:seed` adds the fictional showcase properties **without altering already existing records**. See **[docs/MONGODB-SETUP.md](docs/MONGODB-SETUP.md)** for exact setup and troubleshooting.

### Temporary demo without MongoDB

Remove the `MONGODB_URI` value and run in development. Listings and inquiries then persist in `data/local-store.json` on that one computer, and uploads in `public/uploads`. This is **not** MongoDB and **not** designed for production. Production refuses to silently switch to demo storage when MongoDB is unavailable. Configure a real DB before a real deployment.

## Creator profile in the global footer

The public-site footer now includes the user's supplied professional portrait (`public/images/farhan-ali-portrait.jpg`) and **Farhan Ali's** portfolio signature, verified role summary, technology capabilities, portfolio project highlights, and GitHub/LinkedIn/email links. It appears on the public pages only; the owner dashboard and login retain their private layouts. The portrait ships locally with the app and needs no third-party image service. Update the portrait in `public/images/` and edit `components/Footer.jsx` to customize the creator profile. There are no invented degrees, certificates, awards, or real-estate agency affiliations.

The static HTML previews (`preview.html` and `preview-offline.html`) and `previews/founder-desktop.png` / `previews/founder-mobile.png` demonstrate layout only. These files are not evidence of Next.js runtime or database connection.

## Application routes and functionality

| Route | Function |
| --- | --- |
| `/` | Cinematic homepage, real-time listings from configured storage, editorial sections, interactive 3D scene |
| `/experience` | Full-browser 3D study with six 3D camera positions, two first-person interior views, orbit, opening walls/floors, day/night, wireframe, and guided tour |
| `/properties` | Browse/search/sort/filter all residences |
| `/properties/[slug]` | Dynamic detail page, gallery, amenities, inquiry/private viewing form |
| `/contact` | Contact inquiry form saved to the database |
| `/about` | Brand information |
| `/login` | Owner login from environment credentials |
| `/admin` | Manage properties, cover and gallery uploads, inquiries, viewing dates and statuses |
| `/api/properties` and `/api/properties/[id]` | Public list + authenticated create/update/delete |
| `/api/inquiries` | Public submit + authenticated private inbox and status changes |
| `/api/upload` | Authenticated JPG/PNG/WebP upload (5 MB max) |
| `/api/media/[id]` | Read persistent image bytes from MongoDB GridFS |
| `/api/system` | **Admin-only** database status and ping |

## MongoDB collections

- `properties`: editable listings and featured status (Mongoose schema with unique slug).
- `inquiries`: visitors' messages and preferred viewing date/time (admin-inbox status can change).
- `property_media.files` and `property_media.chunks`: durable uploaded image bytes stored through MongoDB GridFS when a URI is configured. The server does not depend on its local filesystem for images in MongoDB mode.

For a first demo, `npm run db:seed` upserts sample properties without overwriting properties you have already edited. All privileged API routes check signed, HTTP-only admin cookies. A 12-hour session is used; server-side validation applies to input. A public deployment still requires security hardening, backups, monitoring, abuse protection across instances and privacy/legal review.

## Known limits and test evidence

- **Automated JavaScript contracts** and **source syntax checks** can run without a network. Check `docs/VERIFICATION.md` for executed results.
- This authoring runtime cannot reach npm registry, run a full Next.js build, test a live browser app, or reach your MongoDB cluster; these are **not claimed as verified**. Test `npm run build` and end-to-end workflows on your machine.
- The included `preview-offline.html` and screenshots are *static design previews*, not screenshots of a live Next.js/WebGL app.
- No emailing, SMS, actual calendar booking, payment flow, GIS search or registered business integration is supplied; contact requests appear in the admin inbox only.
- Unsplash imagery and Google fonts require browser internet access; replace demo photography with cleared, accurate real listing photography before commerce.

See [START-HERE.md](START-HERE.md), [docs/MONGODB-SETUP.md](docs/MONGODB-SETUP.md), [docs/INTEGRATION-MATRIX.md](docs/INTEGRATION-MATRIX.md) and [docs/VERIFICATION.md](docs/VERIFICATION.md).

**Security:** Never commit your real `.env.local`, Atlas URI, admin password or AUTH_SECRET. `.gitignore` excludes these files.
