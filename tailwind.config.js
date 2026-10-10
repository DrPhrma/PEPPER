/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#0f0f11",
        "surface-2": "#151517",
        "surface-hover": "#1a1a1d",
        border: "#1f1f23",
        "border-hover": "#2a2a2e",
        muted: "#71717a",
        "muted-2": "#a1a1aa",
        accent: "#fafafa",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
}
