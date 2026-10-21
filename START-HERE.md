# LUXORA ESTATE — Start here

**This release adds a real MongoDB connection layer, an import script, an admin-side database status indicator and MongoDB GridFS storage for uploaded images.**

1. Extract the ZIP into a folder.
2. Install Node.js 20.9+ and (for local MongoDB) Docker Desktop.
3. Run `docker compose up -d` from the project folder.
4. Run `npm install`.
5. Copy `.env.example` to `.env.local` and replace your admin credentials and AUTH_SECRET. Keep the local `MONGODB_URI` as shown.
6. Run `npm run db:check`, then `npm run db:seed`, then `npm run dev`.
7. Visit `http://localhost:3000` and admin login at `http://localhost:3000/login`.

For Atlas, follow [docs/MONGODB-SETUP.md](docs/MONGODB-SETUP.md). **No real MongoDB connection is possible until your own credentials are supplied.** Do not upload `.env.local` to GitHub.

`npm test` checks JavaScript data/validation contracts. Run `npm run build` and manual browser tests on a machine that can install packages; passing unit tests alone does not certify a live deployment.

### Creator portrait and footer

Your supplied portrait is already included under `public/images/farhan-ali-portrait.jpg`. The footer component at `components/Footer.jsx` contains your professional bio, skills, project summaries and public GitHub/LinkedIn/email contact links. You can update these values directly in the JSX. Visit the bottom of any public page to view the section.
