<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'
import '/types/date.extensions.ts'

const store = useCalendarStore()

const props = defineProps<{
	event: any,
	events: any,
	days: any,
	datetimerange: any
}>()

let locale = navigator.languages
	? navigator.languages[0]
	: (navigator.language || 'en-US')

let event = computed(() => props.event)
let events = computed(() => props.events)
let days = computed(() => props.days)
let datetimerange = computed(() => props.datetimerange)
let elements = computed(() => {
	let elements = []
	let startDate = new Date(event.value.start)
	let endDate = new Date(event.value.end)

	while (endDate.getDate() !== startDate.getDate()) {
		let object = { ...event.value }
		let clone = new Date(startDate.valueOf())
		clone.setDate(clone.getDate() + 1)
		clone.setHours(0, 0, 0, 0)
		object.start = startDate.valueOf()
		object.end = clone.valueOf() - 1
		elements.push(object)
		startDate = clone
	}

	let object = { ...event.value }
	object.start = startDate.valueOf()
	object.end = endDate.valueOf()

	elements.push(object)
	elements = elements.filter(event => event.start >= datetimerange.value.from && event.end < datetimerange.value.until)

	return elements

})

const emit = defineEmits(['drawEvents'])

const gridRowStart = (event) => {
	let date = new Date(event.start)
	let row = 2
	row += date.getHours() * 12
	row += Math.floor(date.getMinutes() / 5)
	return row
}

const gridRowEnd = (event) => {
	let date = new Date(event.end)
	let row = 2
	row += date.getHours() * 12
	row += Math.ceil(date.getMinutes() / 5)
	row = row - gridRowStart(event)
	return row
}

const gridColStart = (event) => {
	let date = new Date(event.start)
	let col = 1
	col += days.value.findIndex(object => object.index === date.getDay())
	return col
}

const gridColEnd = (event) => {
	let date = new Date(event.end)
	let col = 1
	col += days.value.findIndex(object => object.index === date.getDay())
	// If event ends on the next week weekday...
	return col
}

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function convertMsToHM(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);

	seconds = seconds % 60;
	// 👇️ if seconds are greater than 30, round minutes up (optional)
	minutes = seconds >= 30 ? minutes + 1 : minutes;

	minutes = minutes % 60;

	// 👇️ If you don't want to roll hours over, e.g. 24 to 00
	// 👇️ comment (or remove) the line below
	// commenting next line gets you `24:00:00` instead of `00:00:00`
	// or `36:15:31` instead of `12:15:31`, etc.
	hours = hours % 24;

	return `${(days > 0) ? days + ' days ' : ''}${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function mouseenterEvent(e) {
	if (store.eventIsBeingEdited) return

	let elements = Array.from(document.querySelectorAll(`[data-event="${e.target.dataset.event}"]`)) as Array<HTMLElement>

	elements.forEach((el) => {
		if (el !== e.target) {
			el.firstElementChild.classList.replace('bg-blue-200', 'bg-blue-100')
			el.firstElementChild.classList.add('shadow-lg')
			if (el.querySelector('[data-eventlocation]')) {
				el.querySelector('[data-eventlocation]').classList.replace('text-indigo-500', 'text-indigo-700')
			}
			el.querySelector('[data-eventdatetime]').classList.replace('text-blue-500', 'text-blue-700')
		}
	})

	let overlay = false
	let myTimeout = setTimeout(() => {
		overlay = true
		elements.forEach((el) => {
			el.style.zIndex = '999'
			el.style.opacity = '0.8'
		})
	}, 1000)

	e.target.addEventListener('mouseleave', () => {
		if (overlay) {
			elements.forEach((el) => {
				el.style.zIndex = 'auto'
				el.style.opacity = '1'
			})
			overlay = false
		} else {
			clearTimeout(myTimeout)
		}
	})
}

function mouseleaveEvent(e) {
	if (store.eventIsBeingEdited) return
	let elements = document.querySelectorAll(`[data-event="${e.target.dataset.event}"]`)
	elements.forEach((el) => {
		if (el !== e.target) {
			el.firstElementChild.classList.replace('bg-blue-100', 'bg-blue-200')
			el.firstElementChild.classList.remove('shadow-lg')
			if (el.querySelector('[data-eventlocation]')) {
				el.querySelector('[data-eventlocation]').classList.replace('text-indigo-700', 'text-indigo-500')
			}
			el.querySelector('[data-eventdatetime]').classList.replace('text-blue-700', 'text-blue-500')
		}
	})
}

function mousemoveEvent(e) {
	if (store.eventIsBeingEdited) return
	let elements = document.querySelectorAll(`[data-event="${e.target.dataset.event}"]`)
	if (e.target.offsetHeight - e.offsetY <= 2 && e.target === elements[elements.length - 1]) {
		window.document.querySelector('html').style.cursor = 'ns-resize'
	} else {
		window.document.querySelector('html').style.cursor = 'pointer'
	}

}

function mousedownEvent(e) {
	store.eventIsBeingEdited = true
}

function dragstartEvent(e) {
	e.preventDefault()
	e.stopPropagation()
	// Get all elements that match this event
	let elements = document.querySelectorAll(`[data-event="${e.target.dataset.event}"]`)
	var event = store.getEventByRef(e.target.dataset.event)
	var eventStart = new Date(event.start.valueOf())
	var duration = event.end - event.start
	var eventEnd = new Date(event.end.valueOf())

	var posX = e.clientX
	var posY = e.clientY
	let style = getComputedStyle(e.target.parentElement)
	var row = 0.875 * convertRemToPixels(1)
	// let row = parseInt(style.height.substring(0, style.height.length - 2)) - 
	// let row = 9.33333
	let col = (parseInt(style.width.substring(0, style.width.length - 2))
		- parseInt(style.marginLeft.substring(0, style.marginLeft.length - 2))
		- parseInt(style.marginRight.substring(0, style.marginRight.length - 2))
		- parseInt(style.paddingLeft.substring(0, style.paddingLeft.length - 2))
		- parseInt(style.paddingRight.substring(0, style.paddingRight.length - 2))
	) / (days.value.length)

	if (e.target.offsetHeight - e.offsetY <= 2 && e.target === elements[elements.length - 1]) {
		// Changing the duration of the event
		window.onmousemove = (e) => {
			e.preventDefault()
			e.stopPropagation()
			while (Math.abs(posY - e.clientY) >= row) {
				if (posY > e.clientY) {
					if (e.target.offsetHeight <= row) {
						return
					}
					if (e.target.offsetHeight <= 2 * row) {
						if (e.shiftKey) {
							event.end = event.end - 1 * 60 * 1000
						} else {
							event.end = event.end - 5 * 60 * 1000
						}
					} else {
						if (e.shiftKey) {
							event.end = event.end - Math.ceil((Math.abs(posY - e.clientY) / row)) * 1 * 60 * 1000
						} else {
							event.end = event.end - Math.ceil((Math.abs(posY - e.clientY) / row)) * 5 * 60 * 1000
						}
					}
				} else {
					if (e.shiftKey) {
						event.end = event.end + Math.ceil((Math.abs(posY - e.clientY) / row)) * 1 * 60 * 1000
					} else {
						event.end = event.end + Math.ceil((Math.abs(posY - e.clientY) / row)) * 5 * 60 * 1000
					}
				}
				posY = e.clientY
			}
		}
	} else {
		// Changing the day/time of the event
		window.onmousemove = (e) => {

			e.preventDefault()
			e.stopPropagation()

			while (Math.abs(posX - e.clientX) >= col) {
				// Adjusting day
				eventStart = new Date(event.start.valueOf())
				if (posX > e.clientX) {
					event.start = event.start - (event.start - eventStart.setDate(eventStart.getDate() - 1).valueOf())
				} else {
					event.start = event.start - (event.start - eventStart.setDate(eventStart.getDate() + 1).valueOf())
				}
				event.end = event.start + duration
				posX = e.clientX
			}

			while (Math.abs(posY - e.clientY) >= row) {
				// Adjusting time
				if (posY > e.clientY) {
					if (e.shiftKey) {
						event.start = event.start - Math.ceil((Math.abs(posY - e.clientY) / row)) * 1 * 60 * 1000
					} else {
						event.start = event.start - Math.ceil((Math.abs(posY - e.clientY) / row)) * 5 * 60 * 1000
					}
					event.end = event.start + duration
				} else {
					if (e.shiftKey) {
						event.start = event.start + Math.ceil((Math.abs(posY - e.clientY) / row)) * 1 * 60 * 1000
					} else {
						event.start = event.start + Math.ceil((Math.abs(posY - e.clientY) / row)) * 5 * 60 * 1000
					}
					event.end = event.start + duration
				}
				posY = e.clientY
			}
		}
	}
	window.onmouseup = (e) => {
		// stop moving when mouse button is released:
		window.onmouseup = null;
		window.onmousemove = null;
		store.eventIsBeingEdited = false;
		window.document.querySelector('html').style.cursor = 'default'
		store.drawEvents(events.value)
		// store.drawEvents(datetimerange.value)
		// store.drawEvents(events)
		// emit('drawEvents')
	}
}

function contextMenuEvent(e) {
	console.log(e.button)
	// edit event modal
}

onMounted(() => {
})

onUpdated(() => {
	console.log('eventComponent updated')
	// store.drawEvents(events.value)
	// emit('drawEvents')
})
</script>

<template>
	<li v-for="element in elements" :ref="`${element.start}-${element.end}`" :id="`${element.start}-${element.end}`"
		class="relative mt-px flex event sm:col-start-3"
		:style="{ 'grid-row-start': `${gridRowStart(element)}`, 'grid-row-end': `span ${gridRowEnd(element)}`, 'grid-column-start': `${gridColStart(element)}`, 'grid-column-end': `${gridColEnd(element)}` }"
		:data-event="`${event.start}-${event.end}`" draggable="true" @mouseenter="mouseenterEvent"
		@mousemove="mousemoveEvent" @mouseleave="mouseleaveEvent" @mousedown="mousedownEvent" @dragstart="dragstartEvent"
		@contextmenu.prevent="contextMenuEvent">
		<div
			class="group absolute inset-0 shadow flex flex-col overflow-y-auto rounded-lg bg-blue-200 p-2 text-xs leading-5 hover:bg-blue-100 hover:shadow-lg">
			<p class="order-1 font-semibold text-blue-700" data-eventname>{{ event.name }}</p>
			<p v-if="event.location" class="order-1 text-indigo-500 group-hover:text-indigo-700" data-eventlocation>
				{{ event.location.name }}
			</p>
			<p class="text-blue-500 group-hover:text-blue-700" data-eventdatetime>
				<time :datetime="event.startDatetime">{{ new Date(event.start).toLocaleTimeString(locale, {
						hour12: false,
						hour:
							'numeric', minute: 'numeric', timeZone: 'Europe/Amsterdam'
					})
				}}</time>
				<span>-</span>
				<time :datetime="event.endDatetime">{{ new Date(event.end).toLocaleTimeString(locale,
						{
							hour12: false,
							hour:
								'numeric', minute: 'numeric', timeZone: 'Europe/Amsterdam'
						})
				}}</time>
			</p>
			<p style="font-size: 0.5rem;margin-top:-0.5rem;">
				<time :duration="event.end - event.start">({{ convertMsToHM(event.end - event.start) }})</time>
			</p>
		</div>
	</li>
</template>

<style scoped>
li.event>div {
	border-style: solid;
	border-width: thin;
	border-color: white;
}

li.event::after {
	position: absolute;
	bottom: -0.5rem;
	content: "";
	height: 0.5rem;
	width: 100%;
	padding-bottom: 0.5rem;
	/* cursor: ns-resize; */
}

.disabled {
	background-color: grey
}
</style>