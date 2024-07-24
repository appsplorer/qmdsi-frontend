/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Saira"', 'serif'] ,
        'montserrat': ['"Montserrat"', 'sans-serif'] // Ensure fonts with spaces have " " surrounding it.
      },
      colors:{
        background : '#1E1E20',
        accent : '#171717',
        primary : '#d3bb87',
        secondary : '#ABABAB'
      }
    },
  },
  plugins: [],
}