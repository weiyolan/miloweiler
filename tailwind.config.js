const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-worksans)', ...fontFamily.sans],
        quick: ['var(--font-quicksand)', ...fontFamily.sans],
      },
      letterSpacing: {
        max: '.25em',
      },
      screens: {
        'xs': '480px',
        'mobl': '420px',
        'mobm': '350px',
      },
      colors: {
        'primary': '#FFFAEA',
        'accent': '#4100A4',
        'white': '#fff',
        'green': '#00CC99',
        'blue': '#6600FF',
        // 'pink': '#ff49db',
        // 'orange': '#ff7849',
        // 'green': '#13ce66',
        // 'gray-dark': '#273444',
        // 'gray': '#8492a6',
        // 'gray-light': '#d3dce6',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        outlinePulse: {
          '50%': { 'outline-color': 'rgba(255,255,255,0.05)' },
        },
        borderPulse: {
          '50%': { 'border-color': 'rgba(255,255,255,0.05)' },
        },
      },
    },
  
  animation: {
    wiggle: 'wiggle 1s ease infinite',
    outlinePulse: 'outlinePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    borderPulse: 'borderPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  variants: {
    animation: ["motion-safe"]
  },

},
  plugins: [],
}