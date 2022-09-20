import Mapbox from '/components/application-ui/data-display/maps/mapbox.vue';
import Card from '/components/application-ui/layout/panels/card.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Maps',
	component: Mapbox,
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
	components: { Card, Mapbox },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args, ...Card.args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Card><template v-slot:body fullscreen=true><div class="grid grid-cols-1 py-5" style="height:600px;"><Mapbox v-bind="args" /></div></template></Card>',
});

// const Template = (args) => <Mapbox v-bind="args"></Mapbox>

export const MapBox = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
MapBox.args = {
};