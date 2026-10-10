import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react'

async function sha1(text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-1', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

export default function PasswordCheck() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ breached: boolean; count: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const check = async () => {
    if (!password) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const hash = await sha1(password)
      const prefix = hash.slice(0, 5)
      const suffix = hash.slice(5)
      // Only first 5 chars sent — k-anonymity model
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
      if (!res.ok) throw new Error('HIBP request failed')
      const text = await res.text()
      const lines = text.split('\n')
      let count = 0
      for (const line of lines) {
        const [hashSuffix, n] = line.trim().split(':')
        if (hashSuffix === suffix) {
          count = parseInt(n, 10)
          break
        }
      }
      setResult({ breached: count > 0, count })
    } catch {
      setError('Could not reach Have I Been Pwned. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Password Breach Check</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Checks if a password appears in known breaches using k-anonymity.
          Only the first 5 characters of the SHA-1 hash are sent — never the password itself.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setResult(null) }}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder="Enter password…"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
          autoComplete="off"
        />
        <button
          onClick={check}
          disabled={!password || loading}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {loading ? 'Checking…' : 'Check password'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300">{error}</div>
      )}

      {result && (
        <div className={`rounded-xl border p-5 ${
          result.breached
            ? 'border-red-900/50 bg-red-950/20'
            : 'border-emerald-900/40 bg-emerald-950/15'
        }`}>
          <div className="flex items-start gap-3">
            {result.breached ? (
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-[14px] font-medium ${
                result.breached ? 'text-red-300' : 'text-emerald-300'
              }`}>
                {result.breached ? 'Found in breaches' : 'Not found in known breaches'}
              </p>
              <p className="text-[13px] text-muted mt-1">
                {result.breached
                  ? `Seen ${result.count.toLocaleString()} time${result.count === 1 ? '' : 's'} in breach data. Do not use this password.`
                  : 'This password does not appear in the HIBP dataset. Still use a unique password per site.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
