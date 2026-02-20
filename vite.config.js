import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const dashboardData = {
  name: 'dashboard-data',
  apply: 'serve',
  async configureServer(server) {
    const { buildData } = await import('./server/collect.js')
    server.middlewares.use('/data.json', async (_req, res) => {
      try {
        const data = await buildData()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      } catch (err) {
        res.statusCode = 500
        res.end(JSON.stringify({ error: err.message }))
      }
    })
  },
}

const dashboardBuild = {
  name: 'dashboard-data-build',
  apply: 'build',
  async buildStart() {
    const { buildData } = await import('./server/collect.js')
    const data = await buildData()
    mkdirSync(join(process.cwd(), 'public'), { recursive: true })
    writeFileSync(join(process.cwd(), 'public', 'data.json'), JSON.stringify(data))
    console.log(`[dashboard] wrote public/data.json (${data.projects.length} repos)`)
  },
}

export default defineConfig({
  plugins: [react(), dashboardData, dashboardBuild],
})
