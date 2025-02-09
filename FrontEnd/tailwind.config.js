/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        source: ["Source Code Pro", "sans-serif"],
        barlow :["Barlow Condensed","sans-serif"],
        oswald : ["Oswald","sans-serif"],
        kanit : ["Kanit","sans-serif"],
      },
    },
    plugins: [],
  },
};
