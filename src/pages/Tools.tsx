import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { tools, categories, type ToolCategory } from '../data/tools'

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All')

  const filtered =
    activeCategory === 'All'
      ? tools
      : tools.filter((t) => t.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Tools</h1>
        <p className="mt-2 text-muted">
          {tools.length} tools available. Client-side tools run in your browser. Link-outs open the original free service.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            activeCategory === 'All'
              ? 'bg-white text-black font-medium'
              : 'bg-surface border border-border text-muted hover:text-white hover:bg-surface-hover'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeCategory === cat
                ? 'bg-white text-black font-medium'
                : 'bg-surface border border-border text-muted hover:text-white hover:bg-surface-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  const isLink = tool.type === 'link'

  const content = (
    <div className="h-full p-5 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-[#333] transition-all group flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-medium text-white group-hover:text-white">
          {tool.name}
        </h3>
        {isLink ? (
          <ExternalLink className="w-4 h-4 text-muted shrink-0 mt-0.5" />
        ) : (
          <ArrowRight className="w-4 h-4 text-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <p className="text-sm text-muted leading-relaxed flex-1">
        {tool.description}
      </p>
      <div className="mt-4 pt-3 border-t border-border">
        <span className="text-xs text-muted">{tool.category}</span>
      </div>
    </div>
  )

  if (isLink && tool.externalUrl) {
    return (
      <a
        href={tool.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={tool.path || '#'} className="block h-full">
      {content}
    </Link>
  )
}
