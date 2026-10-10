import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

export default function Timestamp() {
  const [now, setNow] = useState(Date.now())
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{
    unix: number
    iso: string
    local: string
    utc: string
  } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const convert = () => {
    const val = input.trim()
    if (!val) return

    let date: Date
    // If pure number → treat as unix (seconds or ms)
    if (/^\d+$/.test(val)) {
      const num = parseInt(val, 10)
      date = new Date(num > 1e12 ? num : num * 1000)
    } else {
      date = new Date(val)
    }

    if (isNaN(date.getTime())) {
      setResult(null)
      return
    }

    setResult({
      unix: Math.floor(date.getTime() / 1000),
      iso: date.toISOString(),
      local: date.toLocaleString(),
      utc: date.toUTCString(),
    })
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const currentUnix = Math.floor(now / 1000)

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Timestamp Converter</h1>
        <p className="mt-1.5 text-[13px] text-muted">Convert between Unix timestamps and human-readable dates.</p>
      </div>

      {/* Live clock */}
      <div className="rounded-xl border border-border bg-surface p-4 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted mb-0.5">Current Unix time</p>
          <p className="font-mono text-[15px] text-white">{currentUnix}</p>
        </div>
        <button
          onClick={() => copy(String(currentUnix), 'now')}
          className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors"
        >
          {copied === 'now' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>

      {/* Converter */}
      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && convert()}
          placeholder="Unix timestamp or date string..."
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Convert
        </button>
      </div>

      {result && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="divide-y divide-border">
            {[
              { label: 'Unix', value: String(result.unix) },
              { label: 'ISO 8601', value: result.iso },
              { label: 'Local', value: result.local },
              { label: 'UTC', value: result.utc },
            ].map((row) => (
              <div key={row.label} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] text-muted mb-0.5">{row.label}</p>
                  <p className="font-mono text-[13px] text-white truncate">{row.value}</p>
                </div>
                <button
                  onClick={() => copy(row.value, row.label)}
                  className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors shrink-0"
                >
                  {copied === row.label ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
