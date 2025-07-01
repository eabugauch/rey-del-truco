/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amatic': ['Amatic SC', 'cursive'],
        'architects': ['Architects Daughter', 'cursive'],
        'rock': ['Rock Salt', 'cursive'],
        'kalam': ['Kalam', 'cursive'],
        'bad-script': ['Bad Script', 'cursive'],
      },
      colors: {
        'ink-blue': '#1e3a8a',
        'paper': '#fdfbf7',
      },
    },
  },
  plugins: [],
}

