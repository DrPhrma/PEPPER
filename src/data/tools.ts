export type ToolCategory =
  | 'Text & Extraction'
  | 'Image Forensics'
  | 'Hashes & Encoding'
  | 'Domain & Network'
  | 'IP & Hosting'
  | 'Identity & Username'
  | 'Threat Intel'
  | 'Utilities'

export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  type: 'client' | 'link'
  path?: string
  externalUrl?: string
}

export const tools: Tool[] = [
  // Text & Extraction
  {
    id: 'entity-extractor',
    name: 'Entity Extractor',
    description: 'Paste any text and extract IPs, domains, emails, hashes, crypto addresses and more.',
    category: 'Text & Extraction',
    type: 'client',
    path: '/tools/entity-extractor',
  },
  {
    id: 'dork-generator',
    name: 'Google Dork Generator',
    description: 'Generate ready-to-use Google dorks for usernames, emails, domains and phones.',
    category: 'Text & Extraction',
    type: 'client',
    path: '/tools/dork-generator',
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    description: 'Test regular expressions against sample text in real time.',
    category: 'Text & Extraction',
    type: 'client',
    path: '/tools/regex',
  },
  {
    id: 'diff',
    name: 'Diff Checker',
    description: 'Compare two texts line by line and highlight changes.',
    category: 'Text & Extraction',
    type: 'client',
    path: '/tools/diff',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, lines, sentences and paragraphs.',
    category: 'Text & Extraction',
    type: 'client',
    path: '/tools/word-counter',
  },

  // Image Forensics
  {
    id: 'exif',
    name: 'Image EXIF Viewer',
    description: 'Upload an image to extract metadata, dimensions and file info.',
    category: 'Image Forensics',
    type: 'client',
    path: '/tools/exif',
  },
  {
    id: 'qr',
    name: 'QR Code Generator',
    description: 'Generate a QR code from any text or URL.',
    category: 'Image Forensics',
    type: 'client',
    path: '/tools/qr',
  },

  // Hashes & Encoding
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate SHA-1, SHA-256 and SHA-512 hashes of text.',
    category: 'Hashes & Encoding',
    type: 'client',
    path: '/tools/hash',
  },
  {
    id: 'encoder',
    name: 'Encoder / Decoder',
    description: 'Base64, URL, Hex and HTML encode/decode utilities.',
    category: 'Hashes & Encoding',
    type: 'client',
    path: '/tools/encoder',
  },
  {
    id: 'jwt',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens instantly.',
    category: 'Hashes & Encoding',
    type: 'client',
    path: '/tools/jwt',
  },
  {
    id: 'case',
    name: 'Case Converter',
    description: 'Convert between camelCase, snake_case, kebab-case, PascalCase and more.',
    category: 'Hashes & Encoding',
    type: 'client',
    path: '/tools/case',
  },

  // Domain & Network
  {
    id: 'dns',
    name: 'DNS Lookup',
    description: 'Query A, AAAA, MX, TXT, NS and other records via DNS-over-HTTPS.',
    category: 'Domain & Network',
    type: 'client',
    path: '/tools/dns',
  },
  {
    id: 'crtsh',
    name: 'Subdomain Finder',
    description: 'Discover subdomains from Certificate Transparency logs (crt.sh).',
    category: 'Domain & Network',
    type: 'client',
    path: '/tools/crtsh',
  },
  {
    id: 'url-parser',
    name: 'URL Parser',
    description: 'Break a URL into protocol, host, path, query params and hash.',
    category: 'Domain & Network',
    type: 'client',
    path: '/tools/url-parser',
  },
  {
    id: 'wayback',
    name: 'Wayback Machine',
    description: 'Check historical snapshots of any URL.',
    category: 'Domain & Network',
    type: 'link',
    externalUrl: 'https://web.archive.org/',
  },

  // IP & Hosting
  {
    id: 'shodan',
    name: 'Shodan',
    description: 'Search engine for internet-connected devices.',
    category: 'IP & Hosting',
    type: 'link',
    externalUrl: 'https://www.shodan.io/',
  },
  {
    id: 'censys',
    name: 'Censys',
    description: 'Internet-wide scanning and certificate search.',
    category: 'IP & Hosting',
    type: 'link',
    externalUrl: 'https://search.censys.io/',
  },

  // Identity & Username
  {
    id: 'phone',
    name: 'Phone Analyzer',
    description: 'Validate and analyze phone numbers offline (country, format, type).',
    category: 'Identity & Username',
    type: 'client',
    path: '/tools/phone',
  },
  {
    id: 'username-links',
    name: 'Username Links',
    description: 'Generate direct profile links across 30+ platforms.',
    category: 'Identity & Username',
    type: 'client',
    path: '/tools/username-links',
  },
  {
    id: 'password-check',
    name: 'Password Breach Check',
    description: 'Check if a password has appeared in breaches (k-anonymity, safe).',
    category: 'Identity & Username',
    type: 'client',
    path: '/tools/password-check',
  },
  {
    id: 'hibp',
    name: 'Have I Been Pwned',
    description: 'Check if an email has been involved in known data breaches.',
    category: 'Identity & Username',
    type: 'link',
    externalUrl: 'https://haveibeenpwned.com/',
  },

  // Threat Intel
  {
    id: 'virustotal',
    name: 'VirusTotal',
    description: 'Analyze suspicious files, URLs, domains and IPs.',
    category: 'Threat Intel',
    type: 'link',
    externalUrl: 'https://www.virustotal.com/',
  },
  {
    id: 'urlscan',
    name: 'URLScan',
    description: 'Scan and analyze websites for malicious behavior.',
    category: 'Threat Intel',
    type: 'link',
    externalUrl: 'https://urlscan.io/',
  },
  {
    id: 'intelx',
    name: 'Intelligence X',
    description: 'Search engine for OSINT and dark web data.',
    category: 'Threat Intel',
    type: 'link',
    externalUrl: 'https://intelx.io/',
  },

  // Utilities
  {
    id: 'timestamp',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates.',
    category: 'Utilities',
    type: 'client',
    path: '/tools/timestamp',
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Validate, pretty-print and minify JSON.',
    category: 'Utilities',
    type: 'client',
    path: '/tools/json',
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'Generate version 4 UUIDs locally.',
    category: 'Utilities',
    type: 'client',
    path: '/tools/uuid',
  },
]

export const categories: ToolCategory[] = [
  'Text & Extraction',
  'Image Forensics',
  'Hashes & Encoding',
  'Domain & Network',
  'IP & Hosting',
  'Identity & Username',
  'Threat Intel',
  'Utilities',
]
