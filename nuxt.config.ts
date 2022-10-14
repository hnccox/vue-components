// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	typescript: {
		strict: true
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt'
	],
	css: ["@/assets/css/styles.css"],
	tailwindcss: {
		// Options
	  },
	storybook: {
		// Options
	}
})
