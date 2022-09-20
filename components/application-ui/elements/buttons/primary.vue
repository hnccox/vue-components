<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<button type="button" :class="buttonStyle"
		class="inline-flex items-center border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
		{{ title }}
	</button>
</template>

<script setup>
const props = defineProps({
	size: {
		type: String
	},
	title: {
		type: String
	}
})

let buttonStyle;
switch (props.size) {
	case "xs":
		buttonStyle = 'rounded px-2.5 py-1.5 text-xs'
		break;
	case "sm":
		buttonStyle = 'rounded-md px-3 py-2 text-sm leading-4'
		break;
	case "md":
		buttonStyle = 'rounded-md px-4 py-2 text-sm'
		break;
	case "lg":
		buttonStyle = 'rounded-md px-4 py-2 text-base'
		break;
	case "xl":
		buttonStyle = 'rounded-md px-6 py-3 text-base'
		break;
	default:
		buttonStyle = 'rounded-md px-4 py-2 text-sm'
}

</script>