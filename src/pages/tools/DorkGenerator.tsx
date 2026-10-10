import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'

type DorkType = 'username' | 'email' | 'domain' | 'phone' | 'name'

const dorkTemplates: Record<DorkType, { label: string; dorks: { title: string; query: (v: string) => string }[] }> = {
  username: {
    label: 'Username',
    dorks: [
      { title: 'Exact match', query: (v) => `"${v}"` },
      { title: 'Social profiles', query: (v) => `"${v}" (site:twitter.com OR site:x.com OR site:instagram.com OR site:facebook.com OR site:linkedin.com)` },
      { title: 'Code & repos', query: (v) => `"${v}" (site:github.com OR site:gitlab.com OR site:bitbucket.org)` },
      { title: 'Forums', query: (v) => `"${v}" (site:reddit.com OR site:stackexchange.com OR site:quora.com)` },
      { title: 'Documents', query: (v) => `"${v}" filetype:pdf OR filetype:doc OR filetype:xlsx` },
      { title: 'Pastes', query: (v) => `"${v}" (site:pastebin.com OR site:ghostbin.com OR site:hastebin.com)` },
    ],
  },
  email: {
    label: 'Email',
    dorks: [
      { title: 'Exact email', query: (v) => `"${v}"` },
      { title: 'In documents', query: (v) => `"${v}" (filetype:pdf OR filetype:doc OR filetype:xls OR filetype:txt)` },
      { title: 'In code', query: (v) => `"${v}" (site:github.com OR site:gitlab.com)` },
      { title: 'Breaches / pastes', query: (v) => `"${v}" (site:pastebin.com OR "breach" OR "leak")` },
      { title: 'Contact pages', query: (v) => `"${v}" (contact OR email OR "get in touch")` },
    ],
  },
  domain: {
    label: 'Domain',
    dorks: [
      { title: 'Site search', query: (v) => `site:${v}` },
      { title: 'Subdomains', query: (v) => `site:*.${v}` },
      { title: 'Login pages', query: (v) => `site:${v} (login OR signin OR "log in" OR "sign in")` },
      { title: 'Exposed files', query: (v) => `site:${v} (filetype:pdf OR filetype:xls OR filetype:doc OR filetype:sql OR filetype:env)` },
      { title: 'Directory listing', query: (v) => `site:${v} intitle:"index of"` },
      { title: 'Admin panels', query: (v) => `site:${v} (admin OR dashboard OR panel OR cpanel)` },
      { title: 'API endpoints', query: (v) => `site:${v} (api OR swagger OR graphql OR "/v1/" OR "/v2/")` },
    ],
  },
  phone: {
    label: 'Phone',
    dorks: [
      { title: 'Exact number', query: (v) => `"${v}"` },
      { title: 'With country code variants', query: (v) => `"${v}" OR "${v.replace(/^\+/, '')}" OR "${v.replace(/\D/g, '')}"` },
      { title: 'In documents', query: (v) => `"${v}" (filetype:pdf OR filetype:doc OR filetype:xls)` },
      { title: 'Social / profiles', query: (v) => `"${v}" (profile OR contact OR phone OR mobile)` },
    ],
  },
  name: {
    label: 'Full Name',
    dorks: [
      { title: 'Exact name', query: (v) => `"${v}"` },
      { title: 'Resume / CV', query: (v) => `"${v}" (resume OR cv OR "curriculum vitae")` },
      { title: 'Social profiles', query: (v) => `"${v}" (site:linkedin.com OR site:facebook.com OR site:twitter.com OR site:x.com)` },
      { title: 'News & articles', query: (v) => `"${v}" (news OR article OR interview)` },
      { title: 'Documents', query: (v) => `"${v}" (filetype:pdf OR filetype:doc)` },
    ],
  },
}

export default function DorkGenerator() {
  const [type, setType] = useState<DorkType>('username')
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)

  const generate = () => {
    if (value.trim()) setShow(true)
  }

  const dorks = show && value.trim() ? dorkTemplates[type].dorks : []

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Google Dork Generator</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Generate ready-to-use Google search operators for usernames, emails, domains and more.
        </p>
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {(Object.keys(dorkTemplates) as DorkType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setType(t); setShow(false) }}
            className={`px-3 py-1.5 text-[12px] rounded-md transition-colors ${
              type === t
                ? 'bg-white text-black font-medium'
                : 'bg-surface border border-border text-muted hover:text-white'
            }`}
          >
            {dorkTemplates[t].label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); setShow(false) }}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
          placeholder={`Enter ${dorkTemplates[type].label.toLowerCase()}...`}
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button
          onClick={generate}
          disabled={!value.trim()}
          className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Generate Dorks
        </button>
      </div>

      {dorks.length > 0 && (
        <div className="space-y-2">
          {dorks.map((d) => {
            const q = d.query(value.trim())
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`
            return (
              <div key={d.title} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-medium text-white">{d.title}</span>
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-muted hover:text-white transition-colors"
                  >
                    Open in Google <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="font-mono text-[12px] text-muted-2 break-all">{q}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
