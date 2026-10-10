import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-20 pb-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Open source intelligence tools.<br />
            <span className="text-muted">Built for clarity.</span>
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            A clean collection of client-side OSINT utilities and curated free resources.
            No accounts. No tracking. Everything stays in your browser.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              Browse Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 grid sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-border bg-surface">
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-medium text-white mb-2">Privacy first</h3>
          <p className="text-sm text-muted leading-relaxed">
            Pure client-side tools process everything locally. Your data never leaves the browser.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-surface">
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-medium text-white mb-2">No API keys</h3>
          <p className="text-sm text-muted leading-relaxed">
            Designed to run on static hosting. No secrets, no backend, no rate-limit surprises.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-surface">
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-4">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-medium text-white mb-2">Clean & focused</h3>
          <p className="text-sm text-muted leading-relaxed">
            Every tool has its own page. Results are structured and easy to copy.
          </p>
        </div>
      </section>
    </div>
  )
}
