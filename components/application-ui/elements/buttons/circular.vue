<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<button type="button" :class="buttonSize"
		class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
		<PlusIconMini v-if="['xs','sm','md'].includes(size)" :class="iconSize" class="" aria-hidden="true" />
		<PlusIconOutline v-if="['lg', 'xl'].includes(size)" :class="iconSize" class="" aria-hidden="true" />
	</button>
</template>

<script setup>
import { PlusIcon as PlusIconMini } from '@heroicons/vue/solid'
import { PlusIcon as PlusIconOutline } from '@heroicons/vue/outline'

const props = defineProps({
	size: {
		type: String
	}
})

let buttonSize, iconSize;
switch (props.size) {
	case "xs":
		buttonSize = 'p-1'
		iconSize = 'h-5 w-5'
		break;
	case "sm":
		buttonSize = 'p-1.5'
		iconSize = 'h-5 w-5'
		break;
	case "md":
		buttonSize = 'p-2'
		iconSize = 'h-5 w-5'
		break;
	case "lg":
		buttonSize = 'p-2'
		iconSize = 'h-6 w-6'
		break;
	case "xl":
		buttonSize = 'p-3'
		iconSize = 'h-6 w-6'
		break;
	default:
		buttonSize = 'p-2'
		iconSize = 'h-5 w-5'
}

</script>