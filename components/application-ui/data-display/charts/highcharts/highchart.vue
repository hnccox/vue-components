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
import { ref, onMounted } from 'vue';

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highcharts Stock. The Maps and Gantt
// packages are similar.
import * as Highstocks from 'highcharts/modules/stock';
import * as Highmaps from 'highcharts/modules/map';

// Load the exporting module.
import * as Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.

Highstocks(Highcharts);
Highmaps(Highcharts);
Exporting(Highcharts);

const data = [
	{
		name: 'United States of America',
		value: 1477
	},
	{
		name: 'Brazil',
		value: 490
	},
	{
		name: 'Mexico',
		value: 882
	},
	{
		name: 'Canada',
		value: 161
	},
	{
		name: 'Russia',
		value: 74
	},
	{
		name: 'Argentina',
		value: 416
	},
	{
		name: 'Bolivia',
		value: 789
	},
	{
		name: 'Colombia',
		value: 805
	},
	{
		name: 'Paraguay',
		value: 2011
	},
	{
		name: 'Indonesia',
		value: 372
	},
	{
		name: 'South Africa',
		value: 466
	},
	{
		name: 'Papua New Guinea',
		value: 1239
	},
	{
		name: 'Germany',
		value: 1546
	},
	{
		name: 'China',
		value: 54
	},
	{
		name: 'Chile',
		value: 647
	},
	{
		name: 'Australia',
		value: 62
	},
	{
		name: 'France',
		value: 844
	},
	{
		name: 'United Kingdom',
		value: 1901
	},
	{
		name: 'Venezuela',
		value: 503
	},
	{
		name: 'Ecuador',
		value: 1560
	},
	{
		name: 'India',
		value: 116
	},
	{
		name: 'Iran',
		value: 208
	},
	{
		name: 'Guatemala',
		value: 2716
	},
	{
		name: 'Philippines',
		value: 828
	},
	{
		name: 'Sweden',
		value: 563
	},
	{
		name: 'Saudi Arabia',
		value: 100
	},
	{
		name: 'Democratic Republic of the Congo',
		value: 87
	},
	{
		name: 'Kenya',
		value: 346
	},
	{
		name: 'Zimbabwe',
		value: 507
	},
	{
		name: 'Peru',
		value: 149
	},
	{
		name: 'Ukraine',
		value: 323
	},
	{
		name: 'Angola',
		value: 141
	},
	{
		name: 'Japan',
		value: 480
	},
	{
		name: 'United Republic of Tanzania',
		value: 187
	},
	{
		name: 'Costa Rica',
		value: 3153
	},
	{
		name: 'Algeria',
		value: 66
	},
	{
		name: 'Pakistan',
		value: 196
	},
	{
		name: 'Spain',
		value: 301
	},
	{
		name: 'Finland',
		value: 487
	},
	{
		name: 'Nicaragua',
		value: 1225
	},
	{
		name: 'Libya',
		value: 83
	},
	{
		name: 'Cuba',
		value: 1211
	},
	{
		name: 'Uruguay',
		value: 760
	},
	{
		name: 'Oman',
		value: 426
	},
	{
		name: 'Italy',
		value: 439
	},
	{
		name: 'Czech Republic',
		value: 1657
	},
	{
		name: 'Poland',
		value: 414
	},
	{
		name: 'New Zealand',
		value: 465
	},
	{
		name: 'Guyana',
		value: 594
	},
	{
		name: 'Panama',
		value: 1574
	},
	{
		name: 'Malaysia',
		value: 347
	},
	{
		name: 'Namibia',
		value: 136
	},
	{
		name: 'South Korea',
		value: 1145
	},
	{
		name: 'Honduras',
		value: 921
	},
	{
		name: 'Iraq',
		value: 233
	},
	{
		name: 'Thailand',
		value: 198
	},
	{
		name: 'Mozambique',
		value: 125
	},
	{
		name: 'Turkey',
		value: 127
	},
	{
		name: 'Iceland',
		value: 958
	},
	{
		name: 'Kazakhstan',
		value: 36
	},
	{
		name: 'Norway',
		value: 312
	},
	{
		name: 'Syria',
		value: 484
	},
	{
		name: 'Zambia',
		value: 118
	},
	{
		name: 'South Sudan',
		value: 132
	},
	{
		name: 'Egypt',
		value: 83
	},
	{
		name: 'Madagascar',
		value: 143
	},
	{
		name: 'North Korea',
		value: 681
	},
	{
		name: 'Denmark',
		value: 1885
	},
	{
		name: 'Greece',
		value: 589
	},
	{
		name: 'Botswana',
		value: 131
	},
	{
		name: 'Sudan',
		value: 43
	},
	{
		name: 'Croatia',
		value: 1233
	},
	{
		name: 'Bulgaria',
		value: 627
	},
	{
		name: 'El Salvador',
		value: 3282
	},
	{
		name: 'Belarus',
		value: 320
	},
	{
		name: 'Myanmar',
		value: 98
	},
	{
		name: 'Portugal',
		value: 700
	},
	{
		name: 'Switzerland',
		value: 1575
	},
	{
		name: 'The Bahamas',
		value: 6094
	},
	{
		name: 'Lithuania',
		value: 973
	},
	{
		name: 'Somalia',
		value: 97
	},
	{
		name: 'Chad',
		value: 47
	},
	{
		name: 'Ethiopia',
		value: 52
	},
	{
		name: 'Yemen',
		value: 108
	},
	{
		name: 'Morocco',
		value: 123
	},
	{
		name: 'Suriname',
		value: 353
	},
	{
		name: 'French Polynesia',
		value: 14110
	},
	{
		name: 'Nigeria',
		value: 59
	},
	{
		name: 'Uzbekistan',
		value: 125
	},
	{
		name: 'Afghanistan',
		value: 80
	},
	{
		name: 'Austria',
		value: 631
	},
	{
		name: 'Belize',
		value: 2061
	},
	{
		name: 'Israel',
		value: 2186
	},
	{
		name: 'Nepal',
		value: 328
	},
	{
		name: 'Uganda',
		value: 238
	},
	{
		name: 'Romania',
		value: 196
	},
	{
		name: 'Vietnam',
		value: 145
	},
	{
		name: 'Gabon',
		value: 171
	},
	{
		name: 'Mongolia',
		value: 28
	},
	{
		name: 'United Arab Emirates',
		value: 514
	},
	{
		name: 'Latvia',
		value: 675
	},
	{
		name: 'Belgium',
		value: 1354
	},
	{
		name: 'Hungary',
		value: 458
	},
	{
		name: 'Laos',
		value: 178
	},
	{
		name: 'Ireland',
		value: 581
	},
	{
		name: 'Central African Republic',
		value: 63
	},
	{
		name: 'Azerbaijan',
		value: 448
	},
	{
		name: 'Taiwan',
		value: 1147
	},
	{
		name: 'Dominican Republic',
		value: 745
	},
	{
		name: 'Solomon Islands',
		value: 1286
	},
	{
		name: 'Slovakia',
		value: 728
	},
	{
		name: 'Cameroon',
		value: 70
	},
	{
		name: 'Malawi',
		value: 340
	},
	{
		name: 'Vanuatu',
		value: 2543
	},
	{
		name: 'Mauritania',
		value: 29
	},
	{
		name: 'Niger',
		value: 24
	},
	{
		name: 'Liberia',
		value: 301
	},
	{
		name: 'Netherlands',
		value: 856
	},
	{
		name: 'Puerto Rico',
		value: 3237
	},
	{
		name: 'Tunisia',
		value: 187
	},
	{
		name: 'Fiji',
		value: 1532
	},
	{
		name: 'Jamaica',
		value: 2585
	},
	{
		name: 'Kyrgyzstan',
		value: 146
	},
	{
		name: 'Republic of the Congo',
		value: 79
	},
	{
		name: 'Ivory Coast',
		value: 85
	},
	{
		name: 'Republic of Serbia',
		value: 336
	},
	{
		name: 'Turkmenistan',
		value: 55
	},
	{
		name: 'Mali',
		value: 20
	},
	{
		name: 'New Caledonia',
		value: 1368
	},
	{
		name: 'Bosnia and Herzegovina',
		value: 469
	},
	{
		name: 'Lesotho',
		value: 791
	},
	{
		name: 'Tajikistan',
		value: 170
	},
	{
		name: 'Antarctica',
		value: 2
	},
	{
		name: 'Burkina Faso',
		value: 84
	},
	{
		name: 'Georgia',
		value: 316
	},
	{
		name: 'Senegal',
		value: 104
	},
	{
		name: 'Kiribati',
		value: 23428
	},
	{
		name: 'Sri Lanka',
		value: 294
	},
	{
		name: 'Bangladesh',
		value: 138
	},
	{
		name: 'Estonia',
		value: 425
	},
	{
		name: 'Jordan',
		value: 203
	},
	{
		name: 'Cambodia',
		value: 91
	},
	{
		name: 'Guinea',
		value: 65
	},
	{
		name: 'Slovenia',
		value: 794
	},
	{
		name: 'Northern Cyprus',
		value: 1623
	},
	{
		name: 'Greenland',
		value: 7
	},
	{
		name: 'Marshall Islands',
		value: 82873
	},
	{
		name: 'Swaziland',
		value: 814
	},
	{
		name: 'Haiti',
		value: 508
	},
	{
		name: 'Seychelles',
		value: 30769
	},
	{
		name: 'Djibouti',
		value: 561
	},
	{
		name: 'Eritrea',
		value: 129
	},
	{
		name: 'Armenia',
		value: 390
	},
	{
		name: 'Cook Islands',
		value: 46610
	},
	{
		name: 'Ghana',
		value: 44
	},
	{
		name: 'Macedonia',
		value: 393
	},
	{
		name: 'Cape Verde',
		value: 2232
	},
	{
		name: 'Maldives',
		value: 30201
	},
	{
		name: 'Singapore',
		value: 12690
	},
	{
		name: 'Guinea Bissau',
		value: 284
	},
	{
		name: 'Lebanon',
		value: 782
	},
	{
		name: 'Sierra Leone',
		value: 112
	},
	{
		name: 'Togo',
		value: 147
	},
	{
		name: 'Turks and Caicos Islands',
		value: 8439
	},
	{
		name: 'Burundi',
		value: 273
	},
	{
		name: 'Equatorial Guinea',
		value: 250
	},
	{
		name: 'Falkland Islands',
		value: 575
	},
	{
		name: 'Kuwait',
		value: 393
	},
	{
		name: 'Moldova',
		value: 213
	},
	{
		name: 'Rwanda',
		value: 284
	},
	{
		name: 'Benin',
		value: 54
	},
	{
		name: 'East Timor',
		value: 403
	},
	{
		name: 'Kosovo',
		value: 551
	},
	{
		name: 'Micronesia',
		value: 8547
	},
	{
		name: 'Qatar',
		value: 518
	},
	{
		name: 'Saint Vincent and the Grenadines',
		value: 15424
	},
	{
		name: 'Tonga',
		value: 8368
	},
	{
		name: 'Western Sahara',
		value: 23
	},
	{
		name: 'Guam',
		value: 9191
	},
	{
		name: 'Mauritius',
		value: 2463
	},
	{
		name: 'Montenegro',
		value: 372
	},
	{
		name: 'Northern Mariana Islands',
		value: 10776
	},
	{
		name: 'Albania',
		value: 146
	},
	{
		name: 'Bahrain',
		value: 5263
	},
	{
		name: 'British Virgin Islands',
		value: 26490
	},
	{
		name: 'Comoros',
		value: 1790
	},
	{
		name: 'French Southern and Antarctic Lands',
		value: 522
	},
	{
		name: 'Samoa',
		value: 1418
	},
	{
		name: 'Spratly Islands',
		value: 800000
	},
	{
		name: 'Svalbard',
		value: 64
	},
	{
		name: 'Trinidad and Tobago',
		value: 780
	},
	{
		name: 'American Samoa',
		value: 13393
	},
	{
		name: 'Antigua and Barbuda',
		value: 6778
	},
	{
		name: 'Cayman Islands',
		value: 11364
	},
	{
		name: 'Grenada',
		value: 8721
	},
	{
		name: 'Palau',
		value: 6536
	},
	{
		name: 'Palestinian Territories',
		value: 500
	},
	{
		name: 'Anguilla',
		value: 21978
	},
	{
		name: 'Bhutan',
		value: 52
	},
	{
		name: 'Dominica',
		value: 2663
	},
	{
		name: 'Guernsey',
		value: 25608
	},
	{
		name: 'Hong Kong',
		value: 1864
	},
	{
		name: 'Luxembourg',
		value: 773
	},
	{
		name: 'Saint Kitts and Nevis',
		value: 7663
	},
	{
		name: 'Saint Lucia',
		value: 3300
	},
	{
		name: 'Saint Pierre and Miquelon',
		value: 8264
	},
	{
		name: 'São Tomé and Príncipe',
		value: 2075
	},
	{
		name: 'Virgin Islands of the U.S.',
		value: 5780
	},
	{
		name: 'Wallis and Futuna',
		value: 14085
	},
	{
		name: 'Aruba',
		value: 5556
	},
	{
		name: 'Barbados',
		value: 2326
	},
	{
		name: 'Bermuda',
		value: 18657
	},
	{
		name: 'British Indian Ocean Territory',
		value: 16667
	},
	{
		name: 'Brunei',
		value: 190
	},
	{
		name: 'Faroe Islands',
		value: 718
	},
	{
		name: 'Gambia',
		value: 99
	},
	{
		name: 'Gibraltar',
		value: 153846
	},
	{
		name: 'Jan Mayen',
		value: 2653
	},
	{
		name: 'Jersey',
		value: 8621
	},
	{
		name: 'Macau',
		value: 35461
	},
	{
		name: 'Malta',
		value: 3165
	},
	{
		name: 'Isle of Man',
		value: 1748
	},
	{
		name: 'Montserrat',
		value: 9804
	},
	{
		name: 'Nauru',
		value: 47170
	},
	{
		name: 'Niue',
		value: 3846
	},
	{
		name: 'Paracel Islands',
		value: 129032
	},
	{
		name: 'Saint Barthelemy',
		value: 40000
	},
	{
		name: 'Saint Helena, Ascension and Tristan da Cunha',
		value: 2538
	},
	{
		name: 'Saint Martin',
		value: 18382
	},
	{
		name: 'Sint Maarten',
		value: 29412
	},
	{
		name: 'Tuvalu',
		value: 39063
	},
	{
		name: 'Wake Island',
		value: 153846
	}
];

const getGraticule = () => {
	const data = [];

	// Meridians
	// for (let x = -180; x <= 180; x += 15) {
	// 	data.push({
	// 		geometry: {
	// 			type: 'LineString',
	// 			coordinates: x % 90 === 0 ? [
	// 				[x, -90],
	// 				[x, 0],
	// 				[x, 90]
	// 			] : [
	// 				[x, -80],
	// 				[x, 80]
	// 			]
	// 		}
	// 	});
	// }

	// Latitudes
	// for (let y = -90; y <= 90; y += 10) {
	// 	const coordinates = [];
	// 	for (let x = -180; x <= 180; x += 5) {
	// 		coordinates.push([x, y]);
	// 	}
	// 	data.push({
	// 		geometry: {
	// 			type: 'LineString',
	// 			coordinates
	// 		},
	// 		lineWidth: y === 0 ? 2 : undefined
	// 	});
	// }

	return data;
};

const afterAnimate = e => {
	const chart = e.target.chart;

	if (!chart.get('flight-route')) {
		chart.addSeries({
			type: 'mapline',
			name: 'Flight route, Amsterdam - Los Angeles',
			animation: false,
			id: 'flight-route',
			data: [{
				geometry: {
					type: 'LineString',
					coordinates: [
						[4.90, 53.38], // Amsterdam
						[-118.24, 34.05] // Los Angeles
					]
				},
				color: '#313f77'
			}],
			lineWidth: 2,
			accessibility: {
				exposeAsGroupOnly: true
			}
		}, false);
		chart.addSeries({
			type: 'mappoint',
			animation: false,
			data: [{
				name: 'Amsterdam',
				geometry: {
					type: 'Point',
					coordinates: [4.90, 53.38]
				}
			}, {
				name: 'LA',
				geometry: {
					type: 'Point',
					coordinates: [-118.24, 34.05]
				}
			}],
			color: '#313f77',
			accessibility: {
				enabled: false
			}
		}, false);
		chart.redraw(false);
	}
};

// Generate the chart
Highcharts.getJSON(
	'https://code.highcharts.com/mapdata/custom/world.topo.json',
	topology => {

		const chart = Highcharts.mapChart('container', {
			chart: {
				map: topology
			},

			title: {
				text: 'Airport density per country',
				floating: true,
				align: 'left',
				style: {
					textOutline: '2px white'
				}
			},

			subtitle: {
				text: 'Source: <a href="http://www.citypopulation.de/en/world/bymap/airports/">citypopulation.de</a><br>' +
					'Click and drag to rotate globe<br>',
				floating: true,
				y: 34,
				align: 'left'
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
				maxZoom: 30,
				projection: {
					name: 'Orthographic',
					// rotation: [60, -30]
				}
			},

			colorAxis: {
				tickPixelInterval: 100,
				minColor: '#BFCFAD',
				maxColor: '#31784B',
				max: 1000
			},

			tooltip: {
				pointFormat: '{point.name}: {point.value}'
			},

			plotOptions: {
				series: {
					animation: {
						duration: 750
					},
					clip: false
				}
			},

			series: [{
				name: 'Graticule',
				id: 'graticule',
				type: 'mapline',
				data: getGraticule(),
				nullColor: 'rgba(0, 0, 0, 0.05)',
				accessibility: {
					enabled: false
				},
				enableMouseTracking: false
			}, {
				data,
				joinBy: 'name',
				name: 'Airports per million km²',
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
				events: {
					afterAnimate
				},
				accessibility: {
					exposeAsGroupOnly: true
				}
			}]
		});

		// Render a circle filled with a radial gradient behind the globe to
		// make it appear as the sea around the continents
		const renderSea = () => {
			let verb = 'animate';
			if (!chart.sea) {
				chart.sea = chart.renderer
					.circle()
					.attr({
						fill: {
							radialGradient: {
								cx: 0.4,
								cy: 0.4,
								r: 1
							},
							stops: [
								[0, 'white'],
								[1, 'lightblue']
							]
						},
						zIndex: -1
					})
					.add(chart.get('graticule').group);
				verb = 'attr';
			}

			const bounds = chart.get('graticule').bounds,
				p1 = chart.mapView.projectedUnitsToPixels({
					x: bounds.x1,
					y: bounds.y1
				}),
				p2 = chart.mapView.projectedUnitsToPixels({
					x: bounds.x2,
					y: bounds.y2
				});
			chart.sea[verb]({
				cx: (p1.x + p2.x) / 2,
				cy: (p1.y + p2.y) / 2,
				r: Math.min(p2.x - p1.x, p1.y - p2.y) / 2
			});
		};
		renderSea();
		Highcharts.addEvent(chart, 'redraw', renderSea);

	}
);

</script>

<script>
(async () => {

	// Get random data for this sample
	function getRandomData(topology) {
		return topology.objects.default.geometries.map(() =>
			Math.round(Math.random() * 100));
	}

	const topology = await fetch(
		'https://code.highcharts.com/mapdata/custom/world.topo.json'
	).then(response => response.json());

	const antarctica = await fetch(
		'https://code.highcharts.com/mapdata/custom/antarctica.topo.json'
	).then(response => response.json());

	const data = getRandomData(topology);

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

	let chart, smallChart;

	const drawMap = projectionKey => {

		// Apply projection
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
					height: '65%'
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
					projection
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
					data,
					mapData: topology,
					joinBy: null,
					name: 'Random data',
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
				}, {
					type: 'mapline',
					data: [{
						geometry: {
							type: 'LineString',
							coordinates: [
								[4.90, 53.38], // Amsterdam
								[-118.24, 34.05] // Los Angeles
							]
						},
						color: '#3030d0'
					}],
					lineWidth: 2
				}, {
					type: 'mappoint',
					data: [{
						geometry: {
							type: 'Point',
							coordinates: [4.90, 53.38]
						},
						name: 'Amsterdam'
					}, {
						geometry: {
							type: 'Point',
							coordinates: [-118.24, 34.05]
						},
						name: 'LA'
					}],
					color: '#3030d0'
				}]
			});
			console.timeEnd('@mapChart');

		} else {
			chart.update({
				mapView: {
					projection
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
					}
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
							}
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
				const parallels = [
					Number(document.getElementById('parallels-0').value),
					Number(document.getElementById('parallels-1').value)
				];
				chart.mapView.update({
					projection: {
						parallels
					}
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
})();
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