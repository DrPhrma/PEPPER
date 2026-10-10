import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Loader2 } from 'lucide-react'

export default function SubdomainFinder() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [subs, setSubs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const search = async () => {
    const d = domain.trim().replace(/^https?:\/\//, '').split('/')[0].toLowerCase()
    if (!d) return
    setLoading(true)
    setError(null)
    setSubs([])
    try {
      // crt.sh public CT API — may be rate-limited; CORS usually allows browser calls
      const res = await fetch(`https://crt.sh/?q=%25.${encodeURIComponent(d)}&output=json`)
      if (!res.ok) throw new Error('crt.sh request failed')
      const data = await res.json()
      const names = new Set<string>()
      for (const row of data) {
        const raw = String(row.name_value || '')
        raw.split('\n').forEach((n: string) => {
          const clean = n.trim().toLowerCase().replace(/^\*\./, '')
          if (clean.endsWith(d) || clean === d) names.add(clean)
        })
      }
      const list = [...names].sort()
      setSubs(list)
      if (list.length === 0) setError('No subdomains found in Certificate Transparency logs.')
    } catch {
      setError('Could not reach crt.sh. The service may be down or blocked. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  const copyAll = () => {
    navigator.clipboard.writeText(subs.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Subdomain Finder</h1>
        <p className="mt-1.5 text-[13px] text-muted">Discover subdomains from Certificate Transparency logs (crt.sh).</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          placeholder="example.com"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button
          onClick={search}
          disabled={!domain.trim() || loading}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {loading ? 'Searching…' : 'Find subdomains'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300">{error}</div>
      )}

      {subs.length > 0 && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
            <span className="text-[12px] font-medium text-white">{subs.length} subdomains</span>
            <button onClick={copyAll} className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors">
              {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy all</>}
            </button>
          </div>
          <div className="px-4 py-3 font-mono text-[12.5px] text-white space-y-1 max-h-[480px] overflow-y-auto">
            {subs.map((s) => <div key={s}>{s}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}
