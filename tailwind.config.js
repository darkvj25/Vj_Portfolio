/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0b0f19",
        charcoal: "#111827",
        "charcoal-light": "#1e293b",
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2"
        },
        sky: {
          400: "#38bdf8",
          500: "#0ea5e9"
        },
        emerald: {
          400: "#34d399",
          500: "#10b981"
        },
        "accent-cyan": "#06b6d4",
        "accent-blue": "#3b82f6",
        "accent-emerald": "#10b981",
        ivory: "#f8fafc",
        "muted-gray": "#94a3b8",
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.3)',
        'blue-glow': '0 0 25px rgba(59, 130, 246, 0.3)',
        'cinematic': '0 20px 50px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'cyan-gradient': 'linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #3b82f6 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(11,15,25,0.8) 0%, rgba(11,15,25,0.95) 100%)',
      }
    },
  },
  plugins: [],
}
