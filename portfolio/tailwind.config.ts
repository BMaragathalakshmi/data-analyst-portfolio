import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1020",
        foreground: "#F8FAFC",
        midnight: "#0B1020",
        "navy-deep": "#172554",
        "navy-card": "rgba(23, 37, 84, 0.45)",
        "navy-border": "rgba(139, 92, 246, 0.2)",
        violet: {
          DEFAULT: "#8B5CF6",
          glow: "#A78BFA",
          dark: "#6D28D9",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          glow: "#67E8F9",
          dark: "#0891B2",
        },
        muted: "#94A3B8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        circularDark:
          "repeating-radial-gradient(rgba(255, 255, 255, 0.15) 2px, #09090b 5px, #09090b 100px)",
        circularLight:
          "repeating-radial-gradient(rgba(0, 0, 0, 0.12) 2px, #f8fafc 5px, #f8fafc 100px)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        "cyan-glow": "0 0 25px -5px rgba(34, 211, 238, 0.3)",
        "inner-light": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
