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

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/admin/billing')
    }
  }, [loading, isAuthenticated, navigate])

  useEffect(() => {
    if (!isAuthenticated) return
    let mounted = true
    ;(async () => {
      try {
        const summary = await billingApi.getAdminSummary()
        if (!mounted) return
        setData(summary)
      } catch (err) {
        if (!mounted) return
        setError(err.message || 'Unable to load admin billing summary.')
      }
    })()
    return () => { mounted = false }
  }, [isAuthenticated])

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
              <MetricCard label="Credits Consumed" value={data.creditsConsumed || 0} />
              <MetricCard label="Credits Reversed" value={data.creditsReversed || 0} />
              <MetricCard label="Payments Captured" value={data.paymentsCaptured || 0} />
              <MetricCard label="Payments Refunded" value={data.paymentsRefunded || 0} />
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
