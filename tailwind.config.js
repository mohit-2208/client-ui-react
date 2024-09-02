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
    extend: {},
  },
  plugins: [],
}

