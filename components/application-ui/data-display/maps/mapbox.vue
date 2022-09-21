<template>
	<div id="map" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';

var colorScheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	colorScheme = 'dark';
} else {
	colorScheme = 'light';
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVnby1mb29kdGlja2V0IiwiYSI6ImNremk2cWU1eDIzZnAyc282c2lxcmRsNXYifQ._LbC1YoHTlQAwLT5wQARWg';

onMounted(() => {

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    colorScheme = event.matches ? "dark" : "light";
		map.setStyle('mapbox://styles/mapbox/' + colorScheme + '-v10');
	})

	const map = new mapboxgl.Map({
		container: 'map', // container ID
		// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
		style: `mapbox://styles/mapbox/${colorScheme}-v10`, // style URL
		projection: {
			name: 'globe'
		},
		center: [0, 0], // starting position [lng, lat]
		// maxBounds: [[-180, -90], [180, 90]],
		zoom: 1, // starting zoom,
		// scrollZoom: false,
		// boxZoom: false,
		// doubleClickZoom: false,
		// renderWorldCopies: false,
		// attributionControl: false,
	});

	map.on('load', function () {
		// map.addSource('mapbox-dem', {
		// 	"type": "raster-dem",
		// 	"url": "mapbox://mapbox.mapbox-terrain-dem-v1",
		// });
		// map.setTerrain({ "source": "mapbox-dem" });

		map.addSource('world', {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'geometry': {
					'type': 'Polygon',
					// These coordinates outline Maine.
					'coordinates': [
						[
							[-67.13734, 45.13745],
							[-66.96466, 44.8097],
							[-68.03252, 44.3252],
							[-69.06, 43.98],
							[-70.11617, 43.68405],
							[-70.64573, 43.09008],
							[-70.75102, 43.08003],
							[-70.79761, 43.21973],
							[-70.98176, 43.36789],
							[-70.94416, 43.46633],
							[-71.08482, 45.30524],
							[-70.66002, 45.46022],
							[-70.30495, 45.91479],
							[-70.00014, 46.69317],
							[-69.23708, 47.44777],
							[-68.90478, 47.18479],
							[-68.2343, 47.35462],
							[-67.79035, 47.06624],
							[-67.79141, 45.70258],
							[-67.13734, 45.13745]
						]
					]
				}
			}
		});

		// Add a new layer to visualize the polygon.
		map.addLayer({
			'id': 'world',
			'type': 'fill',
			'source': 'world', // reference the data source
			'layout': {},
			'paint': {
				'fill-color': '#0080ff', // blue color fill
				'fill-opacity': 0.5
			}
		});

		// // Add a black outline around the polygon.
		// map.addLayer({
		// 	'id': 'outline',
		// 	'type': 'line',
		// 	'source': 'maine',
		// 	'layout': {},
		// 	'paint': {
		// 		'line-color': '#000',
		// 		'line-width': 3
		// 	}
		// });
	});



})
</script>