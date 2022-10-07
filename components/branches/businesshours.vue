<template>
	<Input :id="'monday'" :type="'date'"></Input>
	<Toggle 
		:value="true" 
		:label="{ title: 'Available to hire', description: 'Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.', position: 'left' }"
		
	></Toggle>
</template>

<script setup>
import { ref } from 'vue'
import Toggle from '../application-ui/forms/toggles/toggle.vue'
import Input from '../application-ui/forms/input-groups/input.vue';

let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// value: true,
// 	disabled: false,
// 	label: {
// 		title: 'Available to hire',
// 		description: 'Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.',
// 		position: 'left'
// 	},
// 	optionLabels: {
// 		checked: 'Enabled',
// 		unchecked: 'Disabled',
// 	},
// 	icons: {
// 		checked: 'check',
// 		unchecked: 'x-mark'
// 	},
</script>