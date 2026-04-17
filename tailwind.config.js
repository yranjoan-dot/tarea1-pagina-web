/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nba-dark': '#1a1a1a',
        'nba-orange': '#ff6b35',
        'nba-blue': '#004687',
      }
    },
  },
  plugins: [],
}
