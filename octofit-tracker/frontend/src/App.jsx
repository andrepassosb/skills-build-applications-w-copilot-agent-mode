import { NavLink, Route, Routes } from 'react-router-dom'
import { getApiBaseUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigationItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="container py-4">
      <header className="border rounded-4 p-4 mb-4 shadow-sm bg-light">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
          <div>
            <p className="text-uppercase small fw-semibold mb-2 text-primary">Octofit Tracker</p>
            <h1 className="h3 mb-2">React presentation tier</h1>
            <p className="text-muted mb-0">
              Browse users, teams, activities, leaderboard entries, and workouts from the backend API.
            </p>
          </div>
          <div className="bg-white border rounded-3 p-3 small text-muted">
            <div className="fw-semibold text-dark">API base</div>
            <div className="text-break">{apiBaseUrl}</div>
            <div className="mt-2">
              {codespaceName
                ? `VITE_CODESPACE_NAME is set to ${codespaceName}.`
                : 'Define VITE_CODESPACE_NAME in .env.local to target your GitHub Codespace endpoint.'}
            </div>
          </div>
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap mb-4" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-dark'}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <section className="card shadow-sm border-0">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </section>
    </div>
  )
}

export default App
