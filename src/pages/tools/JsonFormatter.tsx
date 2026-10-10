import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError(null)
    } catch (e: any) {
      setError(e.message || 'Invalid JSON')
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError(null)
    } catch (e: any) {
      setError(e.message || 'Invalid JSON')
      setOutput('')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">JSON Formatter</h1>
        <p className="mt-1.5 text-[13px] text-muted">Validate, format, and minify JSON.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"paste": "json here"}'
          rows={8}
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono"
        />
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <button onClick={format} disabled={!input.trim()} className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 transition-colors">Format</button>
          <button onClick={minify} disabled={!input.trim()} className="px-3.5 py-1.5 bg-surface-2 border border-border text-[12px] text-white rounded-md hover:bg-surface-hover disabled:opacity-30 transition-colors">Minify</button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300 font-mono">{error}</div>
      )}

      {output && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
            <span className="text-[12px] font-medium text-white">Output</span>
            <button onClick={copy} className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors">
              {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
          <pre className="px-4 py-3 font-mono text-[12.5px] text-white overflow-x-auto whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}
