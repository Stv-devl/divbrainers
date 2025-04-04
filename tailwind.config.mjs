export default {
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        fill: 'fill',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
