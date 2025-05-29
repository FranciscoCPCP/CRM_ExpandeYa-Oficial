/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#F2541B',
          blue: '#2E338C',
          'blue-light': '#3D42A9',
        }
      },
    },
  },
  plugins: [],
};