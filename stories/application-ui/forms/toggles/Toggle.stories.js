import Card from '/components/application-ui/layout/panels/card.vue';
import Toggle from '/components/application-ui/forms/toggles/toggle.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Forms/Toggles',
	component: Toggle,
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	// argTypes: {
	// },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
// const Template = (args) => ({
// 	// Components used in your story `template` are defined in the `components` object
// 	components: { Card, Toggle },
// 	// argTypes: {
// 	// 	value: {
// 	// 		options: ['no', 'yes'],
// 	// 		control: { type: 'select' },
// 	// 	}
//   // },
// 	// The story's `args` need to be mapped into the template through the `setup()` method
// 	setup() {
// 		// Sets a click handler to change the label's value
// 		const handleOnClick = () => {
// 			if (!isPrimary) {
// 				setIsPrimary(true);
// 				setValue('Primary');
// 			}
// 		};
// 		return { args };
// 	},
// 	// And then the `args` are bound to your component with `v-bind="args"`
// 	template: '<Preview><Card><Toggle v-bind="args" /></Card></Preview>',
// });

// export const ToggleComponent = Template.bind({});

export const Default = (args, { argTypes }) => ({
	setup() {
    //👇 The args will now be passed down to the template
    return { args };
  },
  props: Object.keys(argTypes),
  components: { Card, Toggle },
	template: '<div class="absolute"><Card><Toggle v-bind="args" class="default" /></Card></div>',
});

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
	value: false,
	disabled: false,
	size: 'auto',
	label: {
		title: 'Available to hire',
		description: 'Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.',
		position: 'right'
	},
	optionLabels: {
		checked: 'Enabled',
		unchecked: 'Disabled',
		position: 'inner'
	},
	icons: {
		checked: 'check',
		unchecked: 'x-mark'
	},
	// icons: {
	// 	checked: 'hand-thumb-down',
	// 	unchecked: 'hand-thumb-up'
	// },
};
