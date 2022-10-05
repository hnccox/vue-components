import { defineStore } from 'pinia'

export const storeStore = defineStore('store', {
	state: () => ({
		branches: []
	})
})