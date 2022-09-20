<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div
		class="flex flex-col items-stretch bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 w-full h-full my-5">
		<div v-if="$slots.header && !fullscreen" class="px-4 py-5 sm:px-6 shrink">
			<!-- Content goes here -->
			<!-- We use less vertical padding on card headers on desktop than on body sections -->
			<slot name="header"></slot>
		</div>
		<div class="grow" :class="[(fullscreen) ? 'px-4 py-5 sm:p-6' : '']">
			<!-- Content goes here -->
			<slot name="body"></slot>
		</div>
		<div v-if="$slots.footer && !fullscreen" class="px-4 py-4 sm:px-6 shrink">
			<!-- Content goes here -->
			<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	fullscreen: {
		type: Boolean
	}
})

const fullscreen = ref(props.fullscreen)
</script>