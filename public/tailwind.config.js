/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#2b3945",
        veryDarkBlue: "#202c37",
        veryDarkBlue2: "#111517",
        darkGray: "#858585",
        veryLightGray: "#fafafa",
        white: "#ffffff",
      },
      fontFamily: {
        pops: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
