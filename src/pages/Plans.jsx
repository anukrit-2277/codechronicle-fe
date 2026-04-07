import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Infinity as InfinityIcon, Sparkles } from 'lucide-react'
import { billingApi } from '../lib/api'
import { formatUsdFromInr } from '../lib/currencyDisplay'
import { useAuth } from '../lib/auth-context'

function PlanSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="skeleton skeleton-text-sm w-20" />
      <div className="skeleton skeleton-text-sm w-14 mt-3" />
      <div className="skeleton skeleton-heading mt-2" style={{ width: '7rem' }} />
      <div className="skeleton skeleton-text w-28 mt-4" />
      <div className="skeleton skeleton-text w-36 mt-2" />
      <div className="skeleton h-11 w-full mt-6 rounded-xl" />
    </div>
  )
}

export default function Plans() {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await billingApi.getPlans()
        if (!mounted) return
        setPlans(res.plans || [])
      } catch (err) {
        if (!mounted) return
        setError(err.message || 'Unable to load plans right now.')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const planStats = useMemo(() => {
    return plans.map((plan) => {
      const totalCredits = Number(plan.baseCredits || 0) + Number(plan.firstPurchaseBonusCredits || 0)
      const price = Number(plan.amountInr || 0)
      const creditsPerRupee = price > 0 ? (totalCredits / price) : 0
      const approxDeepAnalyses = Math.max(1, Math.floor(totalCredits / 12))
      const approxQuickQueries = Math.max(1, Math.floor(totalCredits / 4))
      return {
        ...plan,
        totalCredits,
        creditsPerRupee: creditsPerRupee.toFixed(1),
        approxDeepAnalyses,
        approxQuickQueries,
      }
    })
  }, [plans])

  function handleBuyNow() {
    if (!authLoading && isAuthenticated) {
      navigate('/billing')
      return
    }
    navigate('/login?redirect=/billing')
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-dark-900 text-white px-4 py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-neon-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-neon-purple/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/45 hover:text-cyan-400 transition-colors duration-200 mb-6 group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/3 group-hover:border-cyan-400/35 group-hover:bg-cyan-400/5 transition-all duration-200">
            <ArrowLeft className="w-4 h-4" />
          </span>
          Back
        </Link>

        <section className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/8 text-neon-cyan text-xs font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Transparent Pricing
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">Choose Your Credits Plan</h1>
              <p className="text-white/60 max-w-2xl">
                Start small or scale up. Every plan gives you high-quality AI analysis credits with predictable value.
              </p>
            </div>

            <div className="glass-card rounded-xl p-4 border border-neon-cyan/25 max-w-sm">
              <div className="flex items-start gap-3">
                <InfinityIcon className="w-5 h-5 text-neon-cyan mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/90">Credits Never Expire</p>
                  <p className="text-xs text-white/55 mt-1">
                    Buy now, use anytime. Your purchased credits stay in your wallet until consumed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <div className="glass-card rounded-xl p-4 border border-red-400/40 text-red-300 mb-6">
            {error}
          </div>
        ) : null}

        <section className="grid md:grid-cols-3 gap-4">
          {loading ? (
            <>
              <PlanSkeleton />
              <PlanSkeleton />
              <PlanSkeleton />
            </>
          ) : planStats.map((plan) => (
            <article key={plan.id} className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-neon-cyan/80 via-neon-blue/80 to-neon-purple/80" />

              <p className="text-white/70 text-sm">{plan.name}</p>
              <div className="mt-3">
                <p className="text-white/40 line-through text-sm">Rs {plan.originalAmountInr}</p>
                <p className="text-3xl font-bold flex items-baseline gap-2">
                  <span>Rs {plan.amountInr}</span>
                  <span className="text-white/35 text-base font-normal">/</span>
                  <span className="text-xs text-white/45 font-medium">{formatUsdFromInr(plan.amountInr)}</span>
                </p>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-white/80">{plan.baseCredits} base credits</p>
                <p className="text-neon-cyan text-sm">First recharge bonus: +{plan.firstPurchaseBonusCredits}</p>
                <p className="text-xs text-white/50">Total first recharge credits: {plan.totalCredits}</p>
              </div>

              <div className="mt-4 space-y-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>~{plan.creditsPerRupee} credits per Rs 1 (first recharge)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>~{plan.approxQuickQueries} quick AI queries*</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>~{plan.approxDeepAnalyses} deep analyses*</span>
                </div>
              </div>

              <button
                className="btn-primary mt-6 w-full justify-center disabled:opacity-50"
                onClick={handleBuyNow}
                disabled={authLoading}
              >
                {authLoading ? (
                  <span className="flex items-center gap-2"><span className="spinner spinner-sm" /> Preparing...</span>
                ) : 'Buy Now'}
              </button>
            </article>
          ))}
        </section>

        <p className="text-xs text-white/40 mt-4">
          *Approximation depends on model usage patterns, prompt length, and output size.
        </p>
      </div>
    </main>
  )
}
