<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useCalendarStore } from '@/stores/calendar'
import '/types/date.extensions.ts'

const store = useCalendarStore()

const props = defineProps<{
	selectedDate: Date,
	visibleDate: Date,
	visibleDateTimeRange: any,
	isToday: (string: string) => boolean
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
let days = computed(() => {
	let days = []
	let date = new Date(props.visibleDate.valueOf())
	date.setHours(0, 0, 0, 0)
	days.push({
		"index": date.getDay(),
		"year": date.getFullYear(),
		"month": date.getMonth(),
		"date": date.getDate(),
		"day": date.getDay(),
		"datetime": date.valueOf()
	});
	return days
})
let hours = computed(() => props.visibleDate.getHoursInDay())
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
let daysInMonth = computed(() => getDaysInMonth(props.visibleDate.getFullYear(), props.visibleDate.getMonth()))

/**
 * @param {number} The month number, 0 based
 * @param {number} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */

function getDaysInMonth(year: number, month: number) {

	let date = new Date(year, month, 1, 0, 0, 0, 0);
	date.setFirstDayOfWeek(props.visibleDate.getFirstDayOfWeek())
	let days = [];

	const frontPadding = (date: Date) => {

		if (date.getDay() !== date.getFirstDayOfWeek()) {

			let copiedDate = new Date(date.valueOf())
			copiedDate.setFirstDayOfWeek(date.getFirstDayOfWeek())
			let dayOfWeek = copiedDate.getDay()

			while (dayOfWeek !== date.getFirstDayOfWeek()) {
				if (dayOfWeek == -1) {
					dayOfWeek = 6
				}
				if (dayOfWeek === date.getFirstDayOfWeek()) {
					break;
				}
				dayOfWeek--
				copiedDate.setDate(copiedDate.getDate() - 1)
				days.unshift({ "index": copiedDate.getDay(), "year": copiedDate.getFullYear(), "month": copiedDate.getMonth(), "date": copiedDate.getDate(), "day": copiedDate.getDay(), "datetime": copiedDate.valueOf(), "events": [] })
			}

		}

	}

	const backPadding = (date: Date) => {

		if (days.length !== (6 * 7)) {
			let copiedDate = new Date(date.valueOf())
			while (days.length !== (6 * 7)) {
				days.push({ "index": copiedDate.getDay(), "year": copiedDate.getFullYear(), "month": copiedDate.getMonth(), "date": copiedDate.getDate(), "day": copiedDate.getDay(), "datetime": copiedDate.valueOf(), "events": [] })
				copiedDate.setDate(copiedDate.getDate() + 1)
			}
		}

	}

	frontPadding(date)
	while (date.getMonth() === month) {
		days.push({
			"index": date.getDay(),
			"year": date.getFullYear(),
			"month": date.getMonth(),
			"date": date.getDate(),
			"day": date.getDay(),
			"datetime": date.valueOf()
		});
		date.setDate(date.getDate() + 1);
	}
	backPadding(date)

	return days;
}

function isCurrentMonth(month: number, day: any) {
	return day.month === month
}

function hasEvents(date) {

	// let clone = new Date(date.valueOf())
	// let range = {
	// 	from: clone.valueOf(),
	// 	to: clone.setDate(clone.getDate() + 1).valueOf()
	// }
	// console.log(range);
	// let eventsArray = events.value.filter((event) => event.start >= range.from.valueOf() && event.start < range.to.valueOf() || event.end >= range.from.valueOf() && event.end < range.to.valueOf())
	// console.log(eventsArray)
	return true
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function updateCurrentDateTime() {
	currentDateTime.value = new Date();
	return currentDateTime
}

const emit = defineEmits(['prevMonth', 'nextMonth', 'getEvents'])

onMounted(() => {

	let currentElement = document.getElementById("current")
	let totalHeight = currentElement.parentElement.clientHeight - currentElement.parentElement.firstElementChild.clientHeight
	let stepsizeHours = totalHeight / (hours.value.length)
	let stepsizeMinutes = totalHeight / (hours.value.length * 60)

	// Set the container scroll position based on the current time.
	container.value.scrollTop =
		((container.value.scrollHeight - containerOffset.value.offsetHeight) *
			currentDateTime.value.getHours() * 60) /
		1440

	// Draw the current time position
	function setCurrentOffset() {

		let currentDateTime = new Date();
		let currentHour = currentDateTime.getHours()
		let currentMinute = currentDateTime.getMinutes()
		let currentOffset = currentHour * stepsizeHours + currentMinute * stepsizeMinutes
		currentElement.style.top = `${currentOffset}px`
		setTimeout(setCurrentOffset, ((60 - currentDateTime.getSeconds()) * 1000))

	}

	setCurrentOffset()
	store.drawEvents(events.value)

})

onUpdated(() => store.drawEvents(events.value))

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>

	<div class="flex flex-auto overflow-hidden bg-white">
		<div ref="container" class="flex flex-auto flex-col overflow-y-auto">

			<div class="flex w-full flex-auto">
				<div class="w-14 flex-none bg-white ring-1 ring-gray-100"></div>
				<div class="grid flex-auto grid-cols-1 grid-rows-1">

					<!-- Horizontal lines -->
					<div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
						:style="{ 'grid-template-rows': `repeat(${hours.length * 2}, minmax(3.5rem, 1fr))` }">
						<div ref="containerOffset" class="row-end-1 h-7"></div>
						<template v-for="hour in hours" :key="hour">
							<div>
								<div class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
									{{ store.hours[hour].hour12.replace(/ /g, "") }}
								</div>
							</div>
							<div />
						</template>
					</div>

					<!-- Current -->
					<!-- <div class="col-start-1 col-end-2 row-start-1"
						:style="[year == currentYear && month == currentMonth && date == currentDate ? { 'display': 'block' } : { 'display': 'none' }]"> -->
					<div class="col-start-1 col-end-2 row-start-1">
						<div class="row-end-1 h-7" />
						<div class="tooltip" id="current" ref="current"
							:style="[year == currentYear && month == currentMonth && date == currentDate ? { 'display': 'block' } : { 'display': 'none' }]"
							@mouseenter="updateCurrentDateTime">
							<div class="tooltip-top">{{ currentDateTime }}</div>
						</div>
					</div>

					<!-- Events -->
					<ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
						:style="{ 'grid-template-rows': `1.75rem repeat(${hours.length * 12}, minmax(0, 1fr)) auto` }">

						<EventComponent v-for="event in events" :key="event.uid" :event="event" :events="events" :days="days"
							:datetimerange="datetimerange" />

					</ol>

				</div>
			</div>
		</div>
		<div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
			<div class="flex items-center text-center text-gray-900">
				<button type="button"
					class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
					@click="emit('prevMonth', visibleDateTimeRange)">
					<span class="sr-only">Previous month</span>
					<ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
				</button>
				<div class="flex-auto font-semibold">{{ capitalizeFirstLetter(store.months[month].long)
				}} {{ year }}</div>
				<button type="button"
					class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
					@click="emit('nextMonth', visibleDateTimeRange)">
					<span class="sr-only">Next month</span>
					<ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>
			<div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
				<div v-for="index in store.weekdays.length" :key="index" class="bg-white py-2">
					{{ capitalizeFirstLetter(store.weekdays[daysInMonth[index - 1].index].short).substring(0, 1) }}
				</div>
			</div>
			<div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
				<button v-for="(day, dayIdx) in daysInMonth" :key="dayIdx" type="button" class="relative" :class="[
				isCurrentMonth(month, day) ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
				'py-1.5 hover:bg-gray-100 focus:z-10',
				// (day.isSelected || day.isToday) && 'font-semibold',
				// day.isSelected && 'text-white',
				// !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
				// !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
				// day.isToday && !day.isSelected && 'text-indigo-600',
				dayIdx === 0 && 'rounded-tl-lg',
				dayIdx === 6 && 'rounded-tr-lg',
				dayIdx === daysInMonth.length - 7 && 'rounded-bl-lg',
				dayIdx === daysInMonth.length - 1 && 'rounded-br-lg']" @click="">
					<time class="content-center" :datetime="`${day.year}-${day.month}-${day.date}`" :class="[
					'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
					isToday(day.date) && 'bg-indigo-600 font-semibold text-white',
					day.isSelected && day.isToday && 'bg-indigo-600',
					day.isSelected && !day.isToday && 'bg-gray-900']">
						{{ day.date }}
					</time>
					<p class="absolute bottom-0" v-for="event in day.events">YES</p>
				</button>
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
	cursor: ns-resize;
}
</style>