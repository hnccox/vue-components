import Mapbox from '/components/application-ui/data-display/maps/mapbox.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Maps/Mapbox',
	component: Mapbox,
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
	components: { Mapbox },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Mapbox v-bind="args" />',
});

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Simple.args = {
	title: 'title',
	description: 'description',
	uppercaseHeadings: true,
	stripedRows: true,
	data: [{}],
	edit: true,
	add: true,
	addText: 'Add',
};