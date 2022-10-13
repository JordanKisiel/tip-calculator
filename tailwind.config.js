/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./*.html",
    "./js/*.js"
  ],
  theme: {
    screens: {
      'lg': '1200px'
    },
    extend: {
      colors: {
        strongCyan: 'hsl(172, 67%, 45%)',
        veryDarkCyan: 'hsl(183, 100%, 15%)',
        darkGrayCyan: 'hsl(186, 14%, 43%)',
        grayCyan: 'hsl(184, 14%, 56%)',
        lightGrayCyan: 'hsl(185, 41%, 84%)',
        veryLightGrayCyan: 'hsl(189, 41%, 97%)',
        white: 'hsl(0, 0%, 100%)'
      },
      fontFamily: {
        'mono': ['Space Mono', ...defaultTheme.fontFamily.mono]
      },
      screens:{
        'no-hover': {'raw': '(hover: none)'}
      }
    },
  },
  plugins: [],
}
