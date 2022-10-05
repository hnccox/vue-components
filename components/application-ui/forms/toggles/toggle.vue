<template>
	<svg class="defs-only" xmlns="http://www.w3.org/2000/svg">
		<symbol id="hand-thumb-up" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
			</g>
		</symbol>
		<symbol id="hand-thumb-down" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
			</g>
		</symbol>
		<symbol id="check" viewBox="0 0 12 12">
			<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
			</g>
		</symbol>
		<symbol id="x-mark" viewBox="0 0 12 12">
			<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" />
			</g>
		</symbol>
	</svg>
	<SwitchGroup as="div" class="flex items-center justify-between">

    <span class="flex flex-grow flex-col">
      <SwitchLabel v-if="label" as="span" class="text-sm font-medium text-gray-900" passive>{{label.title}}</SwitchLabel>
      <SwitchDescription v-if="label" as="span" class="text-sm text-gray-500">{{label.description}}</SwitchDescription>
    </span>

		<Switch ref="switchRef" v-model="enabled" 
			:class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 flex-shrink-0 flex-grow cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']" 
			:disabled="disabled">
			<span class="sr-only">Use setting</span>
			<span aria-hidden="true" 
			:class="'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'" 
			:style="[enabled ? [{ 'transform': `translateX(calc(${labelWidth.value} - 1.25rem))`}] : [{ 'transform': `translateX(0)` }]]">
				<template v-if="icons">
					<span :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
						
						<svg class="h-3 w-3 text-gray-400">
							<use :xlink:href="`#${icons.unchecked}`"/>
						</svg>

					</span>
					<span :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
						
						<svg class="h-3 w-3 text-gray-400">
							<!-- <use xlink:href="#check" /> -->
							<use :xlink:href="`#${icons.checked}`"/>
						</svg>

					</span>
				</template>
			</span>

			<template v-if="optionLabels">
				<span ref="checkedRef" class="v-switch-label text-start pl-2" :class="[enabled ? 'visible': 'invisible']">
					<slot name="checked">{{optionLabels.checked}}</slot>
				</span>
				<span ref="uncheckedRef" class="v-switch-label text-end pr-2" :class="[enabled ? 'invisible': 'visible']">
					<slot name="unchecked">{{optionLabels.unchecked}}</slot>
				</span>
			</template>
			<div style="visibility:hidden" v-if="optionLabels">
				<span ref="checkedLabel">{{optionLabels.checked}}</span>
				<span ref="uncheckedLabel">{{optionLabels.unchecked}}</span>
  		</div>
		</Switch>
	</SwitchGroup>


</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted, onUpdated } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { isString, isObject, isBoolean, has, get, translate, px } from './utils'

const props = defineProps({
	value: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	speed: {
		type: Number,
		default: 200,
	},
	type: {
		required: false,
		type: String,
		default: 'default'
	},
	icons: {
		required: false,
		type: Object
	},
	label: {
		required: false,
		type: Object,
		default: {
			title: '',
			description: '',
			position: 'left'
		}
	},
	optionLabels: {
		required: false,
		type: Object
	}
})

const enabled = ref(props.value)
const minWidth = 40
const maxWidth = 120

const switchRef = ref() as any
const checkedRef = ref({}) as Ref<HTMLSpanElement>
const uncheckedRef = ref({}) as Ref<HTMLSpanElement>
const checkedLabel = ref({}) as Ref<HTMLSpanElement>
const uncheckedLabel = ref({}) as Ref<HTMLSpanElement>
const labelWidth = ref() as any

const computedWidth = computed(() => {
	if(props.optionLabels) {
		return `${Math.min(maxWidth, Math.max(checkedRef.value.clientWidth, uncheckedRef.value.clientWidth))}px`
	} else {
		return `${minWidth - 4}`
	}
})

labelWidth.value = computedWidth

onMounted(() => {
	switchRef.value.$el.style.minWidth = `${minWidth}px`
	switchRef.value.$el.style.maxWidth = `${maxWidth}px`
	if(props.optionLabels) {
		let labelWidth = `${Math.min(maxWidth, Math.max(checkedLabel.value.offsetWidth, uncheckedLabel.value.offsetWidth))}px`
		let sliderWidth = `${switchRef.value.$el.children[1].offsetWidth}px`
		switchRef.value.$el.style.width = `calc(${labelWidth} + ${sliderWidth} + 1rem)`
	}
})

</script>

<style lang="css">
	svg.defs-only {
		display: none;
	}
	.v-switch-label {
  	position: absolute;
		width: 100%;
		height: 100%;
		font-size: small;
    font-weight: 600;
    color: white;
    z-index: 1;
	}
</style>