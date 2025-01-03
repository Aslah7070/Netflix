/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      height: {
        'screen-75': '75vh', // Custom height for 75% of the viewport
      },
      screens: {
        md845: '845px', // Custom breakpoint
      },
    },
  },
  plugins: [],
};
