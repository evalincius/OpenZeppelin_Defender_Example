/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {backgroundImage: { 
      'gradient-radial': 'radial-gradient(58.07% 37.9% at 80.56% 49.22%,#3b3178 0,#131119 100%)'
    }},
  },
  plugins: [],
}
