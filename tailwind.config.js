module.exports = {
	content: ['./public/**/*.html', './src/**/*.{ts,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	important: true,
	theme: {
		extend: {
			backgroundSize: {
				'size-200%': '200%',
				'size-400%': '400%'
			},
			colors: {
				'pinkity-drinkity': '#FC466B',
				bloo: {
					light: '#3F5EFB',
					DEFAULT: '#397AFF',
					dark: '#0575E6'
				},
				dew: '#00F260',
				slate: {
					lighter: '#27292E',
					light: '#1C1E1F',
					DEFAULT: '#181A1B',
					dark: '#161819'
				},
				eggshell: {
					lighter: '#F5F5F5',
					light: '#ECECEC',
					DEFAULT: '#D8D8D8',
					dark: '#C7C7C7'
				}
			},
			screens: {
				'3xl': '1600px',
				'4xl': '1856px',
				'5xl': '2112px'
			}
		}
	},
	plugins: []
};
