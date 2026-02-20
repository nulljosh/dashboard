import { useState, useEffect } from 'react'
import './App.css'

function StatusBadge({ status, type }) {
  const colors = {
    success: '#22c55e',
    failure: '#ef4444',
    none: '#525252',
    pending: '#eab308',
    error: '#ef4444',
  }
  const color = colors[status] || colors.none
  const label = status === 'none' ? '—' : status
  return (
    <span className="badge" style={{ background: color + '22', color, borderColor: color + '44' }}>
      <span className="badge-type">{type} </span>{label}
    </span>
  )
}

function ProjectCard({ project }) {
  const commitDate = project.lastCommit ? new Date(project.lastCommit.replace(' ', 'T')) : null
  const timeAgo = commitDate ? getTimeAgo(commitDate) : 'never'

  return (
    <div className={`card ${project.updatedToday ? 'card-active' : ''}`}>
      <div className="card-header">
        <div className="card-title-row">
          <a href={project.github} target="_blank" rel="noopener" className="card-name">{project.name}</a>
          {project.dirty > 0 && <span className="dirty-badge">dirty</span>}
        </div>
        <span className="card-branch">{project.branch}</span>
      </div>
      <p className="card-msg">{project.lastMsg || 'No commits'}</p>
      <div className="card-meta">
        <span className="card-time">{timeAgo}</span>
        <div className="card-badges">
          {project.ci !== 'none' && <StatusBadge status={project.ci} type="CI" />}
          {project.vercel !== 'none' && <StatusBadge status={project.vercel} type="V" />}
        </div>
      </div>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener" className="card-live">
          {project.liveUrl.replace('https://', '')}
        </a>
      )}
    </div>
  )
}

function getTimeAgo(date) {
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

const MISSION = {
  statement: "Build, ship, and understand everything — from silicon to software to markets. No abstractions left unbroken.",
  pillars: [
    { name: "Systems", desc: "OS, compilers, debuggers, runtimes — understand the machine top to bottom", projects: ["NullOS", "nullC", "shell", "debugger", "container-runtime", "jit", "jot", "profiler"] },
    { name: "Intelligence", desc: "Train models, not just use them — be in the room where it happens", projects: ["core", "shannon", "search-engine", "static-analyzer"] },
    { name: "Markets", desc: "Financial literacy through building — trading sims, trackers, arbitrage", projects: ["rise", "finn", "arby", "mop", "dexter"] },
    { name: "Product", desc: "Ship real things people use — fast iteration, live deploys, portfolio brand", projects: ["tally", "spark", "scroll", "journal", "books", "dose", "wikiscroll"] },
    { name: "Automation", desc: "If you do it twice, automate it — music, food, calls, grading", projects: ["tuneflow", "dominos", "starbot", "callie", "quizz"] },
  ]
}

function MissionControl({ projects }) {
  const projectMap = {}
  projects.forEach(p => { projectMap[p.name.toLowerCase()] = p })

  return (
    <section className="mission-section">
      <div className="mission-header">
        <h2 className="mission-title">Mission Control</h2>
        <p className="mission-statement">{MISSION.statement}</p>
      </div>
      <div className="pillars">
        {MISSION.pillars.map(pillar => {
          const pillarProjects = pillar.projects.map(name => projectMap[name.toLowerCase()]).filter(Boolean)
          const activeToday = pillarProjects.filter(p => p.updatedToday).length
          const totalProjects = pillarProjects.length
          const allPassing = pillarProjects.every(p => p.ci !== 'failure' && p.vercel !== 'failure')

          return (
            <div key={pillar.name} className="pillar">
              <div className="pillar-header">
                <div className="pillar-title-row">
                  <h3 className="pillar-name">{pillar.name}</h3>
                  <span className={`pillar-health ${allPassing ? 'health-good' : 'health-bad'}`}>
                    {allPassing ? 'HEALTHY' : 'DEGRADED'}
                  </span>
                </div>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
              <div className="pillar-stats">
                <span className="pillar-stat">{totalProjects} projects</span>
                <span className="pillar-divider">/</span>
                <span className="pillar-stat">{activeToday} active today</span>
              </div>
              <div className="pillar-projects">
                {pillarProjects.map(p => (
                  <a key={p.name} href={p.github} target="_blank" rel="noopener"
                     className={`pillar-project ${p.updatedToday ? 'pillar-project-active' : ''}`}>
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function App() {
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('mission')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data.json')
      .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json() })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  if (error) return <div className="app"><p className="error">Failed to load data: {error}</p></div>
  if (!data) return <div className="app"><p className="loading">Loading...</p></div>

  const projects = data.projects || []
  const stats = data.stats || {}

  const filtered = projects.filter(p => {
    if (filter === 'today') return p.updatedToday
    if (filter === 'live') return p.liveUrl
    if (filter === 'failing') return p.ci === 'failure' || p.vercel === 'failure'
    return true
  }).sort((a, b) => {
    if (a.updatedToday && !b.updatedToday) return -1
    if (!a.updatedToday && b.updatedToday) return 1
    return new Date(b.lastCommit) - new Date(a.lastCommit)
  })

  const failCount = projects.filter(p => p.ci === 'failure' || p.vercel === 'failure').length
  const liveCount = projects.filter(p => p.liveUrl).length

  return (
    <div className="app">
      <header>
        <div className="header-top">
          <h1>dash<span>board</span></h1>
          <div className="view-toggle">
            <button className={view === 'mission' ? 'active' : ''} onClick={() => setView('mission')}>mission</button>
            <button className={view === 'projects' ? 'active' : ''} onClick={() => setView('projects')}>projects</button>
          </div>
        </div>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">{stats.totalRepos}</span>
            <span className="stat-label">repos</span>
          </div>
          <div className="stat stat-active">
            <span className="stat-num">{stats.updatedToday}</span>
            <span className="stat-label">today</span>
          </div>
          <div className="stat">
            <span className="stat-num">{liveCount}</span>
            <span className="stat-label">live</span>
          </div>
          <div className={`stat ${failCount > 0 ? 'stat-fail' : ''}`}>
            <span className="stat-num">{failCount}</span>
            <span className="stat-label">failing</span>
          </div>
        </div>
      </header>

      {view === 'mission' && <MissionControl projects={projects} />}

      {view === 'projects' && (
        <>
          <div className="filters">
            {['all', 'today', 'live', 'failing'].map(f => (
              <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <main className="grid">
            {filtered.map(p => <ProjectCard key={p.name} project={p} />)}
            {filtered.length === 0 && <p className="empty">No projects match this filter.</p>}
          </main>
        </>
      )}
    </div>
  )
}

export default App
