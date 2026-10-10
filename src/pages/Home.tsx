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
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-radial-fade pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 relative">
        <section className="pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] text-muted-2 font-medium">Client-side · No API keys</span>
            </div>

            <h1 className="text-[44px] sm:text-[56px] font-semibold tracking-tight text-white leading-[1.05]">
              OSINT tools that
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                stay private.
              </span>
            </h1>

            <p className="mt-6 text-[16px] text-muted leading-relaxed max-w-lg">
              A focused toolkit for open-source intelligence. Everything runs in your browser.
              Nothing is logged. Nothing leaves your machine.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_24px_rgba(255,255,255,0.1)]"
              >
                Explore tools
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

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
                  className="tool-card group p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3 group-hover:bg-white/[0.07] transition-colors">
                    <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[13px] font-medium text-white mb-0.5">{tool.name}</h3>
                  <p className="text-[12px] text-muted">{tool.desc}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="pb-24">
          <div className="grid sm:grid-cols-3 gap-2.5">
            {[
              { icon: Shield, title: 'Privacy first', desc: 'Pure client-side processing. Your data never touches a server.' },
              { icon: Zap, title: 'Zero keys', desc: 'No API keys, no accounts, no rate limits on local tools.' },
              { icon: Eye, title: 'Focused', desc: 'Every tool gets its own page. Results are structured and copyable.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="p-5 rounded-xl border border-border bg-surface relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-bl-full" />
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
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
