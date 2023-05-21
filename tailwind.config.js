/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
        '90':'90'
      },
      colors:{
        'main':'#026873',
        'Cblue' :'#024059',
        'Cblue2':'#026873',
        'custGreen':'#0ab39c'
      },
      fontFamily:{
        'playfair':['Playfair Display', 'sans-serif'],
        'righteous':['Righteous', 'cursive'],
        'poppins':['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}