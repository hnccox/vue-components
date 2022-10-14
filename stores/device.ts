import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {
	state: () => ({
		orientation: 'portrait'
	}),
	actions: {
		setOrientation() {
			(this.orientation === 'portrait') ? this.orientation = 'landscape' : this.orientation = 'portrait';
		}
	},
	getters: {
		getOrientation: (state) => { 
			return state.orientation
		}
	}
})