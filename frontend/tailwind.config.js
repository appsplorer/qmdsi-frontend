/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Saira"', "serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      colors: {
        background: "#1E1E20",
        accent: "#171717",
        primary: "#d3bb87",
        secondary: "#ABABAB",
        silver: {
          DEFAULT: "#C0C0C0",
          10: "rgba(192, 192, 192, 0.1)",
        },
        ash: "#2F2F2F",
      },
    },
  },
  plugins: [],
};
