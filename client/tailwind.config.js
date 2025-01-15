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
        md845: '845px',
        xm: '480px',
        customlg: '1147px',
      },
    },
  },
  plugins: [],
};
