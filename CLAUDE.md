# CLAUDE.md

Developer dashboard for ~/Documents/Code/ projects.

## Architecture
- React + Vite SPA
- Data: `collect.sh` generates `public/data.json` (run before build)
- No backend, no API routes -- pure static site
- Design tokens from Tally project (navy/blue/glass morphism)

## Key Files
- `src/App.jsx` -- main dashboard component
- `src/App.css` -- all styles (design tokens inline)
- `collect.sh` -- data collection script (scans git repos, gh CLI, GitHub API)
- `public/data.json` -- generated data (not committed)

## Commands
- `bash collect.sh` -- refresh project data
- `npm run dev` -- dev server (port 5173)
- `npm run build` -- production build to dist/

## Notes
- collect.sh uses `gh` CLI for Actions status and Vercel deploy status
- Live URLs are hardcoded in collect.sh per project
- Cards animate in with staggered fadeSlideIn
- Filter system: all / today / live / failing
