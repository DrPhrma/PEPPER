import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Upload, X } from 'lucide-react'

export default function ExifTool() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (selected: File) => {
    setError(null)
    setMetadata(null)
    setFile(selected)

    // Preview
    const url = URL.createObjectURL(selected)
    setPreview(url)

    // Basic client-side EXIF using browser APIs + simple parsing
    // For a real implementation we would use the `exifr` library.
    // Here we show a clean structure and extract what we can natively.
    try {
      const basic: Record<string, any> = {
        'File Name': selected.name,
        'File Size': `${(selected.size / 1024).toFixed(1)} KB`,
        'File Type': selected.type || 'Unknown',
        'Last Modified': new Date(selected.lastModified).toLocaleString(),
      }

      // Try to get image dimensions
      const img = new Image()
      img.src = url
      await new Promise((resolve) => {
        img.onload = () => {
          basic['Width'] = `${img.width} px`
          basic['Height'] = `${img.height} px`
          resolve(null)
        }
        img.onerror = () => resolve(null)
      })

      setMetadata(basic)
    } catch (e) {
      setError('Could not read file metadata.')
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) {
      handleFile(f)
    } else {
      setError('Please drop an image file.')
    }
  }

  const clear = () => {
    setFile(null)
    setPreview(null)
    setMetadata(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Back + Title */}
      <div className="mb-8">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          All Tools
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Image EXIF Viewer
        </h1>
        <p className="mt-2 text-muted text-sm">
          Upload an image to extract basic metadata. Everything stays in your browser.
        </p>
      </div>

      {/* Input Card */}
      <div className="rounded-xl border border-border bg-surface p-6 mb-6">
        {!file ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className="border border-dashed border-[#333] rounded-lg p-12 text-center cursor-pointer hover:border-[#444] hover:bg-white/[0.02] transition-colors"
          >
            <Upload className="w-8 h-8 text-muted mx-auto mb-3" />
            <p className="text-sm text-white mb-1">Drop an image here or click to browse</p>
            <p className="text-xs text-muted">JPG, PNG, WebP, TIFF supported</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
            />
          </div>
        ) : (
          <div className="flex items-start gap-4">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border border-border"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{file.name}</p>
              <p className="text-xs text-muted mt-1">
                {(file.size / 1024).toFixed(1)} KB · {file.type}
              </p>
            </div>
            <button
              onClick={clear}
              className="p-1.5 rounded-md text-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg border border-red-900/50 bg-red-950/30 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Results */}
      {metadata && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-sm font-medium text-white">Metadata</h2>
          </div>
          <div className="divide-y divide-border">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="flex items-center px-5 py-3 text-sm">
                <span className="w-40 shrink-0 text-muted">{key}</span>
                <span className="text-white font-mono text-[13px]">{String(value)}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border text-xs text-muted">
            Note: Full EXIF (GPS, camera make, etc.) requires the <code className="text-white/70">exifr</code> library.
            This version shows basic file info. We can add full EXIF support next.
          </div>
        </div>
      )}
    </div>
  )
}
