<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useCalendarStore } from '@/stores/calendar'
import '/types/date.extensions.ts'

const store = useCalendarStore()

const props = defineProps<{
	selectedDate: Date,
	visibleDate: Date
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
let days = computed(() => getDaysInMonth(year.value, month.value))
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

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(year: number, month: number) {
	let date = new Date(year, month, 1);
	date.setFirstDayOfWeek(props.visibleDate.getFirstDayOfWeek())
	let days = [];

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
				days.unshift({ "index": copiedDate.getDay(), "date": copiedDate.getDate(), "datetime": formatDate(copiedDate), "events": [] })
			}

		}

	}

	const backPadding = (date: Date) => {

		if (days.length !== (6 * 7)) {
			let copiedDate = new Date(date.valueOf() - 1)
			while (days.length !== (6 * 7)) {
				copiedDate.setDate(copiedDate.getDate() + 1)
				days.push({ "index": copiedDate.getDay(), "date": copiedDate.getDate(), "datetime": formatDate(copiedDate), "events": [] })
			}
		}

	}

	frontPadding(date)
	while (date.getMonth() === month) {
		days.push({ "index": date.getDay(), "date": date.getDate(), "datetime": formatDate(date), "events": [] });
		date.setDate(date.getDate() + 1);
	}
	backPadding(date)

	return days;
}

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const isCurrentMonth = (month: number, date: string) => {
	// return date.getMonth() == month + 1
	return Number(date.split("-")[1]) == month + 1
}

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
		<div
			class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
			<div v-for="index in store.weekdays.length" :key="index" class="bg-white py-2">
				{{ capitalizeFirstLetter(store.weekdays[days[index - 1].index].short).substring(0, 1) }}<span
					class="sr-only sm:not-sr-only">
					{{ store.weekdays[days[index - 1].index].short.substring(1, store.weekdays[days[index -
							1].index].short.length)
					}}
				</span>
			</div>
		</div>
		<div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
			<div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
				<div v-for="day in days" :key="day.index"
					:class="[isCurrentMonth(month, day.datetime) ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative py-2 px-3']">
					<time :datetime="day.datetime"
						:class="day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{
								day.datetime.split('-').pop().replace(/^0/, '')
						}}</time>
					<ol v-if="day.events.length > 0" class="mt-2">
						<li v-for="event in day.events.slice(0, 2)" :key="event.id">
							<a :href="event.href" class="group flex">
								<p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
									{{ event.name }}
								</p>
								<time :datetime="event.datetime"
									class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time
									}}</time>
							</a>
						</li>
						<li v-if="day.events.length > 2" class="text-gray-500">+ {{ day.events.length - 2 }} more</li>
					</ol>
				</div>
			</div>
			<div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
				<button v-for="day in days" :key="day.index" type="button"
					:class="[isCurrentMonth(month, day.datetime) ? 'bg-white' : 'bg-gray-50', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-indigo-600', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500', 'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10']">
					<time :datetime="day.datetime"
						:class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']">{{
								day.datetime.split('-').pop().replace(/^0/, '')
						}}</time>
					<span class="sr-only">{{ day.events.length }} events</span>
					<span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
						<span v-for="event in day.events" :key="event.id"
							class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
					</span>
				</button>
			</div>
		</div>
	</div>
	<!-- <div v-if="selectedDay?.events.length > 0" class="py-10 px-4 sm:px-6 lg:hidden">
		<ol
			class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
			<li v-for="event in selectedDay.events" :key="event.id"
				class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
				<div class="flex-auto">
					<p class="font-semibold text-gray-900">{{ event.name }}</p>
					<time :datetime="event.datetime" class="mt-2 flex items-center text-gray-700">
						<ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
						{{ event.time }}
					</time>
				</div>
				<a :href="event.href"
					class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100">Edit<span
						class="sr-only">, {{ event.name }}</span></a>
			</li>
		</ol>
	</div> -->
</template>
