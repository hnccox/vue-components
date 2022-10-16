<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<button type="button" :class="[buttonSize, flexDirection()]"
		:disabled="disabled"
	>
		<component v-if="icon" :is="iconComponent()" :class="iconStyle" aria-hidden="true"></component>
		{{ title }}
	</button>
</template>

<script setup lang="ts">
import { 
	SwatchIcon, 
	CalendarDaysIcon, 
	CalendarIcon,
	ClockIcon,
	EnvelopeIcon,
	DocumentIcon,
	PhotoIcon,
	CalculatorIcon,
	KeyIcon,
	LockClosedIcon, LockOpenIcon,
	MagnifyingGlassIcon,
	PhoneIcon,
	LinkIcon,
	ExclamationCircleIcon,
	CheckIcon
} from '@heroicons/vue/24/solid'
import { FunctionalComponent } from 'vue';

export interface Props {
	onPress?: () => {},
	type?: 'button' | 'submit' | 'reset',
	disabled?: boolean,
	label?: string,
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
	title?: string,
	buttonType?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'dark' | 'info' | 'link'
	icon?: string,
	iconColor?: string,
	iconPosition?: 'top' | 'right' | 'bottom' | 'left',
}

type OptionLabels = {
	checked: string,
	unchecked: string
	position?: 'inner' | 'outer'
}

const props = defineProps({
	type: {
		type: String,
		default: 'button'
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		required: false,
		default: 'md',
	},
	title: {
		type: String,
		required: false,
	},
	icon: {
		type: String,
		default: false,
	},
	iconPosition: {
		type: String,
		default: "left"
	}
})

const flexDirection = () => {
  switch (props.iconPosition) {
    case 'top':
      return 'flex-col'
    case 'right': 
      return 'flex-row-reverse'
    case 'bottom':
      return 'flex-col-reverse'
    case 'left': 
      return 'flex-row'
		default: return 'flex-row'
  }
}

const iconComponent = () => {
	switch(props.icon) {
		case "phone":
			return PhoneIcon
		case "photo":
			return PhotoIcon
		case "calendar":
			return CalendarIcon
		default: return;
	}
}

const textComponent = () => {
	return `<span>${props.title}</span>`
}

let buttonSize: string;
let iconStyle: string;
switch (props.size) {
	case "xs":
		buttonSize = 'px-3 py-2 text-sm leading-4';
		break;
	case "sm":
		buttonSize = 'px-4 py-2 text-sm';
		iconStyle = '-ml-0.5 mr-2 h-4 w-4';
		if(props.iconPosition === 'top') iconStyle = '-mt-0.5 mb-2 h-4 w-4'
		if(props.iconPosition === 'right') iconStyle = '-mr-0.5 ml-2 h-4 w-4'
		if(props.iconPosition === 'bottom') iconStyle = '-mb-0.5 mt-2 h-4 w-4'
		if(props.iconPosition === 'left') iconStyle = '-ml-0.5 mr-2 h-4 w-4'
		break;
	case "md":
		buttonSize = 'px-4 py-2 text-base';
		iconStyle = '-ml-1 mr-2 h-5 w-5';
		if(props.iconPosition === 'top') iconStyle = '-mt-1 mb-2 h-5 w-5'
		if(props.iconPosition === 'right') iconStyle = '-mr-1 ml-2 h-5 w-5'
		if(props.iconPosition === 'bottom') iconStyle = '-mb-1 mt-2 h-5 w-5'
		if(props.iconPosition === 'left') iconStyle = '-ml-1 mr-2 h-5 w-5'
		break;
	case "lg":
		buttonSize = 'px-6 py-3 text-base';
		iconStyle = '-ml-1 mr-3 h-5 w-5';
		if(props.iconPosition === 'top') iconStyle = '-mt-1 mb-3 h-5 w-5'
		if(props.iconPosition === 'right') iconStyle = '-mr-1 ml-3 h-5 w-5'
		if(props.iconPosition === 'bottom') iconStyle = '-mb-1 mt-3 h-5 w-5'
		if(props.iconPosition === 'left') iconStyle = '-ml-1 mr-3 h-5 w-5'
		break;
	case "xl":
		buttonSize = 'px-6 py-3 text-base';
		iconStyle = '-ml-1 mr-2 h-5 w-5';
		if(props.iconPosition === 'top') iconStyle = '-mt-1 mb-2 h-5 w-5'
		if(props.iconPosition === 'right') iconStyle = '-mr-1 ml-2 h-5 w-5'
		if(props.iconPosition === 'bottom') iconStyle = '-mb-1 mt-2 h-5 w-5'
		if(props.iconPosition === 'left') iconStyle = '-ml-1 mr-2 h-5 w-5'
		break;
	default:
		buttonSize = 'px-4 py-2 text-base';
		iconStyle = '-ml-1 mr-2 h-5 w-5';
}

</script>

<style scoped lang="css">
@import url('/assets/styles/buttons.css');
</style>