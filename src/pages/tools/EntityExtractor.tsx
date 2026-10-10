import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

const patterns = {
  ipv4: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
  ipv6: /\b(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\b/gi,
  domain: /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  md5: /\b[a-fA-F0-9]{32}\b/g,
  sha1: /\b[a-fA-F0-9]{40}\b/g,
  sha256: /\b[a-fA-F0-9]{64}\b/g,
  btc: /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b|\bbc1[a-z0-9]{39,59}\b/g,
  eth: /\b0x[a-fA-F0-9]{40}\b/g,
  url: /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi,
}

type Extracted = Record<string, string[]>

export default function EntityExtractor() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<Extracted | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const extract = () => {
    const found: Extracted = {}
    for (const [name, regex] of Object.entries(patterns)) {
      const matches = text.match(regex) || []
      const unique = [...new Set(matches)]
      if (unique.length > 0) {
        found[name] = unique
      }
    }
    setResults(found)
  }

  const copyAll = (items: string[], key: string) => {
    navigator.clipboard.writeText(items.join('\n'))
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const clear = () => {
    setText('')
    setResults(null)
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
          Entity Extractor
        </h1>
        <p className="mt-2 text-muted text-sm">
          Paste any text, logs or notes. Extracts IPs, domains, emails, hashes, crypto addresses and URLs.
        </p>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-border bg-surface p-5 mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here..."
          rows={8}
          className="w-full bg-transparent text-sm text-white placeholder:text-muted/50 resize-y focus:outline-none font-mono"
        />
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <button
            onClick={extract}
            disabled={!text.trim()}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Extract
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 text-sm text-muted hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {Object.keys(results).length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-6 text-center text-sm text-muted">
              No entities found.
            </div>
          ) : (
            Object.entries(results).map(([type, items]) => (
              <div key={type} className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white capitalize">{type}</span>
                    <span className="text-xs text-muted">{items.length}</span>
                  </div>
                  <button
                    onClick={() => copyAll(items, type)}
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
                  >
                    {copied === type ? (
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
                <div className="px-5 py-3 font-mono text-[13px] text-white space-y-1">
                  {items.map((item) => (
                    <div key={item} className="truncate">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
