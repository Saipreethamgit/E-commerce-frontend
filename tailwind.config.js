/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
  colors: {
    primary: {
      DEFAULT: "#2563eb",   // Blue
      dark: "#1e40af",
      light: "#3b82f6"
    },
    accent: "#fbbf24",       // Amber (bright yellow)
    background: {
      light: "#f9fafb",
      dark: "#1f2937"
    }
  },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"]
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(0,0,0,0.05)",
        card: "0 4px 6px rgba(0,0,0,0.1)"
      }
    },
  },
  plugins: [],
}
