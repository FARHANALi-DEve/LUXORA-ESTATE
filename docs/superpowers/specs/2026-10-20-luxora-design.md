# LUXORA ESTATE — Design specification

## Objective
Deliver an original luxury real-estate portfolio and demonstrable full-stack property browsing application using JavaScript exclusively. The brand targets high-end buyers looking for discoverable listings and an immersive inspection experience. Sample listings are fictional.

## Visual design
Original editorial direction, rather than copying a site: oversized warm-white typographic overlays on architectural photography, dark forest-ink typography, pale sandstone backgrounds, restrained antique-gold accents, asymmetric editorial grids. 3D is an intentional architecture inspection moment and not a distracting background across all pages. Main flows stay usable without WebGL and under reduced-motion.

## Routes and flows
Home: cinematic hero > featured residences > interactive Three.js villa > story > consultation. Browse: live properties fetched from API with text, city, type and price filters. Dedicated WebGL studio: full-width 3D architectural visualization. Details: listing gallery, specifications, inquiry form. About, contact and admin login. Authenticated admin: inventory CRUD, uploads (local server storage), inquiry status changes and deletion.

## Technical requirements
Next.js App Router + React JSX + Tailwind with custom component CSS; Three.js/R3F and Drei; GSAP; API routes; optional MongoDB/Mongoose. Without MongoDB, development uses atomic local JSON store so UI workflows can be exercised. Auth uses signed HTTP-only cookie and configured credentials, not hard-coded demo password. No TypeScript. Assets for photos are externally hosted, require internet, and represent inspirational stock illustration not actual listings.

## Acceptance and constraints
Responsive desktop/mobile layout; keyboard accessible buttons/inputs; forms with validation, loading and success/error states; WebGL scene orbit/zoom controls; API admin CRUD authorization; tests for validation; security and deployment docs. Production requires database, a production media storage strategy, admin secrets, verified listings, and licensed photo replacement.
