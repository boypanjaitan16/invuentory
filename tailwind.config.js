const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          10: '#184E77',
          9: '#1E6091',
          8: '#1A759F',
          7: '#168AAD',
          6: '#34A0A4',
          5: '#52B69A',
          4: '#76C893',
          3: '#99D98C',
          2: '#B5E48C',
          1: '#D9ED92'
        }
      }
    }
  },
  plugins: [addDynamicIconSelectors()]
}
