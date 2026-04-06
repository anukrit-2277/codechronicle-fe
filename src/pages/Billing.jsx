import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { billingApi } from '../lib/api'
import { useAuth } from '../lib/auth-context'

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
  const emailHint = query.get('emailHint')

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(`/login?redirect=/billing${emailHint ? `&emailHint=${encodeURIComponent(emailHint)}` : ''}`)
    }
  }, [loading, isAuthenticated, navigate, emailHint])

  useEffect(() => {
    if (!isAuthenticated) return
    let mounted = true
    ;(async () => {
      try {
        const [plansResp, walletResp] = await Promise.all([billingApi.getPlans(), billingApi.getWallet()])
        if (!mounted) return
        setPlans(plansResp.plans || [])
        setWallet(walletResp)
      } catch (err) {
        if (!mounted) return
        setError(err.message || 'Unable to load billing details.')
      }
    })()
    return () => { mounted = false }
  }, [isAuthenticated])

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

  if (loading || (!isAuthenticated && !error)) {
    return <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">Loading billing...</div>
  }

  const accountMismatch = emailHint && user?.email && user.email !== emailHint

  return (
    <main className="min-h-screen bg-dark-900 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Credits & Billing</h1>
            <p className="text-white/60 text-sm mt-2">Current balance and purchase history are synced with your extension account.</p>
          </div>
          <Link to="/" className="btn-secondary text-sm">Back to Website</Link>
        </div>

        {accountMismatch ? (
          <div className="glass-card rounded-xl p-4 border border-amber-400/40 text-amber-200 mb-6">
            You are signed in as <strong>{user.email}</strong>, but extension requested <strong>{emailHint}</strong>. Sign in with the same extension account before purchasing credits.
          </div>
        ) : null}

        {wallet ? (
          <div className="glass-card rounded-2xl p-6 mb-8">
            <p className="text-white/60 text-sm">Available Credits</p>
            <p className="text-4xl font-bold mt-1">{wallet.balanceCredits}</p>
            <p className="text-xs text-white/50 mt-3">Signed in as {user?.email}</p>
          </div>
        ) : null}

        {error ? <p className="text-red-400 mb-4">{error}</p> : null}

        <section>
          <h2 className="text-xl font-semibold mb-4">Buy Credits</h2>
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
                  {busyPlanId === plan.id ? 'Processing...' : 'Buy Credits'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Credit Activity</h3>
          <div className="glass-card rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/50">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Source</th>
                  <th className="text-right py-2">Credits</th>
                </tr>
              </thead>
              <tbody>
                {(wallet?.ledger || []).map((entry) => (
                  <tr key={entry.entryId} className="border-t border-white/5">
                    <td className="py-2 text-white/70">{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className="py-2 text-white/70">{entry.type}</td>
                    <td className="py-2 text-white/60">{entry.source}</td>
                    <td className="py-2 text-right">{entry.type === 'debit' ? '-' : '+'}{entry.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
