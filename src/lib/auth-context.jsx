/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi, setToken } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('cc_auth_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('cc_auth_user')
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function verify() {
      if (!token) {
        if (mounted) setLoading(false)
        return
      }
      try {
        const result = await authApi.verifyToken(token)
        if (!mounted) return
        setUser(result.user || null)
        localStorage.setItem('cc_auth_user', JSON.stringify(result.user || null))
      } catch {
        if (!mounted) return
        logout()
      } finally {
        if (mounted) setLoading(false)
      }
    }
    verify()
    return () => { mounted = false }
  }, [token])

  function persistAuth(nextToken, nextUser) {
    setToken(nextToken)
    setTokenState(nextToken)
    setUser(nextUser || null)
    localStorage.setItem('cc_auth_user', JSON.stringify(nextUser || null))
  }

  function logout() {
    setToken('')
    setTokenState('')
    setUser(null)
    localStorage.removeItem('cc_auth_user')
  }

  const value = useMemo(() => ({
    token,
    user,
    loading,
    isAuthenticated: !!token && !!user,
    persistAuth,
    logout,
  }), [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
