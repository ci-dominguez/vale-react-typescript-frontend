/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        editorial: ['editorial'],
        'editorial-italic': ['editorial-italic'],
        montreal: ['montreal'],
      },
    },
  },
  plugins: [],
};
