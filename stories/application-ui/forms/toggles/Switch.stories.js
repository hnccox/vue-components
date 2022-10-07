import Card from '/components/application-ui/layout/panels/card.vue';
import Switch from '/components/application-ui/forms/toggles/switch.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Forms/Switches',
	component: Switch,
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	argTypes: {
	},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	// Components used in your story `template` are defined in the `components` object
	components: { Card, Switch },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Preview><Card><Switch v-bind="args" /></Card></Preview>',
});

export const SwitchComponent = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
SwitchComponent.args = {
	value: true,
	disabled: false,
	label: {
		title: 'Available to hire',
		description: 'Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.',
		position: 'left'
	},
	optionLabels: {
		checked: 'Enabled',
		unchecked: 'Disabled',
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
