import BarChart from '/components/application-ui/data-display/charts/chartJS/BarChart.ts'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Charts',
	component: BarChart,
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { BarChart },
	setup() {
		return { args };
	},
	template: '<BarChart v-bind="args" />',
});

export const Barchart = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Barchart.args = {
	chartOptions: {
		responsive: true
	},
	chartData: {
		labels: ['January', 'February', 'March'],
		datasets: [{ data: [40, 20, 12] }]
	}
};


