require( 'tailwindcss/defaultConfig' );
const plugin = require( 'tailwindcss/plugin' );

module.exports = {
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      scale: [ 'active', 'hover' ],
      translate: [ 'active', 'hover' ]
    },
  },
  plugins: [
    plugin( function ( { addBase, addUtilities, theme } ) {
      addUtilities( {
        '.primary-bg-color': {
          'background-color': theme( 'colors.black' ),
        },
      } ),
        addBase( {
          h1: { fontSize: theme( 'fontSize.5xl' ) },
          h2: { fontSize: theme( 'fontSize.3xl' ) },
          h3: { fontSize: theme( 'fontSize.2xl' ) },
          p: { fontSize: theme( 'fontSize.xl' ) },
          span: { fontSize: theme( 'fontSize.sm' ) },
        } );
    } ),
  ],
};
