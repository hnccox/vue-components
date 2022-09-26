import Highchart from '/components/application-ui/data-display/charts/highcharts/highchart.vue'
import Card from '/components/application-ui/layout/panels/card.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Charts/Highchart',
	component: Highchart,
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Highchart, Card },
	setup() {
		return { args };
	},
	template: '<Card><template v-slot:body fullscreen=true><div class="grid grid-cols-1 py-5"><Highchart v-bind="args" /></div></template></Card>',
});

export const highchart = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args


