/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '462px',
        'mdd': '862px',
        'xll': '1362px',
        'xlg': '1162px',
        'xlb': '1280px',
        'ssm': '310px',
      },
    },
  },
  plugins: [],
}