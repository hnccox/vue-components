<template>
	<Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
		:plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
	chartOptions: {
		type: Object,
		default: {
			responsive: true
		}
	},
	chartData: {
		type: Object as any,
		required: true,
	},
	chartId: {
		type: String,
		default: 'bar-chart'
	},
	datasetIdKey: {
		type: String,
		default: 'label'
	},
	width: {
		type: Number,
		default: 400
	},
	height: {
		type: Number,
		default: 400
	},
	cssClasses: {
		default: '',
		type: String
	},
	styles: {
		type: Object,
		default: () => { }
	},
	plugins: {
		type: Array as any,
		default: () => []
	}
});

</script>