import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

function toWords(s: string): string[] {
  return s
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-.\s]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())
}

const converters: { id: string; label: string; fn: (words: string[]) => string }[] = [
  { id: 'camel', label: 'camelCase', fn: (w) => w.map((x, i) => (i === 0 ? x : x[0].toUpperCase() + x.slice(1))).join('') },
  { id: 'pascal', label: 'PascalCase', fn: (w) => w.map((x) => x[0].toUpperCase() + x.slice(1)).join('') },
  { id: 'snake', label: 'snake_case', fn: (w) => w.join('_') },
  { id: 'kebab', label: 'kebab-case', fn: (w) => w.join('-') },
  { id: 'constant', label: 'CONSTANT_CASE', fn: (w) => w.map((x) => x.toUpperCase()).join('_') },
  { id: 'title', label: 'Title Case', fn: (w) => w.map((x) => x[0].toUpperCase() + x.slice(1)).join(' ') },
  { id: 'lower', label: 'lower case', fn: (w) => w.join(' ') },
  { id: 'upper', label: 'UPPER CASE', fn: (w) => w.map((x) => x.toUpperCase()).join(' ') },
]

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const words = useMemo(() => toWords(input), [input])

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Case Converter</h1>
        <p className="mt-1.5 text-[13px] text-muted">Convert between camel, snake, kebab, Pascal, and more.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="hello world or helloWorld or hello_world"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono"
        />
      </div>

      {input.trim() && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border">
          {converters.map((c) => {
            const value = words.length ? c.fn(words) : ''
            return (
              <div key={c.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] text-muted mb-0.5">{c.label}</p>
                  <p className="font-mono text-[13px] text-white truncate">{value}</p>
                </div>
                <button onClick={() => copy(value, c.id)} className="text-muted hover:text-white transition-colors shrink-0">
                  {copied === c.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
