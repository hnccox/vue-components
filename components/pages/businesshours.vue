<script setup lang="ts">
import { ref } from 'vue'
import Toggle from '../application-ui/forms/toggles/toggle.vue'
import Input from '../application-ui/forms/input-groups/input.vue';
import Button from '../application-ui/elements/buttons/rounded.vue';

let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const onClick = (event: Event, value: any) => {
	console.log(event);
	console.log(value);
}
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

<template>
	<div class="grid grid-flow-col auto-cols-max gap-x-5">
		<div class="flex items-center">
			<Toggle 
				:value="true"	
				:disabled="false"
				:name="1"
				:data-weekday="1"
				:label="{ title: 'Monday' }"
				:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
				@click="onClick"
			/>
		</div>
		<div class="flex flex-row gap-x-2 items-center">
			<Input :data-weekday="1" type="time" value="" icon validation-icon required disabled />
			<span class="self-center"> - </span>
			<Input :data-weekday="1" type="time" value="" icon validation-icon required disabled />
		</div>
		<div class="flex items-center">
			<Button :data-weekday="1" title="Add +" disabled></Button>
		</div>
	</div>
	<div class="grid grid-cols-2">
		<Toggle 
			:value="true"	
			:disabled="false"
			:name="2"
			:label="{ title: 'Tuesday' }"
			:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
			@click="onClick"
		/>
	</div>
	<div class="grid grid-cols-2">
		<Toggle 
			:value="true"	
			:disabled="false"	
			:name="3"
			:label="{ title: 'Wednesday' }"	
			:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
			@click="onClick"
		/>
	</div>
	<div class="grid grid-cols-2">
		<Toggle 
			:value="true"	
			:disabled="false"	
			:name="4"
			:label="{ title: 'Thursday' }"
			:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
			@click="onClick"
		/>
	</div>
	<div class="grid grid-cols-2">
		<Toggle 
			:value="true"	
			:disabled="false"	
			:name="5"
			:label="{ title: 'Friday' }"
			:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
			@click="onClick"
		/>
	</div>
	<div class="grid grid-cols-2">
		<Toggle 
			:value="true"	
			:disabled="false"
			:name="6"
			:label="{ title: 'Saturday' }"
			:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
			@click="onClick"
		/>
	</div>
	<div class="grid grid-cols-2">
		<Toggle 
			:value="true"	
			:disabled="false"
			:name="0"
			:label="{ title: 'Sunday' }"
			:optionLabels="{ checked: 'Open', unchecked: 'Closed' }"
			@click="onClick"
		/>
	</div>
</template>