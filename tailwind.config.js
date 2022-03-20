const withAnimations = require('animated-tailwindcss');
module.exports = withAnimations({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        ['site-gray']: {
          800: "#454545",
          400: "#9C9C9C",
          300: "#D2D2D2",
          200: "#E5E5E5",
          100: "#f9f9f9",
        },
        ['site-blue']: {
          800: "#003962",
          500: "#0E6AAD",
          200: "#E6F3FC",
          100: "#F2F9FE",
          ['a200']: "#0E6AAD",
          ['a100']: "#007AD2",
        },
        success: '#23B520',
        danger: '#D21919',
      },
    },
  },

  plugins: [],
    safelist: [
    {
      pattern: /^col-span-/,
    },
  ],
}, { experimental: true },);
