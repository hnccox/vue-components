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
	// css: ["@/assets/styles/globals.css"],
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css'
	],
	tailwindcss: {
		// Options
	  },
	storybook: {
		// Options
	},
	plugins: [
		// '~/plugins/fontawesome.js'
	],
	// build: {
	// 	transpile: [
	// 		'@fortawesome/fontawesome-svg-core',
	// 		'@fortawesome/free-solid-svg-icons',
	// 		'@fortawesome/free-regular-svg-icons',
	// 		// '@fortawesome/free-light-svg-icons',
	// 		'@fortawesome/free-brands-svg-icons'
	// 	]
	// },
	builModules: [
		'@pinia/nuxt',
		// '@nuxtjs/fontawesome', {
    //   component: 'fa',
    //   suffix: true,
    //   proIcons: { // if you have bought the Pro packages
    //     // list the icons you want to add, not listed icons will be tree-shaked
    //     solid: [
    //       'faHome',
    //       'faHeart'
    //     ],
    //     // include all icons. But dont do this.
    //     regular: true
    //   }
    // }
	]
})
