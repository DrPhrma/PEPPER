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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-13 flex items-center justify-between" style={{ height: '52px' }}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 rounded-md bg-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
              <Search className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">PEPPER</span>
          </Link>

          <nav className="flex items-center gap-0.5">
            <Link
              to="/"
              className={`px-3 py-1.5 text-[13px] rounded-md transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-white bg-white/[0.08]'
                  : 'text-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/tools"
              className={`px-3 py-1.5 text-[13px] rounded-md transition-colors ${
                isActive('/tools')
                  ? 'text-white bg-white/[0.08]'
                  : 'text-muted hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Tools
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-muted">
          <p>For research & education only. Use responsibly.</p>
          <p>Client-side · No tracking · No accounts</p>
        </div>
      </footer>
    </div>
  )
}
