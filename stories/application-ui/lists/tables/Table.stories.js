import Table from '/components/application-ui/lists/tables/table.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Lists/Table',
	component: Table,
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
	components: { Table },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<Preview><Table v-bind="args" /></Preview>',
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