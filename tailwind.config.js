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
        'main':'#FF5F5D',
        'Cblue' :'#024059',
        'Cblue2':'#026873',
        'custGreen':'#0ab39c',
        'Cred':'#721E23'
      },
      fontWeight: {
        black: '900',
        extrablack: '1000',
      },
      fontFamily:{
        'playfair':['Playfair Display', 'sans-serif'],
        'righteous':['Righteous', 'cursive'],
        'poppins':['Poppins', 'sans-serif'],
        'mogra':['Mogra', 'cursive'],
        'alfa':['Alfa Slab One', 'cursive']
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}