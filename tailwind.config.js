/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      fontFamily: {
        ravi: ['"Ravi Prakash"', "serif" ,"cursive"], // Lägg till custom font
      },
    },
  },
  plugins: [],
};