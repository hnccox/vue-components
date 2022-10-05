import Toggle from '/components/application-ui/forms/toggles/toggle.vue';
import Card from '/components/application-ui/layout/panels/card.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  component: Toggle,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Card, Toggle },
  // The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args, ...Card.args };
	},
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Card><template v-slot:body><div class="p-5"><Toggle v-bind="args"></Toggle></div></template></Card>',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
	value: true,
	disabled: false,
	// icons: {
	// 	checked: 'check',
	// 	unchecked: 'x-mark'
	// },
	icons: {
		checked: 'hand-thumb-down',
		unchecked: 'hand-thumb-up'
	},
	label: {
		title: 'Available to hire',
		description: 'Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.',
		position: 'left'
	},
	optionLabels: {
		checked: 'Valid',
		unchecked: 'Invalid',
	}
};
