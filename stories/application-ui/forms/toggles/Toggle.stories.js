import Toggle from '/components/application-ui/forms/toggles/toggle.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Forms/Toggles',
	component: Toggle,
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
	components: { Toggle },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '\
		<Preview>\
			<Form>\
			<Toggle v-bind="args" /><input type="time">\
		</Preview>',
});

export const ToggleComponent = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
ToggleComponent.args = {
	value: true,
	disabled: false,
	label: {
		title: 'Available to hire',
		description: 'Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.',
		position: 'left'
	},
	optionLabels: {
		checked: 'Valid',
		unchecked: 'Invalid',
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
