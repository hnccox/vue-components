import Input from '/components/application-ui/forms/input-groups/input.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Forms/InputGroups',
	component: Input,
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
	components: { Input },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Preview><Input v-bind="args"></Input></Preview>',
});

export const InputComponent = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
InputComponent.args = {
	id: 'email',
	type: 'email',
	icon: true,
	iconPosition: 'left',
	name: 'email',
	value: 'email@example.com',
	min: '',
	max: '',
	placeholder: 'email@example.com',
	label: 'Email',
};
