import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split('\n').length : 0
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.trim() ? 1 : 0) : 0
    return { chars, charsNoSpace, words, lines, paragraphs, sentences }
  }, [text])

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Word Counter</h1>
        <p className="mt-1.5 text-[13px] text-muted">Count words, characters, lines, and paragraphs in real time.</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Chars', value: stats.chars },
          { label: 'No spaces', value: stats.charsNoSpace },
          { label: 'Lines', value: stats.lines },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Sentences', value: stats.sentences },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface px-3 py-3 text-center">
            <p className="text-[18px] font-semibold text-white tabular-nums">{s.value}</p>
            <p className="text-[10px] text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text…"
          rows={12}
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 resize-y focus:outline-none"
        />
      </div>
    </div>
  )
}
