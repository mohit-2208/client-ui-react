/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      green: {
        DEFAULT: '#05AF6E',
      },
      blue: {
        DEFAULT: '#676BE9'
      },
      red: {
        DEFAULT: '#ff0000'
      }
    },
    screens: {
      'xs': '320px', 
      // => @media (min-width: 320px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

