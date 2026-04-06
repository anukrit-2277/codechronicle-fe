import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function BillingSuccess() {
  return (
    <main className="min-h-screen bg-dark-900 text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full glass-card rounded-2xl p-8 text-center page-enter">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-14 h-14 text-emerald-400" style={{ animation: 'page-fade-in 0.6s cubic-bezier(0.4,0,0.2,1) both' }} />
        </div>
        <h1 className="text-3xl font-bold gradient-text">Payment Successful</h1>
        <p className="text-white/60 mt-3">Your credits are being added securely via webhook and will appear in your account immediately.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/billing" className="btn-secondary">View Wallet</Link>
          <a className="btn-primary justify-center" href="vscode://">
            Go Back to Extension
          </a>
        </div>
        <p className="text-xs text-white/40 mt-4">If VS Code does not open, switch manually and refresh CodeChronicle sidebar.</p>
      </div>
    </main>
  )
}
