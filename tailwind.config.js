const defaultColors = require('tailwindcss/colors')

module.exports = {
  content: ['./**/*.html', './**/*.php'],
  theme: {
    extend: {
      colors: defaultColors,
    },
  },
  plugins: [],
}