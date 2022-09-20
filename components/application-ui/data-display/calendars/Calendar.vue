<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useCalendarStore } from '@/stores/calendar'
import '/types/date.extensions.ts'

const store = useCalendarStore()

const props = defineProps<{
	defaultView: string,
	views?: string[]
}>()

const view = ref(props.defaultView)

const currentDate = new Date();
currentDate.setFirstDayOfWeek(store.firstDayOfWeek);
const currentDateString = currentDate.toISOString().split('T')[0]
const selectedDate = ref(currentDate)
const visibleDate = ref(currentDate)
let visibleDateTimeRange
switch (view.value) {
	case 'day':
		visibleDateTimeRange = { from: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth(), visibleDate.value.getDate(), 0, 0, 0, 0).valueOf(), until: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth(), visibleDate.value.getDate() + 1, 0, 0, 0, 0).valueOf() }
		break;
	case 'week':
		let date = new Date(visibleDate.value.valueOf())
		date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())
		let dayOfWeek = date.getDay()
		while (dayOfWeek !== date.getFirstDayOfWeek()) {
			if (dayOfWeek == -1) {
				dayOfWeek = 6
			}
			if (dayOfWeek === date.getFirstDayOfWeek()) {
				break;
			}
			dayOfWeek--
			date.setDate(date.getDate() - 1)
		}
		visibleDateTimeRange = { from: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).valueOf(), until: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 0, 0, 0, 0).valueOf() }
		break;
	case 'month':
		visibleDateTimeRange = { from: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth(), 1, 0, 0, 0, 0).valueOf(), until: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth() + 1, 1, 0, 0, 0, 0).valueOf() }
		break;
	case 'year':
		visibleDateTimeRange = { from: new Date(visibleDate.value.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf(), until: new Date(visibleDate.value.getFullYear() + 1, 0, 1, 0, 0, 0, 0).valueOf() }
		break;
	case '7days':
		visibleDateTimeRange = { from: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth(), visibleDate.value.getDate(), 0, 0, 0, 0).valueOf(), until: new Date(visibleDate.value.getFullYear(), visibleDate.value.getMonth(), visibleDate.value.getDate() + 7, 0, 0, 0, 0).valueOf() }
		break;
}
let locale = navigator.languages
	? navigator.languages[0]
	: (navigator.language || 'en-US')
let clone = new Date(currentDate.getFullYear(), 0, 1, 0, 0, 0, 0)

let weekdays = []
while (!weekdays[clone.getDay()]) {
	weekdays[clone.getDay()] = {
		index: clone.getDay(),
		long: clone.toLocaleString(locale, { weekday: 'long' }),
		short: clone.toLocaleString(locale, { weekday: 'short' })
	}
	clone.setDate(clone.getDate() + 1)
}
clone.setDate(clone.getDate() - weekdays.length)

let months = []
while (!months[clone.getMonth()]) {
	months[clone.getMonth()] = {
		index: clone.getMonth(),
		long: clone.toLocaleString(locale, { month: 'long' }),
		short: clone.toLocaleString(locale, { month: 'short' })
	}
	clone.setMonth(clone.getMonth() + 1)
}
clone.setMonth(clone.getMonth() - months.length)

let hours = []
while (!hours[clone.getHours()]) {
	hours[clone.getHours()] = {
		index: clone.getHours(),
		hour24: clone.toLocaleTimeString(locale, { hour12: false, hour: '2-digit', minute: '2-digit' }),
		hour12: clone.toLocaleTimeString(locale, { hour12: true, hour: 'numeric' })
	}
	clone.setHours(clone.getHours() + 1)
}
clone.setHours(clone.getHours() - hours.length)

store.weekdays = weekdays
store.months = months
store.hours = hours

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const changeView = (val: string) => {
	view.value = val
}

const prev = (visibleDateTimeRange: any) => {

	console.log('prev')
	// Check the current view screen and adjust the week/day
	let from = new Date(visibleDateTimeRange.from.valueOf())
	let until = new Date(visibleDateTimeRange.until.valueOf())
	let date = new Date(visibleDate.value.valueOf())
	date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())

	switch (view.value) {
		case 'day':
			date.setDate(date.getDate() - 1)
			from.setDate(from.getDate() - 1)
			until.setDate(until.getDate() - 1)
			break;
		case 'week':
			date.setDate(date.getDate() - 7)
			from.setDate(from.getDate() - 7)
			until.setDate(until.getDate() - 7)
			break;
		case 'month':
			date.setMonth(date.getMonth() - 1)
			from.setMonth(from.getMonth() - 1)
			until.setMonth(until.getMonth() - 1)
			break;
		case 'year':
			date.setFullYear(date.getFullYear() - 1)
			from.setFullYear(from.getFullYear() - 1)
			until.setFullYear(until.getFullYear() - 1)
			break;
		case '7 days':
			date.setDate(date.getDate() - 7)
			from.setDate(from.getDate() - 7)
			until.setDate(until.getDate() - 7)
			break;
	}

	visibleDateTimeRange.from = from
	visibleDateTimeRange.until = until
	visibleDate.value = date

}

const next = (visibleDateTimeRange: any) => {

	console.log('next')
	// Check the current view screen and adjust the week/day
	let from = new Date(visibleDateTimeRange.from.valueOf())
	let until = new Date(visibleDateTimeRange.until.valueOf())
	let date = new Date(visibleDate.value.valueOf())
	date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())

	switch (view.value) {
		case 'day':
			date.setDate(date.getDate() + 1)
			from.setDate(from.getDate() + 1)
			until.setDate(until.getDate() + 1)
			break;
		case 'week':
		case '7 days':
			date.setDate(date.getDate() + 7)
			from.setDate(from.getDate() + 7)
			until.setDate(until.getDate() + 7)
			break;
		case 'month':
			date.setMonth(date.getMonth() + 1)
			from.setMonth(from.getMonth() + 1)
			until.setMonth(until.getMonth() + 1)
			break;
		case 'year':
			date.setFullYear(date.getFullYear() + 1)
			from.setFullYear(from.getFullYear() + 1)
			until.setFullYear(until.getFullYear() + 1)
			break;
		case '7 days':
			date.setDate(date.getDate() + 7)
			from.setDate(from.getDate() + 7)
			until.setDate(until.getDate() + 7)
			break;
	}

	visibleDateTimeRange.from = from
	visibleDateTimeRange.until = until
	visibleDate.value = date

}

const prevMonth = (visibleDateTimeRange: any) => {

	// console.log('prevMonth')
	let from = new Date(visibleDateTimeRange.from.valueOf())
	let until = new Date(visibleDateTimeRange.until.valueOf())
	let date = new Date(visibleDate.value.valueOf())

	date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())
	date.setMonth(date.getMonth() - 1)

	from.setMonth(from.getMonth() - 1)
	until.setMonth(until.getMonth() - 1)

	visibleDateTimeRange.from = from
	visibleDateTimeRange.until = until
	visibleDate.value = date

	// store.drawEvents({ from, until })

}

const nextMonth = (visibleDateTimeRange: any) => {

	// console.log('nextMonth')
	let from = new Date(visibleDateTimeRange.from.valueOf())
	let until = new Date(visibleDateTimeRange.until.valueOf())
	let date = new Date(visibleDate.value.valueOf())
	date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())

	date.setMonth(date.getMonth() + 1)
	from.setMonth(from.getMonth() + 1)
	until.setMonth(until.getMonth() + 1)

	visibleDateTimeRange.from = from
	visibleDateTimeRange.until = until
	visibleDate.value = date

	// store.drawEvents({ from, until })

}

const today = () => {
	console.log('today')
	let from = new Date(visibleDateTimeRange.from.valueOf())
	let until = new Date(visibleDateTimeRange.until.valueOf())
	let date = new Date()
	date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())
	visibleDate.value = date
	// store.drawEvents({ from, until })
}

const isToday = (datestring: string) => {
	return datestring == currentDateString
}

const formatDate = (inputDate: Date) => {
	let date: number | string, month: number | string, year: number | string;

	date = inputDate.getDate();
	month = inputDate.getMonth() + 1; // take care of the month's number here ⚠️
	year = inputDate.getFullYear();

	date = date
		.toString()
		.padStart(2, '0');

	month = month
		.toString()
		.padStart(2, '0');

	return `${year}-${month}-${date}`
}

const dateLabel = computed(() => {

	let options: any
	let shortOptions: any

	switch (view.value) {
		case 'day':
			options = { year: 'numeric', month: 'long', day: 'numeric' }
			shortOptions = { year: 'numeric', month: 'short', day: 'numeric' }
			break;
		case 'week':
			options = { year: 'numeric', month: 'long' }
			shortOptions = { year: 'numeric', month: 'short' }
			break;
		case 'month':
			options = { year: 'numeric', month: 'long' }
			shortOptions = { year: 'numeric', month: 'short' }
			break;
		case 'year':
			options = { year: 'numeric' }
			shortOptions = { year: 'numeric' }
			break;
		case '7 days':
			options = { year: 'numeric', month: 'long' }
			shortOptions = { year: 'numeric', month: 'short' }
			break;
	}

	let date = new Date(visibleDate.value);
	date.setFirstDayOfWeek(visibleDate.value.getFirstDayOfWeek())
	let localeDate = {
		long: date.toLocaleDateString(locale, options),
		short: date.toLocaleDateString(locale, shortOptions)
	}
	let localeDay = {
		long: date.toLocaleString(locale, { weekday: 'long' }),
		short: date.toLocaleString(locale, { weekday: 'short' })
	}

	return { localeDate, localeDay }

})

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getDaysInWeek(date: Date): any {
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
				days.unshift({ long: copiedDate.toLocaleString(locale, { weekday: 'long' }), short: copiedDate.toLocaleString(locale, { weekday: 'short' }) })
			}

		}
	}

	const backPadding = (date: Date) => {
		if (days.length !== 7) {
			let copiedDate = new Date(date.valueOf() - 1)
			while (days.length !== 7) {
				copiedDate.setDate(copiedDate.getDate() + 1)
				days.push({ long: copiedDate.toLocaleString(locale, { weekday: 'long' }), short: copiedDate.toLocaleString(locale, { weekday: 'short' }) })
			}
		}
	}

	frontPadding(date)
	days.push({ long: date.toLocaleString(locale, { weekday: 'long' }), short: date.toLocaleString(locale, { weekday: 'short' }) });
	backPadding(date)

	return days;
}

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div class="lg:flex lg:h-full lg:flex-col">
		<header class="relative z-40 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">

			<div>
				<h1 class="text-lg font-semibold leading-6 text-gray-900">
					<time :datetime="visibleDate.toISOString().split('T')[0]" class="sm:hidden">
						{{ capitalizeFirstLetter(dateLabel.localeDate.short) }}
					</time>
					<time :datetime="visibleDate.toISOString().split('T')[0]" class="hidden sm:inline">
						{{ capitalizeFirstLetter(dateLabel.localeDate.long) }}
					</time>
				</h1>
				<p v-if="view === 'day'" class="mt-1 text-sm text-gray-500">
					{{ capitalizeFirstLetter(dateLabel.localeDay.long) }}
				</p>
			</div>

			<div class="flex items-center">

				<div class="flex items-center rounded-md shadow-sm md:items-stretch">
					<button type="button"
						class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
						@click="prev(visibleDateTimeRange)">
						<span class="sr-only">Previous {{ view }}</span>
						<ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
					</button>
					<button type="button"
						class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
						@click="today()">Today</button>
					<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
					<button type="button"
						class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
						@click="next(visibleDateTimeRange)">
						<span class="sr-only">Next {{ view }}</span>
						<ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>

				<div class="hidden md:ml-4 md:flex md:items-center">
					<Menu as="div" class="relative">
						<MenuButton type="button"
							class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
							{{ capitalizeFirstLetter(view) }}
							<ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
						</MenuButton>

						<transition enter-active-class="transition ease-out duration-100"
							enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
							leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
							leave-to-class="transform opacity-0 scale-95">
							<MenuItems
								class="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div class="py-1">
									<MenuItem v-slot="{ active }" v-for="view in views" :key="view">
									<a href="#"
										:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
										@click="changeView(view)">{{ capitalizeFirstLetter(view) }}
									</a>
									</MenuItem>
								</div>
							</MenuItems>
						</transition>
					</Menu>
					<div class="ml-6 h-6 w-px bg-gray-300" />
					<!-- <button type="button"
						class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						@click="addEvent = !addEvent">Add event</button>
					<div v-if="addEvent">Hi</div> -->
					<Menu as="div" class="relative">
						<MenuButton type="button"
							class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
							Add event
						</MenuButton>

						<transition enter-active-class="transition ease-out duration-100"
							enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
							leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
							leave-to-class="transform opacity-0 scale-95">
							<MenuItems
								class="absolute right-0 mt-3 w-96 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

								<!-- <data-display-calendar-views-month :visible-date="selectedDate" :selected-date="selectedDate"
									:is-today="isToday" /> -->
								<DataDisplayDatepickerDaterange />
							</MenuItems>
						</transition>
					</Menu>
				</div>

				<Menu as="div" class="relative ml-6 md:hidden">
					<MenuButton
						class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
						<span class="sr-only">Open menu</span>
						<DotsHorizontalIcon class="h-5 w-5" aria-hidden="true" />
					</MenuButton>

					<transition enter-active-class="transition ease-out duration-100"
						enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
						leave-to-class="transform opacity-0 scale-95">
						<MenuItems
							class="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div class="py-1">
								<MenuItem v-slot="{ active }">
								<a href="#"
									:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Create
									event</a>
								</MenuItem>
							</div>
							<div class="py-1">
								<MenuItem v-slot="{ active }">
								<button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
									@click="today()">Go to
									today</button>
								</MenuItem>
							</div>
							<div class="py-1">
								<MenuItem v-slot="{ active }" v-for="view in views" :key="view">
								<a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
									@click="changeView(view)">{{ capitalizeFirstLetter(view) }}
									view</a>
								</MenuItem>
							</div>
						</MenuItems>
					</transition>
				</Menu>

			</div>

		</header>
		<DataDisplayCalendarViewsDay v-if="view === 'day'" ref="dayView" :visible-date="visibleDate"
			:selected-date="selectedDate" :is-today="isToday" :visible-date-time-range="visibleDateTimeRange"
			@prevMonth="prevMonth($event)" @nextMonth="nextMonth($event)" />
		<DataDisplayCalendarViewsWeek v-if="view === 'week'" ref="weekView" :visible-date="visibleDate"
			:selected-date="selectedDate" :is-today="isToday" />
		<DataDisplayCalendarViewsMonth v-if="view === 'month'" ref="monthView" :visible-date="visibleDate"
			:selected-date="selectedDate" :is-today="isToday" />
		<DataDisplayCalendarViewsYear v-if="view === 'year'" ref="yearView" :visible-date="visibleDate"
			:selected-date="selectedDate" :is-today="isToday" />
		<DataDisplayCalendarViews7Days v-if="view === '7 days'" ref="7daysView" :visible-date="visibleDate"
			:selected-date="selectedDate" :is-today="isToday" />
	</div>
</template>