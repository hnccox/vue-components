<template>
  <div id="map">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';


// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import 'ol/ol.css'

var colorScheme;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	colorScheme = 'dark';
} else {
	colorScheme = 'light';
}

onMounted(() => {

	var Stadia_AlidadeSmooth, Stadia_AlidadeSmoothDark;

	Stadia_AlidadeSmoothDark = new TileLayer({
		source: new OSM({
			"url": "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
		})
	});

	Stadia_AlidadeSmooth = new TileLayer({
		source: new OSM({
			"url": "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"
		})
	});

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    colorScheme = event.matches ? "dark" : "light";
		if(colorScheme == "dark"){
			map.removeLayer(Stadia_AlidadeSmooth)
			map.addLayer(Stadia_AlidadeSmoothDark)
		} else {
			map.removeLayer(Stadia_AlidadeSmoothDark)
			map.addLayer(Stadia_AlidadeSmooth)
		}
	})

	const map = new Map({
    // the map will be created using the 'map-root' ref
    target: 'map',
		
    // layers: [
    //   // adding a background tiled layer
    //   new TileLayer({
    //     source: new OSM(Stadia_AlidadeSmooth) // tiles are served by OpenStreetMap
    //   })
    // ],

    // the map view will initially show the whole world
    view: new View({
      zoom: 0,
      center: [0, 0],
      constrainResolution: true
    }),
  })

	if(colorScheme == "dark"){
		map.addLayer(Stadia_AlidadeSmoothDark)
	} else {
		map.addLayer(Stadia_AlidadeSmooth)
	}

});

</script>

<style scoped>
	#map {
		height: 600px;
	}
</style>