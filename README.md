# dashboard

Developer dashboard for monitoring all projects in ~/Documents/Code/.

<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;background:#f8fafc;border-radius:12px;display:block;max-width:100%">
  <rect width="680" height="400" fill="#f8fafc" rx="12"/>

  <!-- Root node -->
  <rect x="270" y="20" width="140" height="36" rx="8" fill="#6366f1" stroke="#4338ca" stroke-width="1.5"/>
  <text x="340" y="43" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">dashboard/</text>

  <!-- Vertical trunk -->
  <line x1="340" y1="56" x2="340" y2="88" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Horizontal bar -->
  <line x1="80" y1="88" x2="600" y2="88" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Branch drops -->
  <line x1="80" y1="88" x2="80" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="220" y1="88" x2="220" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="360" y1="88" x2="360" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="490" y1="88" x2="490" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="600" y1="88" x2="600" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- src/ folder -->
  <rect x="30" y="110" width="100" height="32" rx="6" fill="#6366f1" stroke="#4338ca" stroke-width="1.5"/>
  <text x="80" y="130" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">src/</text>

  <!-- server/ folder -->
  <rect x="165" y="110" width="110" height="32" rx="6" fill="#6366f1" stroke="#4338ca" stroke-width="1.5"/>
  <text x="220" y="130" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">server/</text>

  <!-- public/ folder -->
  <rect x="305" y="110" width="110" height="32" rx="6" fill="#6366f1" stroke="#4338ca" stroke-width="1.5"/>
  <text x="360" y="130" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">public/</text>

  <!-- vite.config.js -->
  <rect x="445" y="110" width="100" height="32" rx="6" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.5"/>
  <text x="495" y="130" text-anchor="middle" fill="#0369a1" font-size="11">vite.config.js</text>

  <!-- package.json -->
  <rect x="557" y="110" width="100" height="32" rx="6" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.5"/>
  <text x="607" y="130" text-anchor="middle" fill="#0369a1" font-size="11">package.json</text>

  <!-- src/ children lines -->
  <line x1="80" y1="142" x2="80" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="30" y1="170" x2="130" y2="170" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="30" y1="170" x2="30" y2="186" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="80" y1="170" x2="80" y2="186" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="170" x2="130" y2="186" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- App.jsx -->
  <rect x="4" y="186" width="52" height="28" rx="6" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
  <text x="30" y="204" text-anchor="middle" fill="#3730a3" font-size="10">App.jsx</text>

  <!-- App.css -->
  <rect x="54" y="186" width="52" height="28" rx="6" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
  <text x="80" y="204" text-anchor="middle" fill="#3730a3" font-size="10">App.css</text>

  <!-- main.jsx -->
  <rect x="104" y="186" width="52" height="28" rx="6" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
  <text x="130" y="204" text-anchor="middle" fill="#3730a3" font-size="10">main.jsx</text>

  <!-- server/ children line -->
  <line x1="220" y1="142" x2="220" y2="186" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- collect.js -->
  <rect x="163" y="186" width="114" height="28" rx="6" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
  <text x="220" y="204" text-anchor="middle" fill="#3730a3" font-size="10">collect.js</text>

  <!-- public/ children line -->
  <line x1="360" y1="142" x2="360" y2="186" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- data.json -->
  <rect x="305" y="186" width="110" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="360" y="204" text-anchor="middle" fill="#166534" font-size="10">data.json (runtime)</text>

  <!-- Legend -->
  <rect x="30" y="340" width="14" height="14" rx="3" fill="#6366f1"/>
  <text x="50" y="352" fill="#475569" font-size="11">folder</text>
  <rect x="110" y="340" width="14" height="14" rx="3" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.5"/>
  <text x="130" y="352" fill="#475569" font-size="11">source</text>
  <rect x="200" y="340" width="14" height="14" rx="3" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.5"/>
  <text x="220" y="352" fill="#475569" font-size="11">config</text>
  <rect x="280" y="340" width="14" height="14" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="300" y="352" fill="#475569" font-size="11">data</text>
</svg>

## What It Is

A local developer dashboard that auto-discovers every Git repo in `~/Documents/Code/` and shows live status: last commit time, dirty file count, GitHub Actions result, Vercel deployment state, and live URL links.

## Stack

- React + Vite
- Vite plugin exposes `/data.json` at runtime via `server/collect.js`
- No build-time data step — data refreshes on each request (60s cache)

## Usage

```bash
# Dev server — data collected live
npm run dev

# Production build
npm run build
```

## Data Collection

`server/collect.js` scans every git repo in `~/Documents/Code/` and returns:

- Repo name, branch, last commit (ISO 8601), dirty file count
- GitHub Actions conclusion (via `gh` CLI)
- Vercel deployment state (via GitHub deployments API)
- Live URLs for deployed projects

Data is served at `/data.json` by the Vite dev plugin and at build time via the same module. A 60-second in-memory cache prevents hammering the GitHub API on every hot reload.
