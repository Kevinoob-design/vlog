require('tailwindcss/defaultConfig');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    plugin(function ({ addBase, addUtilities }) {
      addUtilities({
        '.primary-bg-color': {
          'background-color': 'black',
        },
      }),
        addBase({
          h1: { 'font-size': '3rem', 'line-height': '1' },
          h2: { 'font-size': '1.875rem', 'line-height': '2.25rem' },
          h3: { 'font-size': '1.5rem', 'line-height': '2rem' },
          p: { 'font-size': '1.25rem', 'line-height': '1.75rem' },
        });
    }),
  ],
};
