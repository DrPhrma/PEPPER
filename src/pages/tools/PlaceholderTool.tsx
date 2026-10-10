import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { tools } from '../../data/tools'

export default function PlaceholderTool() {
  const { slug } = useParams()
  const tool = tools.find((t) => t.id === slug || t.path?.endsWith(slug || ''))

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
          {tool?.name || 'Tool'}
        </h1>
        <p className="mt-2 text-muted text-sm">
          {tool?.description || 'This tool is coming soon.'}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">
          This tool page is ready for implementation.<br />
          We can build the full functionality next.
        </p>
      </div>
    </div>
  )
}
