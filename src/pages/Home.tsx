import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Eye, Fingerprint, Hash, FileSearch, Link2 } from 'lucide-react'

const featured = [
  { name: 'Entity Extractor', desc: 'Pull IOCs from any text', path: '/tools/entity-extractor', icon: FileSearch },
  { name: 'Hash Generator', desc: 'SHA-1, SHA-256, SHA-512', path: '/tools/hash', icon: Hash },
  { name: 'Username Links', desc: '30+ platform profile links', path: '/tools/username-links', icon: Link2 },
  { name: 'JWT Decoder', desc: 'Inspect tokens instantly', path: '/tools/jwt', icon: Fingerprint },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.35] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-radial-fade pointer-events-none" />
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-white/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 relative">
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="max-w-2xl">
            <h1 className="text-[48px] sm:text-[60px] font-semibold tracking-tight text-white leading-[1.02]">
              Intelligence tools.
              <br />
              <span className="text-white/35">Built quiet.</span>
            </h1>

            <p className="mt-6 text-[16px] text-muted leading-relaxed max-w-md">
              A focused set of OSINT utilities that run in the browser.
              Fast, private, and ready when you need them.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_32px_rgba(255,255,255,0.12)]"
              >
                Open toolkit
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] text-muted hover:text-white border border-border rounded-xl hover:border-border-hover hover:bg-white/[0.03] transition-all"
              >
                Browse tools
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-px bg-border/60 rounded-xl overflow-hidden border border-border max-w-lg">
            {[
              { value: '20+', label: 'Tools' },
              { value: '0', label: 'Accounts' },
              { value: '100%', label: 'Local' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-5 py-4 text-center">
                <p className="text-[18px] font-semibold text-white tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[13px] font-medium text-muted uppercase tracking-wider">Featured</h2>
            <Link to="/tools" className="text-[12px] text-muted hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {featured.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="tool-card group p-4 rounded-xl border border-border bg-surface/80 backdrop-blur-sm hover:bg-surface-hover hover:border-border-hover"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-3 group-hover:from-white/[0.12] group-hover:to-white/[0.04] transition-all">
                    <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[13px] font-medium text-white mb-0.5">{tool.name}</h3>
                  <p className="text-[12px] text-muted">{tool.desc}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Principles */}
        <section className="pb-24">
          <div className="grid sm:grid-cols-3 gap-2.5">
            {[
              { icon: Shield, title: 'Runs locally', desc: 'Processing happens in your browser. Nothing is uploaded.' },
              { icon: Zap, title: 'No setup', desc: 'Open the page and start. No logins or config required.' },
              { icon: Eye, title: 'One tool, one page', desc: 'Clean dedicated pages. Results stay structured and copyable.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="p-5 rounded-xl border border-border bg-surface/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-bl-full" />
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-3">
                    <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[13px] font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-[12.5px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
