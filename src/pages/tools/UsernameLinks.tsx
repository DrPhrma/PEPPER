import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const platforms = [
  { name: 'GitHub', url: (u: string) => `https://github.com/${u}` },
  { name: 'Twitter / X', url: (u: string) => `https://x.com/${u}` },
  { name: 'Instagram', url: (u: string) => `https://instagram.com/${u}` },
  { name: 'Reddit', url: (u: string) => `https://reddit.com/user/${u}` },
  { name: 'LinkedIn', url: (u: string) => `https://linkedin.com/in/${u}` },
  { name: 'YouTube', url: (u: string) => `https://youtube.com/@${u}` },
  { name: 'TikTok', url: (u: string) => `https://tiktok.com/@${u}` },
  { name: 'Twitch', url: (u: string) => `https://twitch.tv/${u}` },
  { name: 'Medium', url: (u: string) => `https://medium.com/@${u}` },
  { name: 'Dev.to', url: (u: string) => `https://dev.to/${u}` },
  { name: 'HackerNews', url: (u: string) => `https://news.ycombinator.com/user?id=${u}` },
  { name: 'Keybase', url: (u: string) => `https://keybase.io/${u}` },
  { name: 'GitLab', url: (u: string) => `https://gitlab.com/${u}` },
  { name: 'Bitbucket', url: (u: string) => `https://bitbucket.org/${u}` },
  { name: 'Pinterest', url: (u: string) => `https://pinterest.com/${u}` },
  { name: 'Flickr', url: (u: string) => `https://flickr.com/people/${u}` },
  { name: 'SoundCloud', url: (u: string) => `https://soundcloud.com/${u}` },
  { name: 'Spotify', url: (u: string) => `https://open.spotify.com/user/${u}` },
  { name: 'Steam', url: (u: string) => `https://steamcommunity.com/id/${u}` },
  { name: 'Telegram', url: (u: string) => `https://t.me/${u}` },
  { name: 'Discord (invite)', url: (u: string) => `https://discord.gg/${u}` },
  { name: 'About.me', url: (u: string) => `https://about.me/${u}` },
  { name: 'Product Hunt', url: (u: string) => `https://producthunt.com/@${u}` },
  { name: 'Behance', url: (u: string) => `https://behance.net/${u}` },
  { name: 'Dribbble', url: (u: string) => `https://dribbble.com/${u}` },
  { name: 'Vimeo', url: (u: string) => `https://vimeo.com/${u}` },
  { name: 'Tumblr', url: (u: string) => `https://${u}.tumblr.com` },
  { name: 'WordPress', url: (u: string) => `https://${u}.wordpress.com` },
  { name: 'Gravatar', url: (u: string) => `https://gravatar.com/${u}` },
  { name: 'Pastebin', url: (u: string) => `https://pastebin.com/u/${u}` },
]

export default function UsernameLinks() {
  const [username, setUsername] = useState('')
  const [show, setShow] = useState(false)

  const generate = () => {
    if (username.trim()) setShow(true)
  }

  const clean = username.trim().replace(/^@/, '')

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Username Links</h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Generate direct profile links across 30+ platforms. Does not check if the account exists.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={username}
          onChange={(e) => { setUsername(e.target.value); setShow(false) }}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
          placeholder="Enter username..."
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button
          onClick={generate}
          disabled={!username.trim()}
          className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Generate Links
        </button>
      </div>

      {show && clean && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border">
            <span className="text-[12px] font-medium text-white">
              Links for <span className="font-mono">{clean}</span>
            </span>
          </div>
          <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url(clean)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 hover:bg-surface-hover transition-colors group"
              >
                <span className="text-[13px] text-white">{p.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
