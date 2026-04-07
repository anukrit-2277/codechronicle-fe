import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './lib/auth-context'

const Home = lazy(() => import('./pages/Home'))
const Docs = lazy(() => import('./pages/Docs'))
const Login = lazy(() => import('./pages/Login'))
const Billing = lazy(() => import('./pages/Billing'))
const Plans = lazy(() => import('./pages/Plans'))
const BillingSuccess = lazy(() => import('./pages/BillingSuccess'))
const Legal = lazy(() => import('./pages/Legal'))
const AdminBilling = lazy(() => import('./pages/AdminBilling'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="spinner" />
        <p className="text-white/40 text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search])

  return (
    <Suspense fallback={<PageLoader />}>
      <div key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/pricing" element={<Plans />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing/success" element={<BillingSuccess />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin/billing" element={<AdminBilling />} />
        </Routes>
      </div>
    </Suspense>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
