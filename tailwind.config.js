/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto",...defaultTheme.fontFamily.sans]
      },
      colors: {
        blue: {
          500: '#24ACE3',
        }
      },
    },
  },
  plugins: [],
}

