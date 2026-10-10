<div align="center">

# PEPPER

**Privacy-first, client-side OSINT toolkit**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github&logoColor=white)](https://pages.github.com)

[Live Demo](https://drphrma.github.io/PEPPER/) · [Report Bug](https://github.com/DrPhrma/PEPPER/issues) · [Request Feature](https://github.com/DrPhrma/PEPPER/issues)

</div>

---

## About

**PEPPER** is a clean, browser-based Open Source Intelligence (OSINT) toolkit.  
All core tools run **entirely in your browser** — no accounts, no tracking, no API keys required.

Built for researchers, analysts, students, and anyone who needs fast, private utilities without spinning up a backend.

### Why PEPPER?

| Feature | Details |
|---------|--------|
| **Privacy-first** | Data never leaves your machine for client-side tools |
| **Zero API keys** | Designed for static hosting (GitHub Pages friendly) |
| **No accounts** | Open the site and use it immediately |
| **Dark UI** | Minimal, engineering-focused interface |
| **Modular tools** | Each tool has its own dedicated page |

---

## Features

### Client-side tools (run in browser)
- **Entity / IOC Extractor** — Extract IPs, domains, emails, hashes, crypto addresses from text
- **Image EXIF Viewer** — Read basic image metadata
- **Hash Generator** — SHA-1, SHA-256, SHA-512
- **Encoder / Decoder** — Base64, URL, Hex, HTML
- **JWT Decoder** — Inspect header, payload, and signature
- **Timestamp Converter** — Unix ↔ human-readable dates
- **Username Links** — Generate profile links across 30+ platforms
- **Google Dork Generator** — Ready-to-use search operators

### Link-out tools
Quick access to free external services: VirusTotal, Shodan, Censys, Have I Been Pwned, URLScan, Intelligence X, Wayback Machine, and more.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS**
- **React Router** (HashRouter for GitHub Pages)
- **Lucide React** icons

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/DrPhrma/PEPPER.git
cd PEPPER

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is written to the `dist/` folder.

### Preview production build

```bash
npm run preview
```

---

## Deploy (GitHub Pages)

This project includes a GitHub Actions workflow that builds and deploys automatically on every push to `main`.

1. Push your code to the `main` branch
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**
4. Wait for the workflow to finish

Your site will be available at:

```
https://drphrma.github.io/PEPPER/
```

---

## Project Structure

```
PEPPER/
├── .github/workflows/     # Deploy workflow
├── public/                # Static assets
├── src/
│   ├── components/        # Shared UI (Layout)
│   ├── data/              # Tools catalog
│   ├── pages/             # Home, Tools, individual tool pages
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Usage notes

- **Client-side tools** process data only in your browser.
- **Link-out tools** open the official free website in a new tab.
- This project is intended for **research, education, and authorized security work** only.
- Always respect applicable laws, platform terms of service, and privacy norms.

---

## Roadmap

- [ ] Full EXIF support (`exifr`)
- [ ] DNS lookup via DNS-over-HTTPS
- [ ] Certificate Transparency (crt.sh) subdomain finder
- [ ] RDAP / WHOIS lookup
- [ ] Password breach check (HIBP k-anonymity)
- [ ] Phone number analyzer
- [ ] More identity & network utilities

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## Disclaimer

PEPPER is provided for educational and legitimate research purposes only.  
The authors are not responsible for misuse. Always obtain proper authorization before investigating systems or individuals that are not your own.

---

<div align="center">

**[Live Demo](https://drphrma.github.io/PEPPER/)** · Made with care for the OSINT community

</div>
