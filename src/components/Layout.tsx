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
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white tracking-tight">OSINT</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-white bg-white/10'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/tools"
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                isActive('/tools')
                  ? 'text-white bg-white/10'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              Tools
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>Built for research & education. Use responsibly.</p>
          <p className="text-xs">All client-side tools run locally in your browser.</p>
        </div>
      </footer>
    </div>
  )
}
