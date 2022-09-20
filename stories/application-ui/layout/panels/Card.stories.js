import Card from '/components/application-ui/layout/panels/card.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Layout/Panels',
	component: Card,
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
	components: { Card },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Card v-bind="args"><</Card>',
});

export const CardComponent = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CardComponent.args = {
	fullscreen: true,
};