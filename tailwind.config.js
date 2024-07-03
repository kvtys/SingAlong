/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {      
      colors: {
      'regal-blue': '#243c5a',
      },
      fontFamily: {
        Inter : ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}