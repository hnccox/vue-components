<template>
	<div ref="map" id="map"></div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import L from 'leaflet';

var colorScheme: string
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	colorScheme = 'dark';
} else {
	colorScheme = 'light';
}

const map = ref({}) as Ref<L.Map>

onMounted(() => {

	var Stadia_AlidadeSmooth: L.TileLayer, Stadia_AlidadeSmoothDark: L.TileLayer;

	Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
		maxZoom: 20,
		attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	})

	Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
		maxZoom: 20,
		attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	})

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		colorScheme = event.matches ? "dark" : "light";
		if (colorScheme == "dark") {
			map.value.removeLayer(Stadia_AlidadeSmooth)
			map.value.addLayer(Stadia_AlidadeSmoothDark)
		} else {
			map.value.removeLayer(Stadia_AlidadeSmoothDark)
			map.value.addLayer(Stadia_AlidadeSmooth)
		}
	})

	map.value = L.map('map').setView([51.505, -0.09], 13);

	if (colorScheme == "dark") {
		map.value.addLayer(Stadia_AlidadeSmoothDark)
	} else {
		map.value.addLayer(Stadia_AlidadeSmooth)
	}
})

</script>

<style scoped>
@import url('https://unpkg.com/leaflet@1.8.0/dist/leaflet.css');

#map {
	height: 600px;
}
</style>