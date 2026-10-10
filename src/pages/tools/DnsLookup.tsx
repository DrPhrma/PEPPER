import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Loader2 } from 'lucide-react'

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA', 'CAA'] as const

async function queryDoH(domain: string, type: string) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`
  const res = await fetch(url, { headers: { Accept: 'application/dns-json' } })
  if (!res.ok) throw new Error('DNS query failed')
  return res.json()
}

export default function DnsLookup() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Record<string, string[]> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const lookup = async () => {
    const d = domain.trim().replace(/^https?:\/\//, '').split('/')[0]
    if (!d) return
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const out: Record<string, string[]> = {}
      await Promise.all(
        RECORD_TYPES.map(async (type) => {
          try {
            const data = await queryDoH(d, type)
            const answers = (data.Answer || []).map((a: any) => a.data)
            if (answers.length) out[type] = answers
          } catch { /* skip failed type */ }
        })
      )
      setResults(out)
      if (Object.keys(out).length === 0) setError('No records found for this domain.')
    } catch {
      setError('Lookup failed. Check the domain and try again.')
    } finally {
      setLoading(false)
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
        <h1 className="text-[24px] font-semibold tracking-tight text-white">DNS Lookup</h1>
        <p className="mt-1.5 text-[13px] text-muted">Query DNS records via Cloudflare DNS-over-HTTPS.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && lookup()}
          placeholder="example.com"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button
          onClick={lookup}
          disabled={!domain.trim() || loading}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {loading ? 'Looking up…' : 'Lookup'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300">{error}</div>
      )}

      {results && Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {Object.entries(results).map(([type, records]) => (
            <div key={type} className="rounded-xl border border-border bg-surface overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                <span className="text-[12px] font-medium text-white">{type}</span>
                <button onClick={() => copy(records.join('\n'), type)} className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors">
                  {copied === type ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <div className="px-4 py-3 font-mono text-[12.5px] text-white space-y-1">
                {records.map((r, i) => <div key={i} className="break-all">{r}</div>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
