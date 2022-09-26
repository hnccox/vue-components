<template>
	<canvas ref="chartRef"></canvas>
</template>

<script setup>
import { ref, Ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js';

import * as ChartGeo from 'chartjs-chart-geo'
import { ChoroplethController, ProjectionScale, ColorScale, GeoFeature } from 'chartjs-chart-geo'

Chart.register(...registerables);
Chart.register(ChoroplethController, ProjectionScale, ColorScale, GeoFeature)

const chartRef = ref(null)

onMounted(async () => {

	await fetch('https://unpkg.com/world-atlas/countries-50m.json').then((r) => r.json()).then((data) => {
		const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;

		console.log(countries)
		console.log(countries.map((d) => d.properties.name))
		console.log(countries.map((d) => ({ feature: d, value: Math.random() })))
		const chart = new Chart(chartRef.value.getContext("2d"), {
			type: 'choropleth',
			data: {
				labels: countries.map((d) => d.properties.name),
				datasets: [{
					label: 'Countries',
					data: countries.map((d) => ({ feature: d, value: Math.random() })),
				}]
			},
			options: {
				showOutline: true,
				showGraticule: true,
				plugins: {
					legend: {
						display: false
					},
				},
				center: [90, 0],
				scales: {
					xy: {
						projection: 'orthographic'
					}
				}
			}
		});
	});
});
</script>