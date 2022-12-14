<template>
	<div class="main">
		<h1>Highcharts Projection Explorer</h1>

		<div class="row">
			<div class="col-lg-8">
				<figure class="highcharts-figure">
					<div id="container"></div>
					<p class="highcharts-description">
						Map showing how a TopoJSON map source is handled and how the built-in
						orthographic projection is used.
					</p>
				</figure>

				<hr>

				<div id="projection-buttons" class="grid auto-rows-auto grid-cols-3">
					<div class="row-start-1 col-start-1 col-span-full">
						<h4 class="mt-4">Projections</h4>
						<div class="flex flex-row">
							<button id="equalearth" class="btn btn-outline-secondary" data-panels="rotation-panel">Equal
								Earth</button>
							<button id="miller" class="btn btn-outline-secondary" data-panels="rotation-panel">Miller</button>
							<button id="webmerc" class="btn btn-outline-secondary" data-panels="rotation-panel">Web Mercator</button>
							<button id="ortho" class="btn btn-outline-secondary"
								data-panels="rotation-panel,rotation-preset-panel">Ortographic</button>
							<button id="lcc" class="btn btn-outline-secondary"
								data-panels="rotation-panel,parallels-panel,small-world-panel">LCC</button>
							<button id="eqc" class="btn btn-outline-secondary" data-panels="rotation-panel">None</button>
						</div>
					</div>

					<div class="col-start-1">
						<h4>Rotation</h4>
						<label>
							<input class="rotation" id="rotation-lambda" type="range" min="-180" max="180" value="0" />
							Lambda → <span class="text-muted" id="rotation-lambda-output"></span>
						</label>
						<br>
						<label>
							<input class="rotation" id="rotation-phi" type="range" min="-180" max="180" value="0" />
							Phi ↑ <span class="text-muted" id="rotation-phi-output"></span>
						</label>
						<br>
						<label>
							<input class="rotation" id="rotation-gamma" type="range" min="-180" max="180" value="0" />
							Gamma ⟲ <span class="text-muted" id="rotation-gamma-output"></span>
						</label>
					</div>
					<div class="col-start-2 col-end-3 toggle-panel" id="rotation-preset-panel">
						<h6>Preset rotations</h6>
						<div class="preset-rotations">
							<a data-rotation="-15,0" href="javascript:;">Africa</a>,
							<a data-rotation="0,90" href="javascript:;">Antarctica</a>,
							<a data-rotation="-90,-40" href="javascript:;">Asia</a>,
							<a data-rotation="-140,30" href="javascript:;">Australia</a>,
							<a data-rotation="-15,-40" href="javascript:;">Europe</a>,
							<a data-rotation="100,-45" href="javascript:;">North America</a>,
							<a data-rotation="60,10" href="javascript:;">South America</a>
						</div>
					</div>
					<div class="col-start-2">
						<div class="col-md-4 mt-4 toggle-panel" id="parallels-panel">
							<h4>Parallels</h4>
							<label>
								<input class="parallels" id="parallels-0" type="range" min="-90" max="90" value="30" />
								<span class="text-muted" id="parallels-0-output">30</span> °N
							</label>
							<br>
							<label>
								<input class="parallels" id="parallels-1" type="range" min="-90" max="90" value="40" />
								<span class="text-muted" id="parallels-1-output">40</span> °N
							</label>
						</div>
					</div>

					<div class="col-start-3 toggle-panel" id="small-world-panel">
						<div id="small-world-container"></div>
					</div>
				</div>
			</div>

			<div id="descriptions" class="mt-4 col-lg-4 mt-lg-0">
				<div id="description-equalearth">
					<h3>Equal Earth projection</h3>
					<p>The <a href="https://en.wikipedia.org/wiki/Equal_Earth_projection">Equal Earth map projection</a> is an
						equal-area
						pseudocylindrical projection for world maps, invented by Bojan
						Šavrič, Bernhard Jenny, and Tom Patterson in 2018. It is
						inspired by the widely used Robinson projection, but unlike the
						Robinson projection, retains the relative size of areas. The
						projection equations are simple to implement and fast to
						evaluate.</p>
					<p>We chose this as the default world map projection for
						Highcharts because it is visually pleasing like Robinson, but
						avoids the political problem of rendering high-latitude regions
						like Europe and North America larger than tropical regions.</p>
				</div>
				<div id="description-miller">
					<h3>Miller projection</h3>
					<p>The <a href="https://en.wikipedia.org/wiki/Miller_cylindrical_projection">Miller cylindrical projection</a>
						is a modified Mercator
						projection, proposed by Osborn Maitland Miller in 1942. Compared
						to Mercator, the vertical exaggeration of polar areas is
						smaller, so the relative size of areas is more correct.</p>
					<p>Highcharts used this as the default map projection for world
						maps until the Map Collection v2.0 and Highcharts v10.0, when
						projection math was moved to the client side and EqualEarth
						chosen as the default world map projection.
					</p>
				</div>
				<div id="description-webmerc">
					<h3>Web Mercator projection</h3>
					<p><a href="https://en.wikipedia.org/wiki/Web_Mercator_projection">Web
							Mercator</a> is a variant of the Mercator map projection and is
						the de facto standard for Web mapping applications.</p>
					<p>Web Mercator is primarily created for tiled map services, as
						when zooming in to smaller scales, the angle between lines on
						the surface is approximately retained.</p>
					<p>The great disadvantage of Web Mercator is that areas inflate
						with distance from the equator. For example, in the world map,
						Greenland appears roughly the same size as Africa. In reality
						Africa is 14 times larger, as is apparent from the Equal Earth
						or Orthographic projections.</p>
				</div>
				<div id="description-ortho">
					<h3>Orthographic projection</h3>
					<p>The <a
							href="https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/orthographic.htm">orthographic
							projection</a> is an azimuthal perspective
						projection, projecting the Earth's surface from an infinite
						distance to a plane. It gives the illusion of a
						three-dimensional globe.</p>
					<p>Its disadvantage is that it fails to render the whole world
						in one view. However, since the distortion is small at the
						center of the view, it is great at rendering limited areas of
						the globe, or at showing the positions of areas on the globe.</p>
				</div>
				<div id="description-lcc">
					<h3>Lambert Conformal Conic</h3>
					<p>The <a href="https://en.wikipedia.org/wiki/Lambert_conformal_conic_projection">Lambert
							conformal conic projection (LCC)</a> is a conic map projection
						used for many national and regional mapping systems.</p>
					<p>Its advantage lies in mapping smaller areas like countries or
						continents. Two standard parallels are given, and between these,
						the distortion is minimal.</p>
					<p>In Highcharts, LCC is the default projection when loading a
						map smaller than 180 degrees width and 90 degrees height.</p>
					<p>For custom use,
						<a href="https://api.highcharts.com/highmaps/mapView.projection.rotation">rotation</a>
						should be set to adjust the reference longitude, in addition to
						the <a href="https://api.highcharts.com/highmaps/mapView.projection.parallels">parallels</a> option.
					</p>
				</div>
				<div id="description-eqc">
					<h3>No projection</h3>
					<p>This is the raw <a href="https://en.wikipedia.org/wiki/Equirectangular_projection">Equirectangular
							projection</a>, where the longitudes and latitudes are directly
						projected onto the plane, except it doesn't run through the
						Highcharts projection logic.</p>
					<p>Notice the lines across the map at high latitudes. This is
						because the eastern tip of Russia is east of the antimeridian,
						and thus having longitudes close to -180 and upwards, while
						connected to the rest of Russia with longitudes from 180 and
						downwards. In cylindrical and conic projections this is
						mitigated by doing client-side <em>antimeridial cutting</em>, so
						that shapes spanning from one side of the plane to the other are
						cut in two.</p>
					<p>Also notice how the lack of a real projection causes the line
						from LA to Amsterdam render as a straight line, instead of a
						curve like in the real projections.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highcharts Stock. The Maps and Gantt
// packages are similar.
import DataModule from 'highcharts/modules/data'
import StocksModule from 'highcharts/modules/stock';
import MapModule from 'highcharts/modules/map';

// Load the exporting module.
import * as Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.

DataModule(Highcharts);
StocksModule(Highcharts);
MapModule(Highcharts);
Exporting(Highcharts);

let chart, smallChart;

/**
* Request data from the server, add it to the graph and set a timeout to request again
*/
async function requestData() {

	const response = await fetch('//0.0.0.0:3001/api/data/randomArray')
	if (response.ok) {
		const responseJSON = await response.json();

		// const xAxisExtremes = chart.xAxis[0].getExtremes();
		// const yAxisExtremes = chart.yAxis[0].getExtremes();
		const center = chart.mapView.center;
		const zoom = chart.mapView.zoom;
		const rotation = chart.mapView.projection.options.rotation;
		// console.log(center, zoom, rotation)

		chart.series[1].setData(responseJSON.data);
		// chart.mapView.setView(center, zoom, true, false);
		// chart.mapView.update({
		// 	projection: {
		// 		rotation: rotation
		// 	},
		// 	zoom: zoom,
		// 	center: center
		// }, true, false);
		// chart.mapView.setView(center, zoom, false, false);
		// chart.xAxis[0].setExtremes(xAxisExtremes);
		// chart.yAxis[0].setExtremes(yAxisExtremes);
		// let expiresAt = (new Date(responseJSON.expiresAt)).getTime();
		// let currentTime = Date.now();
		// console.log(responseJSON.pollingTimeout);
		(responseJSON.pollingTimeout) ? setTimeout(requestData, responseJSON.pollingTimeout) : setTimeout(requestData, 6000);
	} else {
		setTimeout(requestData, 6000)
	}
}

onMounted(async () => {

	// Get random data for this sample
	// function getRandomData(topology) {
	// 	return topology.objects.default.geometries.map(() =>
	// 		Math.round(Math.random() * 100));
	// }

	// const data = getRandomData(topology);

	const topology = await fetch(
		'https://code.highcharts.com/mapdata/custom/world.topo.json'
	).then(response => response.json());

	const antarctica = await fetch(
		'https://code.highcharts.com/mapdata/custom/antarctica.topo.json'
	).then(response => response.json());

	// Get geometries for parallels
	function getParallelsGeometries(parallels) {
		return parallels.map(lat => {
			const coordinates = [];
			for (let lon = -180; lon <= 180; lon += 5) {
				coordinates.push([lon, lat]);
			}
			return {
				geometry: {
					type: 'LineString',
					coordinates
				},
				lineWidth: lat === 0 ? 2 : undefined
			};
		});
	}

	function getGraticule() {
		const data = [];

		// Meridians
		for (let x = -180; x <= 180; x += 15) {
			data.push({
				geometry: {
					type: 'LineString',
					coordinates: x % 90 === 0 ? [
						[x, -90],
						[x, 0],
						[x, 90]
					] : [
						[x, -80],
						[x, 80]
					]
				}
			});
		}

		// Parallels
		const parallels = [];
		for (let y = -90; y <= 90; y += 10) {
			parallels.push(y);
		}
		data.push(...getParallelsGeometries(parallels));

		return data;
	}

	const drawMap = projectionKey => {

		// Apply projection
		// const zoom = undefined;
		const projection = Highcharts.merge({
			name: undefined
		}, {
			equalearth: {
				name: 'EqualEarth',
				projectedBounds: 'world'
			},
			lcc: {
				name: 'LambertConformalConic',
				parallels: [30, 40],
				projectedBounds: { x1: -200, y1: -200, x2: 200, y2: 200 }
			},
			miller: {
				name: 'Miller',
				projectedBounds: 'world'
			},
			ortho: {
				name: 'Orthographic',
				projectedBounds: 'world'
			},
			webmerc: {
				name: 'WebMercator',
				projectedBounds: 'world'
			}
		}[projectionKey] || {});

		projection.rotation = [
			document.getElementById('rotation-lambda').value,
			document.getElementById('rotation-phi').value,
			document.getElementById('rotation-gamma').value
		].map(Number);

		// Initialize the chart
		if (!chart) {

			console.time('@mapChart');
			chart = Highcharts.mapChart('container', {
				chart: {
					height: '65%',
					zoomType: 'scale',
					events: {
						// load: requestData
						load: requestData
					},

					// xAxis: {
					// 	events: {
					// 		afterSetExtremes: function() {
					// 			const {min, max} = this.getExtremes();
					// 			x[2] = min; x[3] = max;
					// 			zoomX = Math.abs(x[3] - x[2]) / Math.abs(x[1] - x[0]);
					// 			console.log(zoomX);
					// 		}
					// 	}
					// },

					// yAxis: {
					// 	events: {
					// 		afterSetExtremes: function() {
					// 			const {min, max} = this.getExtremes();
					// 			y[0] = min; y[1] = max;
					// 			zoomY = Math.abs(x[3] - x[2]) / Math.abs(x[1] - x[0]);
					// 			console.log(zoomY);
					// 		}
					// 	}
					// },
				},

				title: {
					text: undefined
				},

				legend: {
					enabled: false
				},

				mapNavigation: {
					enabled: true,
					enableDoubleClickZoomTo: true,
					buttonOptions: {
						verticalAlign: 'bottom'
					}
				},

				mapView: {
					projection,
					/*
					projection: {
							name: 'WebMercator'
					},
					zoom: 4,
					center: [6.5, 61]
					*/
				},

				colorAxis: {
					tickPixelInterval: 100,
					minColor: '#F1EEF6',
					maxColor: '#900037'
				},

				tooltip: {
					pointFormat: '{point.name}: {point.value}'
				},

				plotOptions: {
					series: {
						animationLimit: 500,
						states: {
							inactive: {
								opacity: 1
							}
						}
					},
					mapline: {
						enableMouseTracking: false
					}
				},

				series: [{
					name: 'Graticule',
					type: 'mapline',
					data: getGraticule(),
					nullColor: '#e8e8e8',
					color: '#e8e8e8'
				}, {
					data: [],
					mapData: topology,
					joinBy: null,
					name: 'Random live data',
					states: {
						hover: {
							color: '#a4edba',
							borderColor: '#333333'
						}
					},
					dataLabels: {
						enabled: false,
						format: '{point.name}'
					},
					clip: false
				}, {
					mapData: antarctica,
					allAreas: true,
					name: 'Antarctica',
					clip: false,
					opacity: 0.75
				// }, {
				// 	type: 'mapline',
				// 	data: [{
				// 		geometry: {
				// 			type: 'LineString',
				// 			coordinates: [
				// 				[4.90, 53.38], // Amsterdam
				// 				[-118.24, 34.05] // Los Angeles
				// 			]
				// 		},
				// 		color: '#3030d0'
				// 	}],
				// 	lineWidth: 2
				// }, {
				// 	type: 'mappoint',
				// 	data: [{
				// 		geometry: {
				// 			type: 'Point',
				// 			coordinates: [4.90, 53.38]
				// 		},
				// 		name: 'Amsterdam'
				// 	}, {
				// 		geometry: {
				// 			type: 'Point',
				// 			coordinates: [-118.24, 34.05]
				// 		},
				// 		name: 'LA'
				// 	}],
				// 	color: '#3030d0'
				}],
			});
			console.timeEnd('@mapChart');

		} else {
			chart.update({
				mapView: {
					projection,
					// zoom
				}
			});
		}

		if (projection.name === 'LambertConformalConic') {
			smallChart = Highcharts.mapChart('small-world-container', {
				title: {
					text: undefined
				},

				credits: {
					enabled: false
				},

				legend: {
					enabled: false
				},

				exporting: {
					enabled: false
				},

				mapView: {
					projection: {
						name: 'Orthographic',
						rotation: [0, -10, 0]
					},
					// zoom
				},

				plotOptions: {
					series: {
						enableMouseTracking: false
					},
					map: {
						animationLimit: 500,
						allAreas: true,
						clip: false,
						nullColor: '#e0e0e0',
						borderColor: '#ffffff',
						borderWidth: 0.25
					},
					mapline: {
						color: Highcharts.getOptions().colors[0]
					}
				},

				series: [{
					name: 'Graticule',
					type: 'mapline',
					data: getGraticule(),
					color: '#f8f8f8'
				}, {
					mapData: topology
				}, {
					mapData: antarctica
				}, {
					data: getParallelsGeometries(projection.parallels),
					type: 'mapline',
					id: 'parallels'
				}]
			});
		}
		!
			// Toggle buttons
			document.querySelectorAll('#projection-buttons button').forEach(btn =>
				btn.classList.remove('active')
			);
		const button = document.querySelector(
			`#projection-buttons #${projectionKey}`
		);
		button.classList.add('active');

		// Toggle descriptions
		document.querySelectorAll('#descriptions div').forEach(div => {
			div.style.display = 'none';
		});
		const div = document.querySelector(
			`#descriptions #description-${projectionKey}`
		);
		div.style.display = 'block';


		// Toggle projection-dependent panels
		const panels = (button.getAttribute('data-panels') || '').split(',');
		document.querySelectorAll('.toggle-panel').forEach(panel => {
			panel.style.display = panels.includes(panel.id) ? '' : 'none';
		});

	};

	const enableInputs = () => {

		document.querySelectorAll('#projection-buttons button').forEach(btn =>
			btn.addEventListener('click', e => drawMap(e.target.id))
		);

		document.querySelectorAll('.rotation').forEach(input => {
			input.addEventListener('input', () => {
				const center = chart.mapView.center;
				const zoom = chart.mapView.zoom;
				const rotation = [
					document.getElementById('rotation-lambda').value,
					document.getElementById('rotation-phi').value,
					document.getElementById('rotation-gamma').value
				].map(Number);

				document.getElementById('rotation-lambda-output')
					.innerText = rotation[0];
				document.getElementById('rotation-phi-output')
					.innerText = rotation[1];
				document.getElementById('rotation-gamma-output')
					.innerText = rotation[2];

				chart.mapView.update({
					projection: {
						rotation
					}
				}, true, false);
			});
		});

		document.querySelectorAll('.preset-rotations a').forEach(input => {
			input.addEventListener('click', () => {
				const center = chart.mapView.center;
				const zoom = chart.mapView.zoom;
				const rotation = input.getAttribute('data-rotation')
					.split(',')
					.map(Number);
				rotation.push(0);

				const geodesic = Highcharts.Projection.greatCircle(
					chart.mapView.projection.options.rotation,
					rotation
				);

				geodesic.forEach((rotationStep, i) => {
					setTimeout(() => {
						rotationStep.push(0);
						chart.mapView.update({
							projection: {
								rotation: rotationStep
							},
							// zoom,
							// center
						}, true, false);

						rotationStep.forEach((value, i) => {
							const name = ['lambda', 'phi', 'gamma'][i];
							document.getElementById(`rotation-${name}`)
								.value = Math.round(value);
							document.getElementById(`rotation-${name}-output`)
								.innerText = Math.round(value);
						});
					}, 25 * i);
				});
			});
		});

		document.querySelectorAll('.parallels').forEach(input => {
			input.addEventListener('input', () => {
				const center = chart.mapView.center;
				const zoom = chart.mapView.zoom;
				const parallels = [
					Number(document.getElementById('parallels-0').value),
					Number(document.getElementById('parallels-1').value)
				];
				chart.mapView.update({
					projection: {
						parallels
					},
					// zoom,
					// center
				}, true, false);
				document.getElementById('parallels-0-output')
					.innerText = parallels[0];
				document.getElementById('parallels-1-output')
					.innerText = parallels[1];

				if (smallChart) {
					smallChart.get('parallels').remove();
					smallChart.addSeries({
						data: getParallelsGeometries(parallels),
						type: 'mapline',
						id: 'parallels'
					}, true, false);
				}
			});
		});
	};

	drawMap('equalearth');
	enableInputs();

})

onBeforeUnmount(() => {
	chart.destroy()
})
</script>

<style scoped>
h1 {
	font-size: 2em;
	margin: 0.67em 0;
	font-weight: bolder;
	text-transform: uppercase;
}

h2 {
	font-size: 1.5em;
	margin: 0.83em 0;
	font-weight: bolder;
	text-transform: uppercase;
}

h3 {
	font-size: 1.17em;
	margin: 1em 0;
	font-weight: bolder;
	text-transform: uppercase;
}

h4 {
	font-weight: bolder;
	text-transform: uppercase;
}

.highcharts-samples-navbar {
	background-color: #47475C;
	height: 50px;
}

.highcharts-samples-navbar .sample-navbar-brand img {
	height: 66px;
	margin-top: auto;
	margin-bottom: auto;
	height: auto;
	max-height: 95%;
	margin-left: 5px;
	width: auto;
	max-width: 50vw;
}

.actions {
	float: right;
	max-width: 50vw;
}

.action {
	float: right;
	line-height: 50px;
	margin-right: 10px;
	text-decoration: none;
	font-size: 0.8em;
}

a.action {
	color: #424BCD;
}

a.action:hover {
	text-decoration: underline;
}

.action i.fab {
	font-size: 1.6em;
}

.action i.fa-jsfiddle {
	font-weight: 700;
}

.highcharts-samples-navbar a.action {
	color: #eeeaea;
}

.description {
	max-width: 800px;
	margin: 1em auto;
	padding: 10px;
}

.error {
	text-align: center;
	font-style: italic;
	color: red;
}

.embed .highcharts-samples-navbar {
	background-color: #EBEBEB;
	color: #3d3d3d;
	height: 50px;
}

.embed .sample-navbar-brand {
	display: none;
}

.embed a.action {
	color: #424BCD;
}

.nonav .highcharts-samples-navbar {
	display: none;
}

li {
	max-width: 60rem;
}

ul,
menu,
dir {
	display: block;
	list-style-type: disc;
	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 40px;
	line-height: 1.25rem;
}

@media only screen and (max-width: 800px) {
	.actions .action {
		font-size: 0.65em;
	}
}

.main {
	max-width: 1200px;
	margin: 0 auto;
}

#container {
	min-width: 310px;
	max-width: 800px;
	margin: 0 auto;
}

#small-world-container {
	max-width: 150px;
	min-width: 75px;
	height: 150px;
}

h1 {
	font-size: 1.5rem !important;
}

.loading {
	margin-top: 10em;
	text-align: center;
	color: gray;
}

.btn-group {
	flex-wrap: wrap;
}

#descriptions div {
	display: none;
}
</style>