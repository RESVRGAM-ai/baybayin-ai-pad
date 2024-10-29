/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'baybayin': ['BaybayinSimple', 'sans-serif'],
        'doctrina': ['DoctrinaChristiana', 'serif'],
        'tawbid': ['TAWBIDPinta', 'sans-serif'],
      }
    },
  },
  plugins: [],
}