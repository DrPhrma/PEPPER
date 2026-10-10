import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

async function hashText(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<string, string> | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generate = async () => {
    if (!input) return
    const algorithms = [
      { name: 'SHA-1', algo: 'SHA-1' },
      { name: 'SHA-256', algo: 'SHA-256' },
      { name: 'SHA-512', algo: 'SHA-512' },
    ]

    const out: Record<string, string> = {}
    for (const { name, algo } of algorithms) {
      out[name] = await hashText(algo, input)
    }
    setResults(out)
  }

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          All Tools
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Hash Generator
        </h1>
        <p className="mt-2 text-muted text-sm">
          Generate SHA-1, SHA-256 and SHA-512 hashes. Runs entirely in your browser.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          rows={5}
          className="w-full bg-transparent text-sm text-white placeholder:text-muted/50 resize-y focus:outline-none font-mono"
        />
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={generate}
            disabled={!input.trim()}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Generate Hashes
          </button>
        </div>
      </div>

      {results && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-sm font-medium text-white">Results</h2>
          </div>
          <div className="divide-y divide-border">
            {Object.entries(results).map(([name, value]) => (
              <div key={name} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted font-medium">{name}</span>
                  <button
                    onClick={() => copy(value, name)}
                    className="flex items-center gap-1 text-xs text-muted hover:text-white transition-colors"
                  >
                    {copied === name ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-[13px] text-white break-all">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
