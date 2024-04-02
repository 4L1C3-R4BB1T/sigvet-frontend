/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { min: '10px', max: '30rem' },
        'tall': { raw: '(min-height: 800px)' },
      },
      colors: {
        brand: {
          primary: '#6CD1C5',
          secondary: '#f8f8f8',
          tertiary: '#D6D6D6',
          quaternary: '#FFF',
          quinary: '#525558',
          senary: '#A02C2C',
          septnary: '#00FCC3',
        },
        account: {
          primary: '#FFF',
          secondary: '#5869A6',
          tertiary: '#0790A4',
          quaternary: '#6AD9CC',
          quinary: "#7289DA"
        },
      }
    },
  },
  plugins: [],
}
