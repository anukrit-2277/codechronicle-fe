import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Product Description',
    body: 'CodeChronicle is a VS Code extension and web platform that analyzes codebases using graph intelligence and AI assistance. It provides dependency mapping, blast radius prediction, and natural-language insights over your project structure.',
  },
  {
    title: 'Pricing Details',
    body: 'Credits are sold as prepaid packs. Each AI operation consumes credits based on token usage and infrastructure costs. Plan prices and included credits are visible on the Billing page before checkout.',
  },
  {
    title: 'Contact Information',
    body: 'Email: chroniclecode2@gmail.com',
  },
  {
    title: 'Privacy Policy',
    body: 'We process account and payment metadata to provide the service, secure transactions, and prevent fraud. Sensitive payment details are handled by Razorpay and are not stored directly on our servers.',
  },
  {
    title: 'Terms & Conditions',
    body: 'By purchasing credits, you agree to use CodeChronicle lawfully and not abuse the platform. Credits are account-bound, non-transferable, and may expire if required by policy updates.',
  },
  {
    title: 'Refund Policy',
    body: 'Refund requests are reviewed case-by-case for failed charges or service-impacting incidents. Approved refunds may include partial or full credit reversal aligned with payment records.',
  },
]

export default function Legal() {
  return (
    <main className="min-h-screen bg-dark-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-8">
          <h1 className="text-3xl font-bold gradient-text">Legal & Compliance</h1>
          <Link to="/" className="btn-secondary text-sm">Back</Link>
        </div>
        <div className="space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="text-white/60 text-sm mt-2 leading-6">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
