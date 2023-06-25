/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./api/templates/**/*.html", "./api/static/src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DIN", "sans-serif"],
      },
    },
  },
  plugins: [],
};
