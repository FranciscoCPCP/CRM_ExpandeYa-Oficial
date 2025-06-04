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
      keyframes: {
        'login-fadein': {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)' },
          '80%': { opacity: '0.8', transform: 'translateY(-5px) scale(1.01)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'login-fadein': 'login-fadein 0.8s cubic-bezier(0.4,0,0.2,1) both',
      },
    },
  },
  plugins: [],
};