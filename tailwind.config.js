module.exports = {
  content: [
		'src/**/*.njk',
		'src/**/*.md',
		'src/**/*.js',
		'utils/**/*.js'
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

			// theme
			dark: '#1A2902',
			green: {
				900: '#344C11',
				600: '#668016',
				300: '#AEC670',
				100: '#d7e2b8'
			}
    },

    // ----- FONTS ----- //
    fontFamily: {
      main: ['work-sans', 'sans-serif'],
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
