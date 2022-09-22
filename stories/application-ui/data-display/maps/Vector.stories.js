import Vectormap from '/components/application-ui/data-display/maps/vector.vue';
import Card from '/components/application-ui/layout/panels/card.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Data-Display/Maps',
	component: Vectormap,
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
	components: { Card, Vectormap },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args, ...Card.args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Card class="p-2"><template v-slot:body fullscreen=true><div class="grid grid-cols-1" style="height:600px;"><Vectormap v-bind="args" /></div></template></Card>',
});

export const VectorMap = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
VectorMap.args = {
	map: 'world',
	projection: 'merc',
	data: []
};
