/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.js",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        "brand-red": "#D2232A",
        "brand-black": "#111111"
      }
    }
  },
  plugins: []
};