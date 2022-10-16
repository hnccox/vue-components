import Button from '/components/application-ui/elements/buttons/icon.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Elements/Buttons',
	component: Button,
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
export const Default = (args, { argTypes }) => ({
	setup() {
    //👇 The args will now be passed down to the template
    return { args };
  },
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="args" class="default" />',
});

export const Primary = (args, { argTypes }) => ({
	setup() {
    //👇 The args will now be passed down to the template
    return { args };
  },
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="args" class="primary" />',
});

export const Secondary = (args, { argTypes }) => ({
	setup() {
    //👇 The args will now be passed down to the template
    return { args };
  },
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="args" class="secondary" />',
});

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
	size: 'lg',
	title: 'Button',
	icon: 'phone'
};

Primary.args = {
	size: 'lg',
	title: 'Button',
	icon: 'phone'
};

Secondary.args = {
	title: 'Button',
}