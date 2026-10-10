import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { tools, categories, type ToolCategory } from '../data/tools'

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All')

  const filtered =
    activeCategory === 'All'
      ? tools
      : tools.filter((t) => t.category === activeCategory)

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-white">Tools</h1>
        <p className="mt-1.5 text-[14px] text-muted">
          {tools.length} tools · Client-side tools run in your browser · Link-outs open free services
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 text-[12px] rounded-md transition-colors ${
            activeCategory === 'All'
              ? 'bg-white text-black font-medium'
              : 'bg-surface border border-border text-muted hover:text-white hover:border-border-hover'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-[12px] rounded-md transition-colors ${
              activeCategory === cat
                ? 'bg-white text-black font-medium'
                : 'bg-surface border border-border text-muted hover:text-white hover:border-border-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
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
    <div className="h-full p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-all group flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-[14px] font-medium text-white leading-snug">
          {tool.name}
        </h3>
        {isLink ? (
          <ExternalLink className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
        ) : (
          <ArrowUpRight className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <p className="text-[12.5px] text-muted leading-relaxed flex-1">
        {tool.description}
      </p>
      <div className="mt-3 pt-2.5 border-t border-border">
        <span className="text-[11px] text-muted/80">{tool.category}</span>
      </div>
    </div>
  )

  if (isLink && tool.externalUrl) {
    return (
      <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
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
