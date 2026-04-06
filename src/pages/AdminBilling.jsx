import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { billingApi } from '../lib/api'
import { useAuth } from '../lib/auth-context'
import DashboardPageHeader from '../components/DashboardPageHeader'

function MetricCard({ label, value, suffix = '' }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}{suffix}</p>
    </div>
  )
}

export default function AdminBilling() {
  const { isAuthenticated, loading, user } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponCredits, setCouponCredits] = useState('50')
  const [couponMaxClaims, setCouponMaxClaims] = useState('100')
  const [couponBusy, setCouponBusy] = useState(false)
  const [couponMessage, setCouponMessage] = useState('')

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/admin/billing')
    }
  }, [loading, isAuthenticated, navigate])

  async function loadSummary(mountedRef = { current: true }) {
    try {
      const summary = await billingApi.getAdminSummary()
      if (!mountedRef.current) return
      setData(summary)
    } catch (err) {
      if (!mountedRef.current) return
      setError(err.message || 'Unable to load admin billing summary.')
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    const mountedRef = { current: true }
    loadSummary(mountedRef)
    return () => { mountedRef.current = false }
  }, [isAuthenticated])

  async function handleCreateCoupon(e) {
    e.preventDefault()
    if (!couponCode.trim()) return
    setCouponBusy(true)
    setCouponMessage('')
    setError('')
    try {
      const resp = await billingApi.createCoupon({
        code: couponCode.trim().toUpperCase(),
        credits: Number(couponCredits || 0),
        maxClaims: Number(couponMaxClaims || 1),
      })
      await loadSummary()
      setCouponMessage(`Coupon ${resp.coupon?.couponCode || couponCode.toUpperCase()} created successfully.`)
      setCouponCode('')
    } catch (err) {
      setCouponMessage(err.message || 'Unable to create coupon.')
    } finally {
      setCouponBusy(false)
    }
  }

  if (loading || (!isAuthenticated && !error)) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-white/40 text-sm">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const dataLoading = isAuthenticated && !data && !error

  return (
    <main className="min-h-screen bg-dark-900 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <DashboardPageHeader
          backTo="/"
          backLabel="Back"
          title="Admin Billing Dashboard"
          subtitle={user?.email ? `Signed in as ${user.email}` : 'Admin console'}
        />

        {error ? (
          <div className="glass-card rounded-xl p-4 border border-red-400/40 text-red-300">
            {error}
          </div>
        ) : null}

        {dataLoading ? (
          <>
            <section className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton skeleton-text-sm w-28" />
                  <div className="skeleton skeleton-heading mt-3" style={{ width: '5rem' }} />
                </div>
              ))}
            </section>
            <div className="skeleton-card mt-8">
              <div className="skeleton skeleton-text w-48" />
              <div className="skeleton skeleton-text w-64 mt-4" />
              <div className="skeleton skeleton-text w-56" />
              <div className="skeleton skeleton-text w-44" />
            </div>
          </>
        ) : data ? (
          <>
            <section className="grid md:grid-cols-3 gap-4">
              <MetricCard label="Users With Wallets" value={data.usersWithWallets || 0} />
              <MetricCard label="Outstanding Credits" value={data.totalOutstandingCredits || 0} />
              <MetricCard label="Gross Revenue" value={data.grossRevenueInr || 0} suffix=" INR" />
              <MetricCard label="Credits Sold" value={data.creditsSold || 0} />
              <MetricCard label="Credits Redeemed" value={data.creditsRedeemed || 0} />
              <MetricCard label="Credits Consumed" value={data.creditsConsumed || 0} />
              <MetricCard label="Credits Reversed" value={data.creditsReversed || 0} />
              <MetricCard label="Payments Captured" value={data.paymentsCaptured || 0} />
              <MetricCard label="Payments Refunded" value={data.paymentsRefunded || 0} />
            </section>

            <section className="mt-8 glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold">Create Coupon Code</h2>
              <p className="text-sm text-white/60 mt-1">Coupons can be claimed once per account per code and appear in user credit activity.</p>
              {couponMessage ? (
                <div className={`mt-4 rounded-lg border px-3 py-2 text-sm ${couponMessage.includes('successfully') ? 'border-emerald-400/35 bg-emerald-500/8 text-emerald-200' : 'border-rose-400/35 bg-rose-500/8 text-rose-200'}`}>
                  {couponMessage}
                </div>
              ) : null}
              <form className="grid md:grid-cols-3 gap-3 mt-4" onSubmit={handleCreateCoupon}>
                <label className="text-sm text-white/70">
                  Coupon code
                  <input
                    className="mt-1 w-full rounded-lg bg-dark-800 border border-white/15 px-3 py-2 text-white"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="CC-WELCOME-2026"
                    maxLength={32}
                    required
                  />
                </label>
                <label className="text-sm text-white/70">
                  Credits
                  <input
                    type="number"
                    min="1"
                    className="mt-1 w-full rounded-lg bg-dark-800 border border-white/15 px-3 py-2 text-white"
                    value={couponCredits}
                    onChange={(e) => setCouponCredits(e.target.value)}
                    required
                  />
                </label>
                <label className="text-sm text-white/70">
                  Max claims
                  <input
                    type="number"
                    min="1"
                    className="mt-1 w-full rounded-lg bg-dark-800 border border-white/15 px-3 py-2 text-white"
                    value={couponMaxClaims}
                    onChange={(e) => setCouponMaxClaims(e.target.value)}
                    required
                  />
                </label>
                <div className="md:col-span-3 flex justify-end">
                  <button className="btn-primary" type="submit" disabled={couponBusy}>
                    {couponBusy ? (
                      <span className="flex items-center gap-2"><span className="spinner spinner-sm" /> Creating...</span>
                    ) : 'Create Coupon'}
                  </button>
                </div>
              </form>
            </section>

            <section className="mt-8 glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold">Quick Health Indicators</h2>
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <p>Net sold credits (sold - reversed): <span className="text-white font-semibold">{(data.creditsSold || 0) - (data.creditsReversed || 0)}</span></p>
                <p>Outstanding credits (wallet truth): <span className="text-white font-semibold">{data.totalOutstandingCredits || 0}</span></p>
                <p>Last updated: <span className="text-white font-semibold">{new Date(data.updatedAt).toLocaleString()}</span></p>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}
