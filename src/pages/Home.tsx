import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Eye, Fingerprint, Hash, FileSearch, Link2, Github } from 'lucide-react'

const featured = [
  { name: 'Entity Extractor', desc: 'Pull IOCs from any text', path: '/tools/entity-extractor', icon: FileSearch },
  { name: 'Hash Generator', desc: 'SHA-1, SHA-256, SHA-512', path: '/tools/hash', icon: Hash },
  { name: 'Username Links', desc: '30+ platform profile links', path: '/tools/username-links', icon: Link2 },
  { name: 'JWT Decoder', desc: 'Inspect tokens instantly', path: '/tools/jwt', icon: Fingerprint },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:64px_64px] anim-grid pointer-events-none" />

      {/* Radial fade */}
      <div className="absolute inset-x-0 top-0 h-[560px] bg-radial-fade pointer-events-none" />

      {/* Floating ambient orbs — loop forever */}
      <div className="absolute top-[8%] left-[15%] w-[320px] h-[320px] rounded-full bg-white/[0.03] blur-[90px] anim-float-slow pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[240px] h-[240px] rounded-full bg-white/[0.025] blur-[80px] anim-float-mid pointer-events-none" />
      <div className="absolute bottom-[20%] left-[40%] w-[180px] h-[180px] rounded-full bg-white/[0.02] blur-[70px] anim-pulse-glow pointer-events-none" />

      {/* Soft center bloom */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[320px] rounded-full bg-white/[0.035] blur-[100px] anim-pulse-glow pointer-events-none" />

      {/* Orbiting dots (decorative, idle motion) */}
      <div className="absolute top-[180px] right-[18%] w-[160px] h-[160px] pointer-events-none hidden lg:block" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="anim-orbit">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="anim-orbit-rev">
            <div className="w-1 h-1 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      {/* Horizontal scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent anim-scan pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-5 relative">
        <section className="pt-32 pb-20">
          <div className="max-w-2xl">
            <p className="text-[12px] font-medium text-muted tracking-wide mb-4 anim-fade-up">
              <span className="text-white">PEPPER</span>
              <span className="text-muted/50 mx-2">·</span>
              Platform for Extended Public Profile & Entity Research
            </p>

            <h1 className="text-[48px] sm:text-[60px] font-semibold tracking-tight text-white leading-[1.02] anim-fade-up-delay-1">
              Intelligence tools.
              <br />
              <span className="text-white/35">Built quiet.</span>
            </h1>

            <p className="mt-6 text-[16px] text-muted leading-relaxed max-w-md anim-fade-up-delay-2">
              A focused set of OSINT utilities that run in the browser.
              Fast, private, and ready when you need them.
            </p>

            <div className="mt-10 flex items-center gap-3 anim-fade-up-delay-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_32px_rgba(255,255,255,0.12)] hover:shadow-[0_0_48px_rgba(255,255,255,0.18)]"
              >
                Open toolkit
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://github.com/DrPhrma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] text-muted hover:text-white border border-border rounded-xl hover:border-border-hover hover:bg-white/[0.03] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-px bg-border/60 rounded-xl overflow-hidden border border-border max-w-lg anim-fade-up-delay-4">
            {[
              { value: '20+', label: 'Tools' },
              { value: '0', label: 'Accounts' },
              { value: '100%', label: 'Local' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-5 py-4 text-center hover:bg-surface-hover transition-colors">
                <p className="text-[18px] font-semibold text-white tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[13px] font-medium text-muted uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 anim-blink" />
              Featured
            </h2>
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
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-3 group-hover:from-white/[0.14] group-hover:to-white/[0.05] group-hover:scale-105 transition-all duration-300">
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
              { icon: Shield, title: 'Runs locally', desc: 'Processing happens in your browser. Nothing is uploaded.' },
              { icon: Zap, title: 'No setup', desc: 'Open the page and start. No logins or config required.' },
              { icon: Eye, title: 'One tool, one page', desc: 'Clean dedicated pages. Results stay structured and copyable.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="tool-card p-5 rounded-xl border border-border bg-surface/80 relative overflow-hidden">
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
