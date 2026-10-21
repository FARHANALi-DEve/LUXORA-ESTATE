# Connect a real MongoDB database to LUXORA ESTATE

These steps work with local MongoDB or MongoDB Atlas. Real network credentials have **not** been added to the ZIP, intentionally. Never send the URI or password in a public GitHub repository.

## Option A — Local MongoDB (recommended first test)

1. Install Node.js 20.9+ and Docker Desktop on your Windows computer (enable the Docker engine).
2. Extract the ZIP. From a terminal opened in its root, run:

   ```bash
   docker compose up -d
   npm install
   ```
3. Copy `.env.example` to `.env.local` (Windows PowerShell: `Copy-Item .env.example .env.local`). The example already contains a local connection URL:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/luxora_estate
   MONGODB_DB_NAME=luxora_estate
   DATABASE_MODE=auto
   ```

4. Replace `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `AUTH_SECRET` with your own private values. Make `AUTH_SECRET` at least 32 unpredictable characters, e.g. `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
5. Run:

   ```bash
   npm run db:check
   npm run db:seed
   npm test
   npm run dev
   ```

6. Open `http://localhost:3000` for the website and `/login` for your admin dashboard. In the admin header, the database indicator should say **MongoDB · luxora_estate**. The sample listings are deliberately fictional.

**Important:** `docker compose down` stops the service without deleting the named database volume. `docker compose down -v` destroys local database content — only run that if you explicitly want to delete it.

## Option B — MongoDB Atlas

1. In MongoDB Atlas create a cluster, a dedicated database user and an IP/network access rule that permits **your** trusted client or deployment address. Keep privileges minimal.
2. Copy the Atlas application connection URI and put it into `.env.local`:

   ```env
   MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_URL_ENCODED_PASSWORD@YOUR_CLUSTER.mongodb.net/luxora_estate?retryWrites=true&w=majority
   MONGODB_DB_NAME=luxora_estate
   DATABASE_MODE=auto
   ```

3. URL-encode password characters such as `@`, `/`, `#` and `:`. Never commit `.env.local` or post the completed URI in chat.
4. Run `npm install`, `npm run db:check`, `npm run db:seed` and `npm run dev` on a device that can reach your Atlas cluster.
5. For deployment, configure the same values as secrets in your hosting provider. Verify the public app and admin end-to-end before opening it to visitors.

## What is saved and where

| Data | MongoDB storage | Admin access |
| --- | --- | --- |
| Listing details, prices, locations, amenities, cover URL, status | `properties` collection | Create / update / delete |
| Name, email, message, preferred viewing date/time | `inquiries` collection | Read / change status / delete |
| Admin-uploaded property images | GridFS `property_media.files` + `property_media.chunks` | Upload through admin; public images fetched via `/api/media/:id` |

The `npm run db:seed` importer uses **upsert with `$setOnInsert`**: it adds missing fictional demo listings but never overwrites listings edited by the administrator. Run it only if demo properties are appropriate; you can instead create your own via `/admin`.

Without `MONGODB_URI`, local **development** falls back to `data/local-store.json` and files under `public/uploads`. This is not a real MongoDB server and is not production-ready. With a configured URI, the app does **not** silently switch to local data when MongoDB fails. Production also refuses local fallback unless `DEMO_MODE=1` was explicitly enabled for a temporary showcase. Do not enable demo mode for a live business.

## Troubleshooting

- **`ECONNREFUSED 127.0.0.1:27017`** — Start Docker Compose (`docker compose up -d`) or your local MongoDB service.
- **`querySrv ENOTFOUND`** — Check Atlas host, DNS, internet and VPN.
- **`Authentication failed`** — Check database username/password, URI encoding and user permissions.
- **`IP not whitelisted` / timeout** — Check Atlas Network Access rules and outbound firewall.
- **Admin shows “Database offline”** — Run `npm run db:check` from the same environment as Next.js and review terminal logs.
- **No listings** — A new Atlas database is empty; run `npm run db:seed` or add a residence in `/admin`.
- **Image fails after upload** — Check GridFS read handler `/api/media/:id`, database privileges and allowed image types. Do not deploy local filesystem storage to a read-only or ephemeral hosting platform.

## Honest limits

This ZIP contains working application code for connecting to MongoDB, but a successful connection to *your* cluster cannot be demonstrated until your URI, permitted network and MongoDB service are available. The 3D scene is a procedural design study, not a photorealistic digital twin or a confirmed booked visit. This demonstration has one owner/admin account configured via environment variables. Add stronger operational security (distributed rate limiting, private network rules, backups, monitoring) before public commercial deployment.
