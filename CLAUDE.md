# CLAUDE.md

Developer dashboard for ~/Documents/Code/ projects.

## Architecture

- React + Vite SPA
- Vite plugin serves `/data.json` at runtime via `server/collect.js` (no shell script)
- Data is collected live on each request, cached 60s in memory
- No build-time data step required

## Key Files

- `src/App.jsx` — main dashboard component
- `src/App.css` — all styles (design tokens inline)
- `server/collect.js` — data collection module (scans git repos, gh CLI, GitHub API)
- `vite.config.js` — registers the Vite plugin that serves /data.json

## Commands

- `npm run dev` — dev server (port 5173, data refreshes live)
- `npm run build` — production build to dist/

## Notes

- `server/collect.js` uses `gh` CLI for Actions status and Vercel deploy status
- Live URLs are hardcoded in `server/collect.js` per project
- Cards animate in with staggered fadeSlideIn
- Filter system: all / today / live / failing
- Date format is ISO 8601 strict (`%aI`) so `new Date()` parses correctly
