import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')

  const { matches, error } = useMemo(() => {
    if (!pattern || !text) return { matches: [] as RegExpMatchArray[], error: null as string | null }
    try {
      const re = new RegExp(pattern, flags)
      const out: RegExpMatchArray[] = []
      if (flags.includes('g')) {
        let m: RegExpExecArray | null
        const r = new RegExp(pattern, flags)
        while ((m = r.exec(text)) !== null) {
          out.push(m)
          if (m[0].length === 0) r.lastIndex++
        }
      } else {
        const m = text.match(re)
        if (m) out.push(m)
      }
      return { matches: out, error: null }
    } catch (e: any) {
      return { matches: [], error: e.message }
    }
  }, [pattern, flags, text])

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Regex Tester</h1>
        <p className="mt-1.5 text-[13px] text-muted">Test regular expressions against sample text in real time.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-3 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[11px] text-muted mb-1 block">Pattern</label>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[a-z]+" className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono border border-border rounded-lg px-3 py-2" />
          </div>
          <div className="w-24">
            <label className="text-[11px] text-muted mb-1 block">Flags</label>
            <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gim" className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono border border-border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="text-[11px] text-muted mb-1 block">Test string</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Paste text to test against…" className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono border border-border rounded-lg px-3 py-2" />
        </div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300 font-mono">{error}</div>}

      {!error && pattern && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border">
            <span className="text-[12px] font-medium text-white">{matches.length} match{matches.length === 1 ? '' : 'es'}</span>
          </div>
          {matches.length === 0 ? (
            <div className="px-4 py-6 text-[13px] text-muted text-center">No matches</div>
          ) : (
            <div className="divide-y divide-border">
              {matches.map((m, i) => (
                <div key={i} className="px-4 py-3">
                  <p className="font-mono text-[13px] text-white break-all">{m[0]}</p>
                  <p className="text-[11px] text-muted mt-1">Index: {m.index}</p>
                  {m.length > 1 && (
                    <div className="mt-1.5 space-y-0.5">
                      {m.slice(1).map((g, gi) => (
                        <p key={gi} className="text-[11px] text-muted font-mono">Group {gi + 1}: {g ?? '(empty)'}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
