<template>
	<canvas ref="chartRef"></canvas>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Dataset {
	label: String,
	data: Array<Object>,
	borderColor: String,
	fill: Boolean,
	cubicInterpolationMode?: String,
	tension: Number
}

const props = defineProps({
	type: {
		required: true,
		type: String,
		default: 'bar'
	},
	labels: {
		required: false,
		type: Array
	},
	datasets: {
		required: true,
		type: Array
	},
	options: {
		required: false,
		type: Object
	}
})

const chartRef = ref({}) as Ref<HTMLCanvasElement>

const type = props.type as any
const data = {
	labels: props.labels,
	datasets: props.datasets
}
const options = props.options

onMounted(() => {

	const ctx = chartRef.value.getContext('2d');
	const chart = new Chart(ctx, {
		type: type,
		data: data,
		options: options
	});


	onBeforeUnmount(() => {
		chart.destroy()
	})

})
</script>