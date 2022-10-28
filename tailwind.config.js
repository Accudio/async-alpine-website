module.exports = {
  content: [
		'src/**/*.njk',
		'src/**/*.js'
	],

  theme: {

    // ----- VIEWPORT ----- //
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',

			// max-width
			xsd: { max: '399px' },
			smd: { max: '639px' },
			mdd: { max: '767px' },
			lgd: { max: '1023px' },
			xld: { max: '1279px' }
    },

    // ----- COLORS, SHADOW & OPACITY ----- //
    colors: {
      current: "currentColor",
      transparent: "transparent",
      inherit: 'inherit',

			// monotone
			black: '#000',
			white: '#fff',

			dark: '#2e2c40',
			light: '#f4e5e4'
    },

    // ----- FONTS ----- //
    fontFamily: {
      main: ['work-sans', 'serif'],
    },

    letterSpacing: {
      normal: '0'
    },

		borderRadius: {
			full: '100vw',
			DEFAULT: '16px'
		},

    extend: {
			width: {
				fit: 'fit-content'
			}
    }
  },

  plugins: [
    require('sailwind'),
	],

  corePlugins: {
    container: false,
    preflight: false
  },
}
