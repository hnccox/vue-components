<template>
	<div ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { GoogleCharts } from 'google-charts';

const props = defineProps({
	settings: {
		required: false,
		type: Object
	},
	type: {
		required: false,
		type: String
	},
	data: {
		required: true,
		type: Array
	},
	options: {
		required: false,
		type: Object
	}
})

const chartRef = ref(null)

const settings = {};
if (props.settings?.packages) {
	settings.packages = props.settings.packages
}
if (props.settings?.mapsApiKey) {
	settings.mapsApiKey = props.settings.mapsApiKey
}

let chart;

const drawChart = () => {

	let data = GoogleCharts.api.visualization.arrayToDataTable(props.data);
	let options = props.options;
	switch (props.type) {
		case 'GeoChart':
			chart = new GoogleCharts.api.visualization.GeoChart(chartRef.value);
			break;
		case 'PieChart':
			chart = new GoogleCharts.api.visualization.PieChart(chartRef.value);
			break;
		default:
	}
	chart.draw(data, options);

}

onMounted(() => {

	GoogleCharts.load(drawChart, settings);

	onBeforeUnmount(() => {
		chart.clearChart()
	})

})

</script>