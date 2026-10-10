import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

function parseJwt(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) throw new Error('Invalid JWT format')

    const decode = (str: string) => {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
      return JSON.parse(decodeURIComponent(escape(atob(padded))))
    }

    return {
      header: decode(parts[0]),
      payload: decode(parts[1]),
      signature: parts[2],
    }
  } catch {
    return null
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<ReturnType<typeof parseJwt>>(null)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const decode = () => {
    const parsed = parseJwt(token.trim())
    if (parsed) {
      setResult(parsed)
      setError(false)
    } else {
      setResult(null)
      setError(true)
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
          <ArrowLeft className="w-3.5 h-3.5" />
          All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">JWT Decoder</h1>
        <p className="mt-1.5 text-[13px] text-muted">Decode and inspect JSON Web Tokens. Nothing is sent anywhere.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here..."
          rows={4}
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono"
        />
        <div className="mt-3 pt-3 border-t border-border">
          <button
            onClick={decode}
            disabled={!token.trim()}
            className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Decode
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300">
          Invalid JWT. Check the token format.
        </div>
      )}

      {result && (
        <div className="space-y-3">
          {(['header', 'payload'] as const).map((part) => (
            <div key={part} className="rounded-xl border border-border bg-surface overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                <span className="text-[12px] font-medium text-white capitalize">{part}</span>
                <button
                  onClick={() => copy(JSON.stringify(result[part], null, 2), part)}
                  className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors"
                >
                  {copied === part ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <pre className="px-4 py-3 font-mono text-[12px] text-white overflow-x-auto">
                {JSON.stringify(result[part], null, 2)}
              </pre>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border">
              <span className="text-[12px] font-medium text-white">Signature</span>
            </div>
            <div className="px-4 py-3 font-mono text-[12px] text-muted break-all">
              {result.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
