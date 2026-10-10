import { Link, useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-5 h-[52px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/15 to-white/5 border border-white/10 flex items-center justify-center group-hover:from-white/25 group-hover:to-white/10 transition-all shadow-[0_0_12px_rgba(255,255,255,0.05)]">
              <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">PEPPER</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-1.5 text-[13px] rounded-lg transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'text-white bg-white/[0.08] border border-white/[0.06]'
                  : 'text-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/tools"
              className={`px-3.5 py-1.5 text-[13px] rounded-lg transition-all ${
                isActive('/tools')
                  ? 'text-white bg-white/[0.08] border border-white/[0.06]'
                  : 'text-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Tools
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative">
        {children}
      </main>

      <footer className="border-t border-border/60 py-7 mt-auto">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-muted">
          <p>For research and education. Use responsibly.</p>
          <p className="text-muted/60">PEPPER</p>
        </div>
      </footer>
    </div>
  )
}
