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
      colors: {
        charcoal: '#292A2D',
        parchment: '#DAD5CB',
        whisper: '#EEEFF0',
        eggshell: '#F5F4F0',
        ivory: '#FBFBF9',
        seafoam: '#A9D8C8',
      },
    },
  },
  plugins: [],
};
