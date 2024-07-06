/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary:'#024B43',
        secondary:'#FCA404',
        dark:'#022F2A',
        brand:{
          1:`#004c45`,
          2:'#dfe9c0',
          3:'#e7f5f9',
          4:'#003d3a'
        },
        light:'#f7ffd5',
        borderlight:'#d9e3b9',
        kuning:{
          1:'#fcf300',
          2:'#fdf97d',
          3:'#FEFCBB',
          4:'##f2ff86',
        }

      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

