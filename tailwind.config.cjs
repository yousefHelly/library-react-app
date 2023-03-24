/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "primary": "#4A80F0",
          "secondary": "#1A1A23",
          "base-100": "#FDFDFD",
        },
        dark:{
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "primary": "#4A80F0",
          "secondary": "#1A1A23",
        }
      }
    ],
    
  },
  plugins: [],
  plugins: [require("daisyui")],
}