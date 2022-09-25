// import ChartJS from '/components/application-ui/data-display/charts/chartJS/chartjs.vue'
import ChartJS from '/components/application-ui/data-display/charts/chartJS/geo.vue'
import Card from '/components/application-ui/layout/panels/card.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Charts/ChartJS',
	component: ChartJS,
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { ChartJS, Card },
	setup() {
		return { args };
	},
	template: '<Card><template v-slot:body fullscreen=true><div class="grid grid-cols-1 py-5"><ChartJS v-bind="args" /></div></template></Card>',
});

// await fetch('https://unpkg.com/us-atlas/states-10m.json').then((r) => r.json()).then((us) => {
// 	const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
// 	const states = ChartGeo.topojson.feature(us, us.objects.states).features;

// 	chartJS.args = {
// 		type: 'choropleth',
// 		labels: states.map((d) => d.properties.name),
// 		datasets: [{
// 			label: 'States',
// 			outline: nation,
// 			data: states.map((d) => ({ feature: d, value: Math.random() * 10 })),
// 		}],
// 		options: {
// 			plugins: {
// 				legend: {
// 					display: false
// 				},
// 			},
// 			scales: {
// 				xy: {
// 					projection: 'albersUsa'
// 				},
// 				color: {
// 					quantize: 5,
// 					legend: {
// 						position: 'bottom-right',
// 						align: 'bottom'
// 					},
// 				}
// 			},
// 		}
// 	}

// });

export const chartJS = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args


