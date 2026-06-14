import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#070B14",
          deep: "#070B14",
        },
        surface: {
          DEFAULT: "#0F1729",
          raised: "#161F33",
        },
        brand: {
          // Primary accent — brand cyan from the logo
          DEFAULT: "#38B6FF",
          bright: "#7DD3FF",
          deep: "#1E88E5",
        },
        accent: {
          // Secondary accent — used sparingly, gradients only
          indigo: "#6366F1",
        },
        ink: {
          DEFAULT: "#E6EDF5",
          muted: "#8B95A7",
        },
        hairline: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Clash Display", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.4rem, 2.2vw, 1.9rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        container: "1200px",
        prose: "72ch",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56,182,255,0.18), 0 12px 40px -12px rgba(56,182,255,0.35)",
        "glow-lg": "0 0 60px -10px rgba(56,182,255,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1E88E5 0%, #38B6FF 50%, #7DD3FF 100%)",
        "brand-radial": "radial-gradient(circle at 50% 0%, rgba(56,182,255,0.18), transparent 60%)",
        "indigo-cyan": "linear-gradient(135deg, #6366F1 0%, #38B6FF 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 36s linear infinite",
        blink: "blink 1.1s step-end infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
