import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, RefreshCw } from 'lucide-react'

function uuidv4() {
  if (crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidGenerator() {
  const [ids, setIds] = useState(() => Array.from({ length: 5 }, () => uuidv4()))
  const [copied, setCopied] = useState<string | null>(null)

  const regenerate = () => setIds(Array.from({ length: 5 }, () => uuidv4()))

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(ids.join('\n'))
    setCopied('all')
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">UUID Generator</h1>
        <p className="mt-1.5 text-[13px] text-muted">Generate version 4 UUIDs locally.</p>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={regenerate} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Generate new
        </button>
        <button onClick={copyAll} className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-border text-[12px] text-muted hover:text-white rounded-md transition-colors">
          {copied === 'all' ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy all</>}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border">
        {ids.map((id) => (
          <div key={id} className="px-4 py-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[13px] text-white">{id}</span>
            <button onClick={() => copy(id)} className="text-muted hover:text-white transition-colors shrink-0">
              {copied === id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
