<template>
	<label :for="id">{{label}}</label>
	<input :type="type" :class="classes" :style="style">
</template>

<script lang="ts">
import './button.css';
import { reactive, computed } from 'vue';

export type InputTypes = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

type Props = {
	type: {
		type: String,
		required: true,
	}
}

export default {
	name: 'input',

	emits: ['click'],

	setup(props: Props, { emit }) {
		props = reactive(props);
		return {
			classes: computed(() => ({
			})),
			style: computed(() => ({
			})),
			onClick() {
				emit('click');
			}
		}
	}
}
</script>