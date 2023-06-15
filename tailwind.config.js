const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ['var(--font-poppins)', ...fontFamily.sans],
        lora: ['var(--font-lora)', ...fontFamily.serif],
        // work: ['var(--font-workSans)', ...fontFamily.sans],
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
        'primary': '#FFF5EA',
        'darkPrimary': '#000',
        'darkGrey': '#303030',
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
      backgroundImage: {
        'blackWhite': "linear-gradient(to right, black 50%, #FFF5EA 50%)",
      },
      boxShadow: {
        'top-xl': '0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)',
        'top-2xl': '0 -25px 50px -12px rgb(0 0 0 / 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-3xl': 'inset 0 0px 50px 10px rgba(0, 0, 0, 0.3)',
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