import BusinessHours from '/components/branches/businesshours.vue';
import Card from '/components/application-ui/layout/panels/card.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  component: BusinessHours,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Card, BusinessHours },
  // The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args, ...Card.args };
	},
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Card><template v-slot:body><div class="p-5"><BusinessHours></BusinessHours></div></template></Card>',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
};
