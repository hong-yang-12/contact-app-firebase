/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
      secondary: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        'background' : '#f0f9ff', //[sky-50]
        'headline' : '#082f49', //[sky-950]
        'para' : '#075985', //[sky-800]
        'button' : '#0ea5e9', //[sky-500]
        'button-text' : '#e0f2fe', //[sky-200]
        'placeholder' : '#38bdf8', //[sky-400] placeholder,link
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./src/App.css -o ./dist/output.css --watch
