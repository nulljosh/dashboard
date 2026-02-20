# dashboard

Developer dashboard for monitoring all projects in ~/Documents/Code/.

## Features

- Real-time view of all Git repos with commit status
- GitHub Actions CI pass/fail tracking
- Vercel deployment status
- Live URL links for deployed projects
- Filter by: all, updated today, live, failing
- Dark theme with glass morphism (Tally design system)

## Stack

- React + Vite
- Static JSON data via `collect.sh`
- No backend required

## Usage

```bash
# Collect fresh data from all repos
bash collect.sh

# Dev server
npm run dev

# Build
npm run build
```

## Data Collection

`collect.sh` scans every git repo in ~/Documents/Code/ and outputs `public/data.json` with:
- Repo name, branch, last commit, dirty status
- GitHub Actions conclusion (via `gh` CLI)
- Vercel deployment state (via GitHub deployments API)
- Live URLs for deployed projects

## Design

Navy dark theme pulled from the Tally project design tokens. DM Sans + Fraunces typography. Glass morphism cards with staggered fade-in animations.
