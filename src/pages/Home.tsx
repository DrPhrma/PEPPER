import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-5">
      {/* Hero */}
      <section className="pt-24 pb-20">
        <div className="max-w-xl">
          <p className="text-[13px] font-medium text-muted mb-4 tracking-wide uppercase">
            Open Source Intelligence
          </p>
          <h1 className="text-[40px] sm:text-[48px] font-semibold tracking-tight text-white leading-[1.1]">
            Tools that stay<br />
            <span className="text-muted-2">in your browser.</span>
          </h1>
          <p className="mt-5 text-[15px] text-muted leading-relaxed max-w-md">
            A focused collection of client-side OSINT utilities and curated free resources.
            No accounts. No tracking. No API keys.
          </p>
          <div className="mt-8">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-[13px] font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Browse all tools
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 grid sm:grid-cols-3 gap-3">
        <div className="p-5 rounded-xl border border-border bg-surface">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3">
            <Shield className="w-4 h-4 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="text-[14px] font-medium text-white mb-1.5">Privacy first</h3>
          <p className="text-[13px] text-muted leading-relaxed">
            Pure client-side tools. Your data never leaves the browser.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-border bg-surface">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="text-[14px] font-medium text-white mb-1.5">Zero keys</h3>
          <p className="text-[13px] text-muted leading-relaxed">
            Designed for static hosting. No secrets, no backend required.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-border bg-surface">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3">
            <Eye className="w-4 h-4 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="text-[14px] font-medium text-white mb-1.5">Focused</h3>
          <p className="text-[13px] text-muted leading-relaxed">
            Every tool has its own page. Results are clean and copyable.
          </p>
        </div>
      </section>
    </div>
  )
}
