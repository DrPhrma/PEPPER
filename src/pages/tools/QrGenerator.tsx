import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'

export default function QrGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)
  const [show, setShow] = useState(false)

  const qrUrl = show && text.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text.trim())}&bgcolor=050505&color=ffffff&margin=10`
    : null

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">QR Code Generator</h1>
        <p className="mt-1.5 text-[13px] text-muted">Generate a QR code from any text or URL.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4 space-y-3">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setShow(false) }}
          placeholder="Text or URL…"
          rows={3}
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 resize-y focus:outline-none font-mono"
        />
        <div className="flex items-center gap-3">
          <label className="text-[12px] text-muted">Size</label>
          <input type="range" min={120} max={400} step={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="flex-1" />
          <span className="text-[12px] text-muted font-mono w-12">{size}px</span>
        </div>
        <button
          onClick={() => setShow(true)}
          disabled={!text.trim()}
          className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 transition-colors"
        >
          Generate
        </button>
      </div>

      {qrUrl && (
        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col items-center gap-4">
          <img src={qrUrl} alt="QR Code" width={size} height={size} className="rounded-lg" />
          <a
            href={qrUrl}
            download="qrcode.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] text-muted hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </a>
        </div>
      )}
    </div>
  )
}
