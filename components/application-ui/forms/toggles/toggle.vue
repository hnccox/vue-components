<script setup lang="ts">
import { ref, Ref, computed, onMounted, onUnmounted, onUpdated, onActivated, PropType } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { isString, isObject, isBoolean, has, get, translate, px } from './utils'

let portrait = window.matchMedia("(orientation: portrait)").matches

type Label = {
	title?: string,
	description?: string,
	position?: 'top' | 'right' | 'bottom' | 'left' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
}

type OptionLabels = {
	checked: string,
	unchecked: string,
	position?: 'inner' | 'outer' | 'outer left' | 'outer right'
}

type Icons = {
	checked: 'check' | 'thumbs-up'
	unchecked: 'xmark' | 'thumbs-down'
}

const props = defineProps({
	value: {
		type: Boolean,
		default: false,
	},
	name: {
		type: [String, Number],
		required: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: [String, Number],
		default: 'auto'
	},
	label: {
		required: false,
		type: Object as PropType<Label>,
		default: {
			position: 'right'
		}
	},
	optionLabels: {
		required: false,
		type: Object as PropType<OptionLabels>
	},
	icons: {
		required: false,
		type: Object as PropType<Icons>
	}
})

if(props.label && !props.label.position) { props.label.position = 'left'}
if(props.optionLabels && !props.optionLabels.position) { props.optionLabels.position = 'inner' }
if(props.label?.position && props.label?.position.split(' ').length === 1) {
	switch(props.label?.position) {
		case 'top':
			props.label.position = 'top left'
			break;
		case 'right':
			props.label.position = 'top right'
			break;
		case 'bottom':
			props.label.position = 'bottom left'
			break;
		case 'left':
			props.label.position = 'top left'
		default: 
			props.label.position = 'top left'
	}
}

const enabled = ref(props.value)
const disabled = ref(props.disabled)
const sliderRef = ref({}) as Ref<any>
const checkedLabelRef = ref({}) as Ref<any>
const uncheckedLabelRef = ref({}) as Ref<any>

const sliderWidth = () => {
	return sliderRef.value.offsetWidth
}

const labelWidth = () => {
	// Return always the width of the optionLabels if size < optionLabels.width
	let size: number;
	switch(props.size) {
		case 'xs':
			size = 0;
			break;
		case 'sm':
			size = 12;
			break;
		case 'md':
			size = 36;
			break;
		case 'lg':
			size = 60;
			break;
		case 'xl':
			size = 100;
			break;
		default: Number.isInteger(props.size) ? size = props.size as number : size = 0;
	}
	return (props.optionLabels?.position === 'inner' || (!props.size || props.size === 'auto') ) ? Math.max(Math.max(checkedLabelRef.value.offsetWidth, uncheckedLabelRef.value.offsetWidth), size) : size;
}

const labelPosition = (portrait: boolean) => {
	if(portrait) {
		return (props.label?.position && props.label?.position.split(' ')[0] === 'top' ? 'flex-col' : 'flex-col-reverse');
	} else {
		return (props.label?.position && props.label?.position.split(' ')[1] === 'left' ? 'flex-row' : 'flex-row-reverse');
	}	
}

onMounted(() => {
})

onUnmounted(() => {
})

onUpdated(() => {
})

</script>

<style lang="css">
	svg.defs-only {
		display: none;
	}
</style>

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

	<!-- HIDDEN optionLabels -->
	<div class="absolute inset-0 opacity-0 z-0 flex flex-row flex-start pointer-events-none" v-if="optionLabels">
		<span ref="checkedLabelRef">{{optionLabels.checked}}</span>
		<span ref="uncheckedLabelRef">{{optionLabels.unchecked}}</span>
  </div>

	<!-- SwitchGroup -->
	<SwitchGroup as="div" class="flex items-center justify-between" :class="labelPosition(portrait)">

		<!-- Label -->
    <span class="flex flex-grow flex-col m-2 px-2">
      <SwitchLabel v-if="label" as="span" class="text-sm font-medium text-gray-900" passive>{{label.title}}</SwitchLabel>
      <SwitchDescription v-if="label" as="span" class="text-sm text-gray-500">{{label.description}}</SwitchDescription>
    </span>

		<div class="flex flex-row items-center m-3 px-2">

			<!-- optionLabels -->
			<div class="flex items-center">
				<span v-if="optionLabels && (optionLabels.position === 'outer' || optionLabels.position === 'outer left')" 
					class="relative text-sm mx-1" 
					:class="[
						disabled ? 'text-gray-300' : (enabled ? 'text-slate-500' : 'text-current'), 
						(optionLabels.position === 'outer' || (optionLabels.position === 'outer left' && !enabled)) ? 'visible' : 'invisible']"
					>{{optionLabels.unchecked}}</span>
				<span v-if="optionLabels && optionLabels.position === 'outer left'"
					class="absolute text-sm mx-1" 
					:class="[
						disabled ? 'text-gray-300' : (enabled ? 'text-current' : 'text-slate-500'), 
						(optionLabels.position === 'outer left' && enabled) ? 'visible' : 'invisible']"
					>{{optionLabels.checked}}</span>
			</div>

			<Switch 
				ref="toggleRef" 
				v-model="enabled"
				:class="['relative inline-flex flex-row h-6 mx-2 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']" 
				:style="[{minWidth: `${sliderWidth() * 2 + labelWidth()}px`, width: `${sliderWidth() * 2 + labelWidth()}px`, maxWidth: `${sliderWidth() * 2 + labelWidth()}px`}]"
				:disabled="disabled"
				v-bind="$attrs"
				@click="$emit('click', name, enabled)"
			>
				
				<span class="sr-only">Use setting</span>

				<span 
					ref="sliderRef"
					aria-hidden="true"
					:class="['pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" 
					:style="[enabled ? [{ 'transform': `translateX(${sliderWidth() + labelWidth() - 4}px)`}] : [{ 'transform': `translateX(0)` }]]"
					>
					
					<template v-if="icons">
						<span :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full items-center justify-center transition-opacity']" aria-hidden="true">
							<svg class="h-3 w-3 text-gray-400">
								<use :xlink:href="`#${icons.unchecked}`"/>
							</svg>
						</span>

						<span :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full items-center justify-center transition-opacity']" aria-hidden="true">	
							<svg class="h-3 w-3 text-gray-400">
								<use :xlink:href="`#${icons.checked}`"/>
							</svg>
						</span>
					</template>
				</span>

				<template v-if="optionLabels && optionLabels.position === 'inner'">
					<span ref="uncheckedRef" class="absolute w-full h-full text-white text-sm font-semibold text-end pr-2" :class="[enabled ? 'invisible': 'visible']">
						<slot name="unchecked">{{optionLabels.unchecked}}</slot>
					</span>
					<span ref="checkedRef" class="absolute w-full h-full text-white text-sm font-semibold text-start pl-2" :class="[enabled ? 'visible': 'invisible']">
						<slot name="checked">{{optionLabels.checked}}</slot>
					</span>
				</template>
			</Switch>

			<!-- optionLabels -->
			<div class="flex items-center">
				<span v-if="optionLabels && (optionLabels.position === 'outer' || optionLabels.position === 'outer right')"
					class="relative text-sm mx-1" 
					:class="[
						disabled ? 'text-gray-300' : (enabled ? 'text-current' : 'text-slate-500'), 
						(optionLabels.position === 'outer' || (optionLabels.position === 'outer right' && enabled)) ? 'visible' : 'invisible']"
					>{{optionLabels.checked}}</span>
				<span v-if="optionLabels && optionLabels.position === 'outer right'" 
					class="absolute text-sm mx-1" 
					:class="[
						disabled ? 'text-gray-300' : (enabled ? 'text-slate-500' : 'text-current'), 
						(optionLabels.position === 'outer right' && enabled) ? 'invisible' : 'visible']"
					>{{optionLabels.unchecked}}</span>
			</div>
		</div>
	</SwitchGroup>
</template>