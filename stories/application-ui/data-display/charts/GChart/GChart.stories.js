import GChart from '/components/application-ui/data-display/charts/GChart/gchart.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Charts/GChart',
	component: GChart,
	// decorators: [(Story) => ({ template: '<div style="margin: 3em;height:500px"><CardStories><story/><CardStories></div>' })],
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	// argTypes: {
	//   backgroundColor: { control: 'color' },
	//   onClick: {},
	//   size: {
	//     control: { type: 'select' },
	//     options: ['small', 'medium', 'large'],
	//   },
	// },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	// Components used in your story `template` are defined in the `components` object
	components: { GChart },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<GChart v-bind="args" />',
});

export const GeoChart = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
GeoChart.args = {
	type: 'GeoChart',
	settings: {
		packages: ['geochart']
	},
	data: [
		['State', 'Spend'],
		['ID', { v: 120000, f: '$120,000' }],
		['CO', { v: 567135, f: '$567,135' }],
		['FL', { v: 220000, f: '$220,000' }],
		['NY', { v: 1120000, f: '$1,120,000' }],
		['CA', { v: 5120000, f: '$5,120,000' }],
		['AK', { v: 101000, f: '$101,000' }],
		['AZ', { v: 311030, f: '$311,030' }]
	],
	options: {
		region: 'US',
		resolution: 'provinces',
		is3D: true,
		legend: {
			numberFormat: '€###,###'
		}
	}
};
