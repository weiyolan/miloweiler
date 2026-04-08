const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  darkMode: 'class',
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans-family)", ...fontFamily.sans],
        serif: ["var(--font-serif-family)", ...fontFamily.serif],
        mono: ["var(--font-mono-family)", ...fontFamily.mono],
      },
      letterSpacing: {
        max: ".25em",
      },
      screens: {
        xs: "480px",
        mobl: "420px",
        mobm: "350px",
      },
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        white: "#fff",
      },
      backgroundImage: {
        blackWhite: "linear-gradient(to right, rgb(var(--color-background)) 50%, rgb(var(--color-foreground)) 50%)",
      },
      boxShadow: {
        "top-xl": "0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)",
        "top-2xl": "0 -25px 50px -12px rgb(0 0 0 / 0.25)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        "inner-3xl": "inset 0 0px 50px 10px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        "loading-bar": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        outlinePulse: {
          "50%": { "outline-color": "rgba(255,255,255,0.05)" },
        },
        borderPulse: {
          "50%": { "border-color": "rgba(255,255,255,0.05)" },
        },
      },
    },
    animation: {
      "loading-bar": "loading-bar 1.2s ease-in-out infinite",
      wiggle: "wiggle 1s ease infinite",
      outlinePulse: "outlinePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      borderPulse: "borderPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    variants: {
      animation: ["motion-safe"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};