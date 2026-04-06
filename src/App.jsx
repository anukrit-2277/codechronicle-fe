import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Login from './pages/Login'
import Billing from './pages/Billing'
import BillingSuccess from './pages/BillingSuccess'
import Legal from './pages/Legal'
import AdminBilling from './pages/AdminBilling'
import { AuthProvider } from './lib/auth-context'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing/success" element={<BillingSuccess />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin/billing" element={<AdminBilling />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
