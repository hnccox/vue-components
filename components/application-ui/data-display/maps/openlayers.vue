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

	// const map = ref(null)
onMounted(() => {
	const map = new Map({
        // the map will be created using the 'map-root' ref
        target: 'map',
        layers: [
          // adding a background tiled layer
          new TileLayer({
            source: new OSM() // tiles are served by OpenStreetMap
          }),
        ],

        // the map view will initially show the whole world
        view: new View({
          zoom: 0,
          center: [0, 0],
          constrainResolution: true
        }),
      })
		})
</script>

<style scoped>
	#map {
		height: 600px;
	}
</style>