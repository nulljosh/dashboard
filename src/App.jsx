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

function App() {
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('all')
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
          <span className="generated">Last scan: {new Date(data.generated).toLocaleString()}</span>
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
        <div className="filters">
          {['all', 'today', 'live', 'failing'].map(f => (
            <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </header>
      <main className="grid">
        {filtered.map(p => <ProjectCard key={p.name} project={p} />)}
        {filtered.length === 0 && <p className="empty">No projects match this filter.</p>}
      </main>
    </div>
  )
}

export default App
