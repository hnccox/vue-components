<template>
	<div>
		<div v-on:mouseenter="toggleTooltip()" v-on:mouseleave="toggleTooltip()" ref="btnRef">
			<slot></slot>
		</div>
		<div ref="tooltipRef" v-bind:class="{ 'hidden': !tooltipShow, 'block': tooltipShow }"
			class="bg-pink-600 border-0 ml-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
			<div>
				<div
					class="bg-pink-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-slate-100 uppercase rounded-t-lg">
					{{ tooltipTitle }}
				</div>
				<div class="text-white p-3">
					{{ tooltipMessage }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { createPopper } from "@popperjs/core";

export default {
	name: "tooltip",
	data() {
		return {
			tooltipShow: false
		}
	},
	props: ['tooltip-placement', 'tooltip-title', 'tooltip-message'],
	methods: {
		toggleTooltip: function () {
			if (this.tooltipShow) {
				this.tooltipShow = false;
			} else {
				this.tooltipShow = true;
				createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
					placement: this.tooltipPlacement,
					modifiers: [
						{
							name: 'offset',
							options: {
								// offset: ({ placement, reference, popper }) => {
								// 	switch (placement) {
								// 		case 'top': return [0, 10]
								// 		case 'right': return [0, 10]
								// 		case 'bottom': return [0, 10]
								// 		case 'left': return [0, 10]
								// 		default: return [0, 10]
								// 	}
								// },
								offset: [0, 10]
							},
						},
					],
				});
			}
		}
	}
}
</script>
