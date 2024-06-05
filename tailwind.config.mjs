/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors:{
				"bg": "#1A1A1A",
				"bg-200": "#292929",
				"bg-300": "#404040",
				"primary": "#FF4500",
				"primary-200": "#ff7b3a",
				"primary-300": "#ffe49a",
				"accent": "#00FF00",
				"accent-200": "#009700",
				"txt-200": "#e0e0e0",
				"xbox": "#107C10",
				"playstation": "#0073CC"
			},
			inset: {
				'1/2-70px': 'calc(50% - 30px)',
			},
			screens: {
				'max-md': {'max': '991px'},
			},
			boxShadow: {
				'shadow': '0 0 22px #3336',
			}
		},
		variants: {
			extend: {
				height: ['group-hover', 'active'],
			},
		}
	},
	plugins: [],
}