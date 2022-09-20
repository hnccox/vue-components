<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useCalendarStore } from '@/stores/calendar'
import '/types/date.extensions.ts'

const store = useCalendarStore()

const props = defineProps<{
	selectedDate: Date,
	visibleDate?: Date
	isToday: (string: string) => boolean,
}>()

const container = ref(null)
const containerNav = ref(null)
const containerOffset = ref(null)

let locale = navigator.languages
	? navigator.languages[0]
	: (navigator.language || 'en-US')

let currentDateTime = ref(new Date())
let currentYear = currentDateTime.value.getFullYear()
let currentMonth = currentDateTime.value.getMonth()
let currentDate = currentDateTime.value.getDate()

let year = computed(() => props.visibleDate.getFullYear())
let month = computed(() => props.visibleDate.getMonth())
let date = computed(() => props.visibleDate.getDate())
let days = computed(() => getDaysIn7Days(props.visibleDate))
let hours = computed(() => {
	var arr = []
	for (var day in days.value) {
		var date = new Date(days.value[day].datetime)
		arr[day] = date.getHoursInDay()
	}
	return arr
})
let datetimerange = computed(() => {
	let from = days.value[0].datetime
	let until = days.value[days.value.length - 1].datetime
	let date = new Date(until.valueOf())
	date.setDate(date.getDate() + 1)
	date.setHours(0, 0, 0, 0)
	until = date.valueOf()

	return { from, until }
})
let events = computed(() => store.getEvents(datetimerange.value, 'desc'))

let horizontalLines = (arr = []) => {
	var lines = 0
	for (var i = 0; i < arr.length; i++) {
		if ((arr[i + 1] !== arr[i] + 1) && (Math.abs(arr[i + 1] - (arr[i] + 1)) > 0)) {
			lines = lines + Math.abs(arr[i + 1] - (arr[i]))
		} else {
			lines++
		}
	}
	return lines
}

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysIn7Days(date: Date): any {
	let copiedDate = new Date(date.valueOf())
	copiedDate.setHours(0, 0, 0, 0)
	let days = [];
	let count = []
	while (!count[copiedDate.getDay()]) {
		count[copiedDate.getDay()] = copiedDate.getDay()
		days.push({ "index": copiedDate.getDay(), "datetime": copiedDate.valueOf(), "date": copiedDate.getDate(), "events": [] });
		copiedDate.setDate(copiedDate.getDate() + 1)
	}

	return days;
}

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateCurrentDateTime() {
	currentDateTime.value = new Date();
	return currentDateTime
}

onMounted(() => {

	let currentElement = document.getElementById("current")
	let totalHeight = currentElement.parentElement.parentElement.clientHeight - currentElement.parentElement.parentElement.firstElementChild.clientHeight
	let stepsizeHours = totalHeight / (hours.value[0].length)
	let stepsizeMinutes = totalHeight / (hours.value[0].length * 60)

	// Set the container scroll position based on the current time.
	container.value.scrollTop =
		((container.value.scrollHeight - containerNav.value.offsetHeight * 2) *
			currentDateTime.value.getHours() * 60) /
		(1440 + containerNav.value.offsetHeight + containerNav.value.offsetHeight * 2 + 28 + 28)

	// Draw the current time position
	function setCurrentOffset() {

		let currentDateTime = new Date();
		let currentDay = currentDateTime.getUTCDay()
		let currentHour = currentDateTime.getUTCHours()
		let currentMinute = currentDateTime.getUTCMinutes()
		let currentOffset = currentHour * stepsizeHours + currentMinute * stepsizeMinutes
		currentElement.style.top = `${currentOffset}px`
		currentElement.style.gridColumnStart = days.value.findIndex(object => object.index === currentDay) + 1
		setTimeout(setCurrentOffset, ((60 - currentDateTime.getUTCSeconds()) * 1000))

	}

	setCurrentOffset()
	store.drawEvents(events.value)

})

onUpdated(() => store.drawEvents(events.value))
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div ref="container" class="flex flex-auto flex-col overflow-auto bg-white">
		<div style="width: 165%;" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
			<div ref="containerNav"
				class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">

				<div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
					<button v-for="index in store.weekdays.length" :key="index" type="button"
						class="flex flex-col items-center pt-2 pb-3">
						{{ capitalizeFirstLetter(store.weekdays[days[index - 1].index].short).substring(0, 1) }}
						<span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
							{{ days[index - 1].date }}
						</span>
					</button>
				</div>

				<div
					class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
					<div class="col-end-1 w-14" />
					<div v-for="index in store.weekdays.length" :key="index" class="flex items-center justify-center py-3">
						<span>
							{{ store.weekdays[days[index - 1].index].short }}
							<span class="items-center justify-center font-semibold text-gray-900">
								{{ days[index - 1].date }}
							</span>
						</span>
					</div>
				</div>

			</div>

			<div class="flex flex-auto overflow-hidden">
				<div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
				<div class="grid flex-auto grid-cols-1 grid-rows-1">

					<!-- Horizontal lines -->
					<div
						class="col-start-1 col-end-2 row-start-1 grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
						<template v-for="day in days">

							<div :class="`col-start-${day.index + 1} row-span-full grid divide-y divide-gray-100`"
								:style="{ 'grid-template-rows': `repeat(${horizontalLines(hours[day.index]) * 2}, minmax(3.5rem, 1fr))` }">

								<div class="row-end-1 h-7" />

								<template v-for="(line, lineIdx) in horizontalLines(hours[day.index])" :key="lineIdx">
									<div>
										<div v-if="day.index == 0"
											class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
											{{ store.hours[lineIdx].hour12.replace(/ /g, "") }}
										</div>
									</div>
									<div />
								</template>
							</div>
						</template>
						<div class="col-start-8 row-span-full w-8"></div>
					</div>

					<!-- Vertical lines -->
					<div
						class="col-start-1 col-end-2 row-start-1 grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
						<div class="col-start-1 row-span-full" />
						<div class="col-start-2 row-span-full" />
						<div class="col-start-3 row-span-full" />
						<div class="col-start-4 row-span-full" />
						<div class="col-start-5 row-span-full" />
						<div class="col-start-6 row-span-full" />
						<div class="col-start-7 row-span-full" />
						<div class="col-start-8 row-span-full w-8" />
					</div>

					<!-- Current -->
					<div class="col-start-1 col-end-2 row-start-1">
						<div class="row-end-1 h-7"></div>
						<div class="col-start-1 col-end-2 row-start-1 grid grid-cols-7">
							<div class="tooltip" id="current" ref="current"
								:style="[year == currentYear && month == currentMonth && date == currentDate ? { 'display': 'block' } : { 'display': 'none' }]"
								@mouseenter="updateCurrentDateTime">
								<div class="tooltip-top">{{ currentDateTime }}</div>
							</div>
							<div class="col-start-8 row-span-full w-8"></div>
						</div>
					</div>

					<!-- Events -->
					<ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
						:style="{ 'grid-template-rows': `1.75rem repeat(${store.hours.length * 12}, minmax(0, 1fr)) auto` }">

						<EventComponent v-for="event in events" :key="event.uid" :event="event" :events="events" :days="days"
							:datetimerange="datetimerange" />

					</ol>

				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
#current {
	position: relative;
	z-index: 10;
}

#current::before {
	position: absolute;
	height: 0.8em;
	width: 0.8em;
	margin-left: -0.4em;
	margin-top: -0.35em;
	content: '';
	border-radius: 50%;
	background-color: rgb(234, 67, 53);
}

#current::after {
	position: absolute;
	left: 0;
	right: 0;
	border-top: rgb(234, 67, 53) solid 2px;
	content: '';
}

.tooltip .tooltip-top {
	visibility: hidden;
	position: absolute;
	top: -100%;
	width: 100%;
	height: 1em;
	padding: 0 0 0 1em;
	font-size: xx-small;
}

.tooltip:hover .tooltip-top {
	visibility: visible;
}

.timeslot.disabled {
	background-color: red;
	border-color: red;
}
</style>