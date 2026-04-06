import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const redirect = query.get('redirect') || '/billing'

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
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">Sign in to CodeChronicle</h1>
        <p className="text-white/60 text-sm mb-6">Use the same account as your extension to buy and sync credits.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/50 block mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
          </div>
          {error ? <p className="text-red-400 text-sm">{error}</p> : null}
          <button disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50" type="submit">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
