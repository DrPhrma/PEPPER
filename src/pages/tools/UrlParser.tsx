import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

export default function UrlParser() {
  const [input, setInput] = useState('')
  const [parts, setParts] = useState<Record<string, string> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const parse = () => {
    try {
      const u = new URL(input.trim().includes('://') ? input.trim() : `https://${input.trim()}`)
      const params: string[] = []
      u.searchParams.forEach((v, k) => params.push(`${k}=${v}`))
      setParts({
        href: u.href,
        protocol: u.protocol.replace(':', ''),
        host: u.host,
        hostname: u.hostname,
        port: u.port || '(default)',
        pathname: u.pathname,
        search: u.search || '(none)',
        hash: u.hash || '(none)',
        origin: u.origin,
        params: params.length ? params.join('\n') : '(none)',
      })
      setError(null)
    } catch {
      setParts(null)
      setError('Invalid URL')
    }
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">URL Parser</h1>
        <p className="mt-1.5 text-[13px] text-muted">Break a URL into protocol, host, path, query, and hash.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && parse()}
          placeholder="https://example.com/path?q=1#hash"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button onClick={parse} disabled={!input.trim()} className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 transition-colors">Parse</button>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300">{error}</div>}

      {parts && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border">
          {Object.entries(parts).map(([key, value]) => (
            <div key={key} className="px-4 py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] text-muted mb-0.5">{key}</p>
                <p className="font-mono text-[13px] text-white break-all whitespace-pre-wrap">{value}</p>
              </div>
              <button onClick={() => copy(value, key)} className="text-muted hover:text-white transition-colors shrink-0 mt-1">
                {copied === key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
