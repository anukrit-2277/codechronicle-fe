import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { authApi } from '../lib/api'
import { useAuth } from '../lib/auth-context'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function Login() {
  const query = useQuery()
  const navigate = useNavigate()
  const { persistAuth } = useAuth()
  const [email, setEmail] = useState(query.get('emailHint') || '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fromExtension = query.get('from') === 'extension'
  const rawRedirect = query.get('redirect') || query.get('next') || '/billing'
  const redirect = rawRedirect.startsWith('/') ? rawRedirect : '/billing'

  function handleBack() {
    // Avoid redirect loops when coming from guarded billing routes.
    if (redirect.startsWith('/billing') || redirect.startsWith('/admin/billing')) {
      navigate('/')
      return
    }

    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await authApi.login(email.trim().toLowerCase(), password)
      persistAuth(result.token, result.user)
      navigate(redirect)
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-dark-900 text-white flex items-center justify-center px-4 py-8">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-35" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-neon-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-neon-purple/10 blur-3xl" />

      <button
        type="button"
        onClick={handleBack}
        className="absolute top-5 left-5 inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="w-full max-w-md glass-card glow-cyan rounded-2xl p-6 sm:p-7 relative">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold gradient-text mb-1">Sign in to CodeChronicle</h1>
            <p className="text-white/60 text-sm">
              {fromExtension
                ? 'Use the same account as your extension to buy and sync credits.'
                : 'Welcome back. Continue to your dashboard securely.'}
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-neon-cyan/20 bg-neon-cyan/8 px-3 py-2.5">
          <p className="text-xs text-white/75 leading-relaxed">
            Please login with the same account as in your extension so your credits can sync correctly.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/55 block mb-1.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:border-neon-cyan/40 focus:ring-2 focus:ring-neon-cyan/10 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-white/55 block mb-1.5">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:border-neon-cyan/40 focus:ring-2 focus:ring-neon-cyan/10 transition-all"
              placeholder="Enter your password"
            />
          </div>
          {error ? <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p> : null}
          <button disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
            {loading ? (
              <span className="flex items-center gap-2"><span className="spinner spinner-sm" /> Signing in...</span>
            ) : 'Sign In'}
          </button>
          <div className="mb-5 flex items-center gap-2 text-xs text-white/55 bg-white/5 border border-white/8 rounded-lg px-3 py-2">
          <ShieldCheck className="w-4 h-4 text-neon-cyan shrink-0" />
          <span>Your session is encrypted and protected.</span>
          </div>
        </form>
      </div>
    </div>
  )
}
