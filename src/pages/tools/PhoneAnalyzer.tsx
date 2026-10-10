import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Lightweight offline phone analysis (no external lib)
const COUNTRY_CODES: Record<string, { name: string; len: number[] }> = {
  '1': { name: 'US / Canada', len: [10] },
  '44': { name: 'United Kingdom', len: [10] },
  '91': { name: 'India', len: [10] },
  '86': { name: 'China', len: [11] },
  '49': { name: 'Germany', len: [10, 11] },
  '33': { name: 'France', len: [9] },
  '81': { name: 'Japan', len: [10] },
  '61': { name: 'Australia', len: [9] },
  '55': { name: 'Brazil', len: [10, 11] },
  '7': { name: 'Russia / Kazakhstan', len: [10] },
  '82': { name: 'South Korea', len: [9, 10] },
  '39': { name: 'Italy', len: [9, 10] },
  '34': { name: 'Spain', len: [9] },
  '52': { name: 'Mexico', len: [10] },
  '62': { name: 'Indonesia', len: [9, 10, 11, 12] },
  '966': { name: 'Saudi Arabia', len: [9] },
  '971': { name: 'UAE', len: [9] },
  '65': { name: 'Singapore', len: [8] },
  '60': { name: 'Malaysia', len: [9, 10] },
  '92': { name: 'Pakistan', len: [10] },
  '880': { name: 'Bangladesh', len: [10] },
  '234': { name: 'Nigeria', len: [10] },
  '27': { name: 'South Africa', len: [9] },
}

function analyze(raw: string) {
  const digits = raw.replace(/[^\d+]/g, '')
  const cleaned = digits.startsWith('+') ? digits.slice(1) : digits.replace(/^00/, '')
  if (!cleaned || cleaned.length < 7) return null

  // Try longest country code match first
  const codes = Object.keys(COUNTRY_CODES).sort((a, b) => b.length - a.length)
  for (const code of codes) {
    if (cleaned.startsWith(code)) {
      const national = cleaned.slice(code.length)
      const info = COUNTRY_CODES[code]
      const validLen = info.len.includes(national.length)
      return {
        e164: `+${code}${national}`,
        countryCode: `+${code}`,
        country: info.name,
        national,
        length: national.length,
        validLength: validLen,
        digitsOnly: cleaned,
      }
    }
  }

  return {
    e164: `+${cleaned}`,
    countryCode: 'Unknown',
    country: 'Unknown region',
    national: cleaned,
    length: cleaned.length,
    validLength: cleaned.length >= 8 && cleaned.length <= 15,
    digitsOnly: cleaned,
  }
}

export default function PhoneAnalyzer() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof analyze>>(null)

  const run = () => setResult(analyze(input.trim()))

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="mb-8">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <h1 className="text-[24px] font-semibold tracking-tight text-white">Phone Analyzer</h1>
        <p className="mt-1.5 text-[13px] text-muted">Offline parse of country code, format, and length checks. No data leaves the browser.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 mb-4">
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null) }}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder="+1 555 123 4567"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-muted/40 focus:outline-none font-mono mb-3"
        />
        <button onClick={run} disabled={!input.trim()} className="px-3.5 py-1.5 bg-white text-black text-[12px] font-medium rounded-md hover:bg-white/90 disabled:opacity-30 transition-colors">
          Analyze
        </button>
      </div>

      {result === null && input.trim() === '' ? null : result === null ? (
        <div className="p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-[13px] text-red-300">Could not parse this number.</div>
      ) : (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="divide-y divide-border">
            {[
              { label: 'E.164', value: result.e164 },
              { label: 'Country', value: result.country },
              { label: 'Country code', value: result.countryCode },
              { label: 'National number', value: result.national },
              { label: 'Digit length', value: String(result.length) },
              { label: 'Length check', value: result.validLength ? 'Looks valid' : 'Unusual length' },
            ].map((row) => (
              <div key={row.label} className="px-4 py-3 flex items-center gap-4 text-[13px]">
                <span className="w-36 shrink-0 text-muted">{row.label}</span>
                <span className="text-white font-mono">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
