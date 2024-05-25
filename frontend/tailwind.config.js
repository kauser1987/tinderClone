/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"rgba(14, 207, 207, 0.5)",
        primaryLight:"rgba(143, 211, 211, 0.8)"
      },
      fontFamily:{
        concertOne:["Concert One","sans-serif"],
        ropaSans:["Ropa Sans","sans-serif"]
      }
    },
  },
  plugins: [],
}

