import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ExternalLink, ArrowUpRight, FileSearch, Image, Hash, Binary,
  Globe, Server, User, Shield, Wrench, Search
} from 'lucide-react'
import { tools, categories, type ToolCategory } from '../data/tools'

const categoryIcons: Record<string, React.ElementType> = {
  'Text & Extraction': FileSearch,
  'Image Forensics': Image,
  'Hashes & Encoding': Hash,
  'Domain & Network': Globe,
  'IP & Hosting': Server,
  'Identity & Username': User,
  'Threat Intel': Shield,
  'Utilities': Wrench,
}

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All')
  const [search, setSearch] = useState('')

  const filtered = tools.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-white">Tools</h1>
        <p className="mt-1.5 text-[14px] text-muted">{tools.length} tools available</p>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-[13px] text-white placeholder:text-muted/50 focus:outline-none focus:border-border-hover transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 text-[12px] rounded-lg transition-all ${
            activeCategory === 'All'
              ? 'bg-white text-black font-semibold'
              : 'bg-surface border border-border text-muted hover:text-white hover:border-border-hover'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-[12px] rounded-lg transition-all ${
              activeCategory === cat
                ? 'bg-white text-black font-semibold'
                : 'bg-surface border border-border text-muted hover:text-white hover:border-border-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted text-[14px]">No tools match your search.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((tool) => {
            const Icon = categoryIcons[tool.category] || Binary
            const isLink = tool.type === 'link'

            const content = (
              <div className="tool-card h-full p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover group flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                    <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
                  </div>
                  {isLink ? (
                    <ExternalLink className="w-3.5 h-3.5 text-muted shrink-0 mt-1" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <h3 className="text-[13.5px] font-medium text-white leading-snug mb-1">{tool.name}</h3>
                <p className="text-[12px] text-muted leading-relaxed flex-1">{tool.description}</p>
                <div className="mt-3 pt-2.5 border-t border-border/80">
                  <span className="text-[11px] text-muted/70">{tool.category}</span>
                </div>
              </div>
            )

            if (isLink && tool.externalUrl) {
              return (
                <a key={tool.id} href={tool.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {content}
                </a>
              )
            }

            return (
              <Link key={tool.id} to={tool.path || '#'} className="block h-full">
                {content}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
