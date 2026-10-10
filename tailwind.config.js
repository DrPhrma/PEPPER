/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0c0c0c",
        "surface-2": "#111111",
        "surface-hover": "#161616",
        border: "#1a1a1a",
        "border-hover": "#2a2a2a",
        muted: "#666666",
        "muted-2": "#999999",
        accent: "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,120,120,0.15), transparent)',
      },
    },
  },
  plugins: [],
}
