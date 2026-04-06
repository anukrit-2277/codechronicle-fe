const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

function getToken() {
  return localStorage.getItem('cc_auth_token') || ''
}

export function setToken(token) {
  if (token) localStorage.setItem('cc_auth_token', token)
  else localStorage.removeItem('cc_auth_token')
}

export async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  if (!API_BASE_URL) {
    throw new Error('Website API is not configured. Set VITE_API_BASE_URL.')
  }

  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (!token) throw new Error('Please sign in to continue.')
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed (${response.status})`)
  }

  return data
}

export const billingApi = {
  getPlans: () => apiRequest('/billing/plans'),
  getWallet: () => apiRequest('/billing/wallet', { auth: true }),
  createOrder: (planId) => apiRequest('/billing/create-order', { method: 'POST', auth: true, body: { planId } }),
  getAdminSummary: () => apiRequest('/billing/admin/summary', { auth: true }),
  redeemCoupon: (code) => apiRequest('/billing/redeem-coupon', { method: 'POST', auth: true, body: { code } }),
  createCoupon: (payload) => apiRequest('/billing/admin/coupons', { method: 'POST', auth: true, body: payload }),
  listCoupons: (limit = 200) => apiRequest(`/billing/admin/coupons?limit=${encodeURIComponent(limit)}`, { auth: true }),
  updateCoupon: (payload) => apiRequest('/billing/admin/coupons/update', { method: 'POST', auth: true, body: payload }),
}

export const authApi = {
  login: (email, password) => apiRequest('/auth/login', { method: 'POST', body: { email, password } }),
  verifyToken: (token) => apiRequest('/auth/verify-token', { method: 'POST', body: { token } }),
}
