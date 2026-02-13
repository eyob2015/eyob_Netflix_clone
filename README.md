## eyob_Netflix_clone — Lightweight React Netflix-style UI

This is a React single-page application showcasing a Netflix-like UI: banner, rows of movie cards, detail pages and trailer playback.

Changes in this workspace:
- Banner PLAY button opens a modal trailer (YouTube) with replay/close controls.
- Navigation improved with a responsive hamburger menu and reduced scroll jank.
- Rows layout updated to show consistent poster columns.

Prerequisites
-----------
- Node.js >= 18 and npm.
- A TMDB API key (or whichever movie API you use) set as `REACT_APP_API_KEY` in a local `.env` file.

Quick start
-----------
1. Install dependencies:

```bash
npm install
```

2. Add your environment variable in `.env`:

```
REACT_APP_API_KEY=your_api_key_here
```

3. Run development server:

```bash
npm start
```

Production build
----------------
Create an optimized production build:

```bash
npm run build
```

The static output will be in the `build/` folder. Serve it with any static host (Netlify, Vercel, Firebase Hosting, GitHub Pages, AWS S3 + CloudFront, etc.).

Recommended deployment (quick): Netlify or Vercel
- Drag the `build/` folder to Netlify's deploy UI or connect the repo and set build command `npm run build` and publish directory `build`.
- On Vercel, import the repo and set `build` to `npm run build`.

Production checklist
--------------------
- Ensure `REACT_APP_API_KEY` is configured in your host's environment variables (do not commit it).
- Remove unused dependencies (this repo has been cleaned of server-only packages). If you maintain a separate backend, host it separately and point the frontend to the API URL.
- Use a CDN for large image assets or enable caching headers for the `build/` folder.

Cleaning dependencies
---------------------
This project is a frontend SPA. Server packages (express, body-parser, cors, mysql2, bcrypt, etc.) were removed from `dependencies` and testing libraries moved to `devDependencies`. Run `npm prune` and `npm install` after pulling changes to update `node_modules`.

Notes
-----
- Trailer playback uses `react-youtube` and the YouTube JS API to minimize suggested videos and show replay/close controls when the video ends.
- Row layout now uses CSS grid for consistent columns — adjust breakpoints in `src/components/Row/Row.css`.

Want me to deploy this to Netlify or Vercel for you? Provide the repo access or let me know which provider you prefer and I'll prepare deployment settings.

