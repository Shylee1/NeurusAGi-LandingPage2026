import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#030508",
        teal: {
          neural: "#0ccfb0",
          deep: "#0a9e88",
          dim: "#065e52",
          glow: "#1affd8",
        },
        gold: {
          primary: "#d4a853",
          bright: "#f0c040",
          dim: "#8a6a28",
          spark: "#ffe082",
        },
        obsidian: "#0a0d12",
        "surface-1": "#0e1118",
        "surface-2": "#141820",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "flicker": "flicker 3s linear infinite",
        "scan": "scan 8s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        flicker: {
          "0%, 90%, 100%": { opacity: "1" },
          "92%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.2" },
          "98%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px #0ccfb055, 0 0 60px #0ccfb022" },
          "50%": { boxShadow: "0 0 40px #0ccfb099, 0 0 120px #0ccfb044" },
        },
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
