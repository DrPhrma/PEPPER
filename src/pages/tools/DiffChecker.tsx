import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function diffLines(a: string, b: string) {
  const left = a.split('\n')
  const right = b.split('\n')
  const max = Math.max(left.length, right.length)
  const rows: { type: 'same' | 'add' | 'del' | 'change'; left?: string; right?: string }[] = []
  for (let i = 0; i < max; i++) {
    const L = left[i]
    const R = right[i]
    if (L === undefined) rows.push({ type: 'add', right: R })
    else if (R === undefined) rows.push({ type: 'del', left: L })
    else if (L === R) rows.push({ type: 'same', left: L, right: R })
    else rows.push({ type: 'change', left: L, right: R })
  }
  return rows
}

export default function DiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const rows = useMemo(() => diffLines(left, right), [left, right])
  const hasDiff = left.length > 0 || right.length > 0

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Diff Checker</h1>
        <p className="mt-1.5 text-[13px] text-muted">Compare two texts line by line.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-[11px] text-muted mb-2">Original</p>
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={10} placeholder="Paste original text…" className="w-full bg-transparent text-[12.5px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono" />
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-[11px] text-muted mb-2">Modified</p>
          <textarea value={right} onChange={(e) => setRight(e.target.value)} rows={10} placeholder="Paste modified text…" className="w-full bg-transparent text-[12.5px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono" />
        </div>
      </div>

      {hasDiff && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border text-[12px] font-medium text-white">Diff</div>
          <div className="font-mono text-[12px] max-h-[480px] overflow-y-auto">
            {rows.map((row, i) => (
              <div
                key={i}
                className={`px-4 py-1 flex gap-4 ${
                  row.type === 'add' ? 'bg-emerald-950/30 text-emerald-300' :
                  row.type === 'del' ? 'bg-red-950/30 text-red-300' :
                  row.type === 'change' ? 'bg-amber-950/20 text-amber-200' :
                  'text-muted'
                }`}
              >
                <span className="w-6 shrink-0 opacity-40">{i + 1}</span>
                <span className="flex-1 break-all whitespace-pre-wrap">
                  {row.type === 'add' && `+ ${row.right}`}
                  {row.type === 'del' && `- ${row.left}`}
                  {row.type === 'change' && `~ ${row.left}  →  ${row.right}`}
                  {row.type === 'same' && `  ${row.left}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
