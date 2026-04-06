import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Info, TicketPercent, X } from 'lucide-react'
import { billingApi } from '../lib/api'
import { useAuth } from '../lib/auth-context'
import DashboardPageHeader from '../components/DashboardPageHeader'

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Unable to load Razorpay checkout script.'))
    document.body.appendChild(script)
  })
}

function useQueryParams() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function Billing() {
  const { isAuthenticated, user, loading } = useAuth()
  const navigate = useNavigate()
  const query = useQueryParams()
  const [plans, setPlans] = useState([])
  const [wallet, setWallet] = useState(null)
  const [busyPlanId, setBusyPlanId] = useState('')
  const [error, setError] = useState('')
  const [activityTypeFilter, setActivityTypeFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [isRedeemOpen, setIsRedeemOpen] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [redeemBusy, setRedeemBusy] = useState(false)
  const [redeemFeedback, setRedeemFeedback] = useState('')
  const emailHint = query.get('emailHint')

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(`/login?redirect=/billing${emailHint ? `&emailHint=${encodeURIComponent(emailHint)}` : ''}`)
    }
  }, [loading, isAuthenticated, navigate, emailHint])

  const loadBillingData = useCallback(async (mountedRef = { current: true }) => {
    try {
      const [plansResp, walletResp] = await Promise.all([billingApi.getPlans(), billingApi.getWallet()])
      if (!mountedRef.current) return
      setPlans(plansResp.plans || [])
      setWallet(walletResp)
    } catch (err) {
      if (!mountedRef.current) return
      setError(err.message || 'Unable to load billing details.')
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return
    const mountedRef = { current: true }
    loadBillingData(mountedRef)
    return () => { mountedRef.current = false }
  }, [isAuthenticated, loadBillingData])

  async function startCheckout(planId) {
    setError('')
    setBusyPlanId(planId)
    try {
      await loadRazorpayScript()
      const order = await billingApi.createOrder(planId)
      const razorpay = new window.Razorpay({
        key: order.razorpayKeyId,
        amount: order.amountInr * 100,
        currency: order.currency,
        name: 'CodeChronicle',
        description: `${order.plan.name} credits pack`,
        order_id: order.orderId,
        prefill: order.prefill,
        notes: { planId: order.plan.id, userEmail: order.prefill.email },
        theme: { color: '#22d3ee' },
        handler: function () {
          navigate('/billing/success')
        },
      })
      razorpay.open()
    } catch (err) {
      setError(err.message || 'Payment initialization failed.')
    } finally {
      setBusyPlanId('')
    }
  }

  async function redeemCouponCode() {
    if (!couponCode.trim()) return
    setRedeemBusy(true)
    setRedeemFeedback('')
    setError('')
    try {
      const result = await billingApi.redeemCoupon(couponCode.trim())
      await loadBillingData()
      setRedeemFeedback(`Coupon ${result.couponCode} redeemed successfully. +${result.credits} credits added.`)
      setCouponCode('')
      setIsRedeemOpen(false)
    } catch (err) {
      setRedeemFeedback(err.message || 'Unable to redeem coupon. Please try again.')
    } finally {
      setRedeemBusy(false)
    }
  }

  const accountMismatch = emailHint && user?.email && user.email !== emailHint
  const isNegativeEntry = useCallback((type) => type === 'debit' || type === 'reversal', [])
  const availableActivityTypes = useMemo(() => {
    const typeSet = new Set((wallet?.ledger || []).map((entry) => entry.type).filter(Boolean))
    return Array.from(typeSet)
  }, [wallet?.ledger])

  const filteredLedger = useMemo(() => {
    const fromTime = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : null
    const toTime = toDate ? new Date(`${toDate}T23:59:59.999`).getTime() : null

    return [...(wallet?.ledger || [])]
      .sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime()
        const bTime = new Date(b.createdAt).getTime()
        return (Number.isFinite(bTime) ? bTime : 0) - (Number.isFinite(aTime) ? aTime : 0)
      })
      .filter((entry) => {
        if (activityTypeFilter !== 'all' && entry.type !== activityTypeFilter) return false

        const createdTime = new Date(entry.createdAt).getTime()
        if (fromTime !== null && Number.isFinite(createdTime) && createdTime < fromTime) return false
        if (toTime !== null && Number.isFinite(createdTime) && createdTime > toTime) return false
        return true
      })
  }, [wallet?.ledger, activityTypeFilter, fromDate, toDate])

  const monthlyActivity = useMemo(() => {
    const days = 30
    const now = new Date()
    const dateKeys = []
    for (let i = days - 1; i >= 0; i -= 1) {
      const d = new Date(now)
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() - i)
      dateKeys.push(d.toISOString().slice(0, 10))
    }

    const aggregates = dateKeys.reduce((acc, key) => {
      acc[key] = { date: key, credit: 0, debit: 0, net: 0 }
      return acc
    }, {})

    for (const entry of wallet?.ledger || []) {
      const createdTime = new Date(entry.createdAt).getTime()
      if (!Number.isFinite(createdTime)) continue
      const dayKey = new Date(createdTime).toISOString().slice(0, 10)
      if (!aggregates[dayKey]) continue

      const credits = Number(entry.credits || 0)
      if (isNegativeEntry(entry.type)) {
        aggregates[dayKey].debit += credits
        aggregates[dayKey].net -= credits
      } else {
        aggregates[dayKey].credit += credits
        aggregates[dayKey].net += credits
      }
    }

    const series = dateKeys.map((key) => aggregates[key])
    const totalCreditsIn = series.reduce((sum, day) => sum + day.credit, 0)
    const totalCreditsOut = series.reduce((sum, day) => sum + day.debit, 0)
    return { series, totalCreditsIn, totalCreditsOut }
  }, [wallet?.ledger, isNegativeEntry])

  const graphModel = useMemo(() => {
    const width = 100
    const height = 42
    const points = monthlyActivity.series.map((day, index, arr) => {
      const x = arr.length > 1 ? (index / (arr.length - 1)) * width : width / 2
      return { x, yValue: day.net, day: day.date }
    })

    const minY = Math.min(0, ...points.map((p) => p.yValue))
    const maxY = Math.max(0, ...points.map((p) => p.yValue))
    const range = Math.max(1, maxY - minY)
    const toY = (value) => height - ((value - minY) / range) * height

    const linePoints = points.map((p) => `${p.x},${toY(p.yValue)}`).join(' ')
    const areaPoints = `0,${height} ${linePoints} ${width},${height}`
    const zeroY = toY(0)

    return { width, height, minY, maxY, linePoints, areaPoints, zeroY }
  }, [monthlyActivity.series])

  const dataLoading = isAuthenticated && !wallet && !error

  if (loading || (!isAuthenticated && !error)) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-white/40 text-sm">Loading billing...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-900 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <DashboardPageHeader
          backTo="/"
          backLabel="Back"
          title="Credits & Billing"
          subtitle="Current balance and purchase history are synced with your extension account."
        />

        {accountMismatch ? (
          <div className="glass-card rounded-xl p-4 border border-amber-400/40 text-amber-200 mb-6">
            You are signed in as <strong>{user.email}</strong>, but extension requested <strong>{emailHint}</strong>. Sign in with the same extension account before purchasing credits.
          </div>
        ) : null}

        {dataLoading ? (
          <div className="skeleton-card mb-8">
            <div className="skeleton skeleton-text-sm w-24" />
            <div className="skeleton skeleton-heading mt-2" style={{ width: '6rem' }} />
            <div className="skeleton skeleton-text-sm w-40 mt-3" />
          </div>
        ) : wallet ? (
          <div className="glass-card rounded-2xl p-6 mb-8">
            <p className="text-white/60 text-sm">Available Credits</p>
            <p className="text-4xl font-bold mt-1">{wallet.balanceCredits}</p>
            <p className="text-xs text-white/50 mt-3">Signed in as {user?.email}</p>
          </div>
        ) : null}

        {error ? <p className="text-red-400 mb-4">{error}</p> : null}

        <section>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Buy Credits</h2>
              <div className="relative group">
                <Info className="w-4 h-4 text-white/40 cursor-help transition-colors group-hover:text-cyan-400" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 rounded-lg bg-dark-800 border border-cyan-400/20 shadow-xl px-4 py-3 text-xs text-white/80 leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 pointer-events-none">
                  Purchased credits never expire. They remain in your account until you use them, so you can buy at your own pace and use them whenever you need.
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-dark-800 border-b border-r border-cyan-400/20 rotate-45 -mt-1" />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setRedeemFeedback('')
                setIsRedeemOpen(true)
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-neon-purple/35 bg-neon-purple/10 px-4 py-2 text-sm font-medium text-neon-purple transition hover:bg-neon-purple/15 disabled:opacity-50"
              disabled={accountMismatch || dataLoading}
            >
              <TicketPercent className="w-4 h-4" />
              Redeem Coupon Code
            </button>
          </div>
          {redeemFeedback ? (
            <div className={`mb-4 rounded-xl border px-4 py-3 text-sm ${redeemFeedback.includes('successfully') ? 'border-emerald-400/35 bg-emerald-500/8 text-emerald-200' : 'border-rose-400/35 bg-rose-500/8 text-rose-200'}`}>
              {redeemFeedback}
            </div>
          ) : null}
          {isRedeemOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
              <div className="w-full max-w-md rounded-2xl border border-neon-purple/30 bg-dark-900 shadow-2xl shadow-neon-purple/15">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <h3 className="text-base font-semibold">Redeem Coupon Code</h3>
                  <button
                    type="button"
                    onClick={() => setIsRedeemOpen(false)}
                    className="rounded-lg border border-white/15 p-1.5 text-white/70 transition hover:text-white hover:border-white/30"
                    aria-label="Close coupon modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <p className="text-sm text-white/65">Enter the coupon code shared with you to add credits to this account.</p>
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="E.g. CC-WELCOME-2026"
                    className="w-full rounded-xl border border-white/15 bg-dark-800 px-3 py-2.5 text-white placeholder:text-white/35 focus:outline-none focus:border-neon-purple/40"
                  />
                  <p className="text-xs text-white/45">Each account can claim a specific coupon code only once.</p>
                </div>
                <div className="flex items-center justify-end gap-2 border-t border-white/10 px-5 py-4">
                  <button type="button" onClick={() => setIsRedeemOpen(false)} className="btn-secondary" disabled={redeemBusy}>
                    Cancel
                  </button>
                  <button type="button" onClick={redeemCouponCode} className="btn-primary" disabled={redeemBusy || !couponCode.trim()}>
                    {redeemBusy ? (
                      <span className="flex items-center gap-2"><span className="spinner spinner-sm" /> Redeeming...</span>
                    ) : 'Redeem'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {dataLoading ? (
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton skeleton-text-sm w-16" />
                  <div className="skeleton skeleton-text-sm w-12 mt-3" />
                  <div className="skeleton skeleton-heading mt-1" style={{ width: '7rem' }} />
                  <div className="skeleton skeleton-text w-24 mt-3" />
                  <div className="skeleton skeleton-text-sm w-36 mt-2" />
                  <div className="skeleton h-11 w-full mt-5 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <article key={plan.id} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                  <p className="text-white/70 text-sm">{plan.name}</p>
                  <div className="mt-3">
                    <p className="text-white/40 line-through text-sm">Rs {plan.originalAmountInr}</p>
                    <p className="text-3xl font-bold">Rs {plan.amountInr}</p>
                  </div>
                  <p className="text-white/70 mt-3">{plan.baseCredits} credits</p>
                  <p className="text-neon-cyan text-sm mt-1">First recharge bonus: +{plan.firstPurchaseBonusCredits}</p>
                  <button
                    className="btn-primary mt-5 w-full justify-center disabled:opacity-50"
                    disabled={!!busyPlanId || accountMismatch}
                    onClick={() => startCheckout(plan.id)}
                  >
                    {busyPlanId === plan.id ? (
                      <span className="flex items-center gap-2"><span className="spinner spinner-sm" /> Processing...</span>
                    ) : 'Buy Credits'}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Credit Activity</h3>
          <div className="glass-card rounded-xl p-4 mb-3">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
              <div>
                <p className="text-white/70 text-sm">Last 30 days (net credits/day)</p>
                <p className="text-xs text-white/40 mt-1">Net = credits added - credits used/refunded</p>
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-emerald-300">In: +{monthlyActivity.totalCreditsIn}</span>
                <span className="text-rose-300">Out: -{monthlyActivity.totalCreditsOut}</span>
              </div>
            </div>
            <div className="w-full h-56 rounded-lg bg-dark-900/60 border border-white/10 p-3">
              <svg className="w-full h-full" viewBox={`0 0 ${graphModel.width} ${graphModel.height}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="creditsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <line x1="0" y1={graphModel.zeroY} x2={graphModel.width} y2={graphModel.zeroY} stroke="#64748b" strokeOpacity="0.5" strokeDasharray="1.5 1.5" />
                <polyline fill="url(#creditsAreaGradient)" points={graphModel.areaPoints} />
                <polyline fill="none" stroke="#22d3ee" strokeWidth="0.8" points={graphModel.linePoints} />
              </svg>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
              <span>{monthlyActivity.series[0]?.date || ''}</span>
              <span>{monthlyActivity.series[monthlyActivity.series.length - 1]?.date || ''}</span>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 mb-3">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-sm text-white/70">
                Type
                <select
                  className="mt-1 w-full rounded-lg bg-dark-800 border border-white/15 px-3 py-2 text-white"
                  value={activityTypeFilter}
                  onChange={(e) => setActivityTypeFilter(e.target.value)}
                >
                  <option value="all">All types</option>
                  {availableActivityTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-white/70">
                From date
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg bg-dark-800 border border-white/15 px-3 py-2 text-white"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </label>
              <label className="text-sm text-white/70">
                To date
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg bg-dark-800 border border-white/15 px-3 py-2 text-white"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 overflow-x-auto">
            <div className="max-h-104 overflow-y-auto pr-3" style={{ scrollbarGutter: 'stable' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/50">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Source</th>
                  <th className="text-right py-2 pr-2">Credits</th>
                </tr>
              </thead>
              <tbody>
                {filteredLedger.length === 0 ? (
                  <tr className="border-t border-white/5">
                    <td className="py-4 text-white/50" colSpan={4}>No credit activity for selected filters.</td>
                  </tr>
                ) : filteredLedger.map((entry) => (
                  <tr key={entry.entryId} className="border-t border-white/5">
                    <td className="py-2 text-white/70 whitespace-nowrap">{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className="py-2 text-white/70">{entry.type}</td>
                    <td className="py-2 text-white/60">{entry.source}</td>
                    <td className="py-2 pr-2 text-right">{isNegativeEntry(entry.type) ? '-' : '+'}{entry.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
