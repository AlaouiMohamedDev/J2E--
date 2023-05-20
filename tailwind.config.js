/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
  plugins: [],
}