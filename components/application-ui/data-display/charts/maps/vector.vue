<template>
	<div id="map" class="w-full h-full self-center jsvectormap-container" 
		style="position: relative; background-color: transparent;"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import jsVectorMap from 'jsvectormap'
// import 'jsvectormap/dist/maps/world.js'
import './assets/world-merc.js'
import './assets/world-mill.js'
import './assets/europe-merc.js'
import './assets/europe-mill.js'

const props = defineProps({
	map: {
		type: String
	},
	projection: {
		type: String
	},
	data: {
		required: false,
		type: Array
	}
})

onMounted(() => {

	// var markers = [
	// 	{
	// 		name: 'Palestine',
	// 		coords: [31.5, 34.8],
	// 	},
	// 	{
	// 		name: 'Russia',
	// 		coords: [61, 105],
	// 	},
	// 	{
	// 		name: 'Geenland',
	// 		coords: [72, -42],
	// 	},
	// 	{
	// 		name: 'Canada',
	// 		coords: [56, -106],
	// 	},
	// ];

	const map = jsVectorMap({
		selector: '#map',
		map: `${props.map}_${props.projection}`,
		backgroundColor: 'tranparent',
		draggable: true,
		zoomButtons: true,
		zoomOnScroll: true,
		zoomOnScrollSpeed: 3,
		zoomMax: 12,
		zoomMin: 1,
		zoomAnimate: true,
		showTooltip: true,
		zoomStep: 1.5,
		bindTouchEvents: true,
		focusOn: {}, // focus on regions on page load
		/**
		 * Markers options
		 */
		markers: null, // Set of markers to add to the map during initialization
		series: null, // Object with two keys: markers and regions. Each of which is an array of series configs to be applied to the respective map elements.
		markersSelectable: false,
		markersSelectableOne: false,
		markerStyle: {
			// Marker style
			initial: {
				r: 7,
				fill: 'black',
				fillOpacity: 1,
				stroke: '#FFF',
				strokeWidth: 5,
				strokeOpacity: .65
			},
			hover: {
				fill: '#3cc0ff',
				stroke: '#5cc0ff',
				cursor: 'pointer',
				strokeWidth: 2
			},
			selected: {
				fill: 'blue'
			},
			selectedHover: {}
		},
		// Marker Label style
		markerLabelStyle: {
			initial: {
				fontFamily: 'Verdana',
				fontSize: 12,
				fontWeight: 'bold',
				cursor: 'default',
				fill: '#fff'
			},
			hover: {
				cursor: 'pointer'
			}
		},
		/**
		 * Region styles
		 */
		regionsSelectable: true,
		regionsSelectableOne: false,
		regionStyle: {
			// Region style
			initial: {
				fill: '#e3eaef',
				fillOpacity: 1,
				stroke: 'none',
				strokeWidth: 0,
				strokeOpacity: 1
			},
			hover: {
				fillOpacity: .7,
				cursor: 'pointer'
			},
			selected: {
				fill: '#000'
			},
			selectedHover: {}
		},
		// Region label style
		regionLabelStyle: {
			initial: {
				fontFamily: 'Verdana',
				fontSize: '12',
				fontWeight: 'bold',
				cursor: 'default',
				fill: '#fff',
				stroke: '#fff'
			},
			hover: {
				cursor: 'pointer',
			}
		},
		onRegionSelected: function (index: any, isSelected: any, selectedRegions: any) {
			console.log(index, isSelected, selectedRegions);
		},
		onMarkerSelected: function (code: any, isSelected: any, selectedMarkers: any) {
			console.log(code, isSelected, selectedMarkers)
		},
		onRegionTooltipShow: function (tooltip: any, code: any) {
			if (code === 'RU') {
				tooltip.selector.innerHTML = tooltip.text() + ' <b>(Hello Russia)</b>'
			}
		},
		onMarkerTooltipShow: function (tooltip: any, index: any) {
			tooltip.selector.innerHTML = '<h5 class="mb-0">' + tooltip.text() + '</h5>' + '<p class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><small class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>'
		},
	})

	onBeforeUnmount(() => {
	map.destroy()
})

});

</script>

<style lang="css">

.jvm-zoom-btn {
	position: absolute;
	top: 0px;
}

.jvm-zoomin,
.jvm-zoomout {
	position: absolute;
	left: 10px;
	background: black;
	background-color: rgb(66, 66, 66);
	padding: 2px;
	color: white;
	width: 15px;
	height: 15px;
	cursor: pointer;
	line-height: 10px;
	text-align: center;
}

.jvm-zoomin {
	top: 10px;
}

.jvm-zoomout {
	top: 30px;
}

.jvm-container .jvm-zoomin,
.jvm-container .jvm-zoomout {
	background-color: #343a40;
	color: #f1f3fa;
}

.jvm-tooltip {
	display: none;
	position: absolute;
	border: none;
	border-radius: 3px;
	background: #343a40;
	color: #f1f3fa;
	font-family: Nunito,sans-serif;
	font-size: .9rem;
	padding: 5px 8px;
}

.jvm-tooltip.active {
	display: block;
}
.jvm-label {
	position: absolute;
	border: none;
	border-radius: 3px;
	background: #343a40;
	color: #f1f3fa;
	font-family: Nunito,sans-serif;
	font-size: .9rem;
	padding: 5px 8px;
}
</style>