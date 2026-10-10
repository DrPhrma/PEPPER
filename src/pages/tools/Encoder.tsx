import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, ArrowDownUp } from 'lucide-react'

type Mode = 'base64' | 'url' | 'hex' | 'html'

function encode(mode: Mode, text: string): string {
  try {
    if (mode === 'base64') return btoa(unescape(encodeURIComponent(text)))
    if (mode === 'url') return encodeURIComponent(text)
    if (mode === 'hex') {
      return Array.from(new TextEncoder().encode(text))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }
    if (mode === 'html') {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }
  } catch {
    return 'Error encoding'
  }
  return ''
}

function decode(mode: Mode, text: string): string {
  try {
    if (mode === 'base64') return decodeURIComponent(escape(atob(text)))
    if (mode === 'url') return decodeURIComponent(text)
    if (mode === 'hex') {
      const bytes = text.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) || []
      return new TextDecoder().decode(new Uint8Array(bytes))
    }
    if (mode === 'html') {
      const el = document.createElement('textarea')
      el.innerHTML = text
      return el.value
    }
  } catch {
    return 'Error decoding — check input'
  }
  return ''
}

export default function Encoder() {
  const [mode, setMode] = useState<Mode>('base64')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const runEncode = () => setOutput(encode(mode, input))
  const runDecode = () => setOutput(decode(mode, input))

  const swap = () => {
    setInput(output)
    setOutput(input)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const modes: { id: Mode; label: string }[] = [
    { id: 'base64', label: 'Base64' },
    { id: 'url', label: 'URL' },
    { id: 'hex', label: 'Hex' },
    { id: 'html', label: 'HTML' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Encoder / Decoder</h1>
        <p className="mt-1.5 text-[13px] text-muted">Base64, URL, Hex and HTML encoding utilities.</p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 mb-4">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setOutput('') }}
            className={`px-3 py-1.5 text-[12px] rounded-md transition-colors ${
              mode === m.id
                ? 'bg-white text-black font-medium'
                : 'bg-surface border border-border text-muted hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="rounded-xl border border-border bg-surface p-4 mb-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          rows={4}
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono"
        />
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <button
            onClick={runEncode}
            disabled={!input.trim()}
            className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Encode
          </button>
          <button
            onClick={runDecode}
            disabled={!input.trim()}
            className="px-3.5 py-1.5 bg-surface-2 border border-border text-[12px] text-white rounded-md hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Decode
          </button>
          <button
            onClick={swap}
            disabled={!output}
            className="p-1.5 text-muted hover:text-white disabled:opacity-30 transition-colors ml-auto"
            title="Swap"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
            <span className="text-[12px] font-medium text-white">Result</span>
            <button onClick={copy} className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors">
              {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
          <div className="px-4 py-3 font-mono text-[12.5px] text-white break-all whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
