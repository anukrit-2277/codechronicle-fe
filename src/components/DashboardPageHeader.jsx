import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut } from 'lucide-react'
import { useAuth } from '../lib/auth-context'

/**
 * Shared header for billing / admin dashboards: back link, title, optional right links, logout.
 */
export default function DashboardPageHeader({
  backTo,
  backLabel = 'Back',
  title,
  subtitle,
  children,
}) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="mb-8">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-sm font-medium text-white/45 hover:text-cyan-400 transition-colors duration-200 mb-5 group"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/3 group-hover:border-cyan-400/35 group-hover:bg-cyan-400/5 transition-all duration-200">
          <ArrowLeft className="w-4 h-4" />
        </span>
        {backLabel}
      </Link>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold gradient-text">{title}</h1>
          {subtitle ? (
            <p className="text-white/60 text-sm mt-2 max-w-xl">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {children}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/6 px-4 py-2.5 text-sm font-medium text-rose-200/90 hover:bg-rose-500/15 hover:border-rose-400/45 hover:text-rose-100 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 opacity-90" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
