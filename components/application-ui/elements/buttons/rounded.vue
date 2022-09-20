<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<button type="button" :class="buttonStyle"
		class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
		buttonStyle = 'px-3 py-1.5 text-xs'
		break;
	case "sm":
		buttonStyle = 'px-3.5 py-2 text-sm leading-4'
		break;
	case "md":
		buttonStyle = 'px-4 py-2 text-sm'
		break;
	case "lg":
		buttonStyle = 'px-5 py-2 text-base'
		break;
	case "xl":
		buttonStyle = 'px-6 py-3 text-base'
		break;
	default:
		buttonStyle = 'px-4 py-2 text-sm'
}

</script>