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
let months = computed(() =>
	[...Array(getMonthsInYear(year.value)).keys()].map((key) => {
		let days = getDaysInMonth(key, year.value)
		let month = {
			"index": key,
			"days": days
		}
		return month
	})
)
let date = computed(() => props.visibleDate.getDate())
let datetimerange = computed(() => {
	let from = months.value[0].days[0].datetime
	let until = months.value[months.value.length - 1].days[months.value[months.value.length - 1].days.length - 1].datetime
	let date = new Date(until.valueOf())
	date.setDate(date.getDate() + 1)
	date.setHours(0, 0, 0, 0)
	until = date.valueOf()

	return { from, until }
})
let events = computed(() => store.getEvents(datetimerange.value, 'desc'))

/**
 * @param {number} The month number, 0 based
 * @param {number} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month: number, year: number) {
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

function getMonthsInYear(year: number) {
	let date = new Date(year, 0);
	let months = 0;

	while (date.getFullYear() === year) {
		months++
		date.setMonth(date.getMonth() + 1);
	}

	return months;
}

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const isCurrentMonth = (month: number, date: string) => {
	return Number(date.split("-")[1]) == month + 1
}

onMounted(() => { })
onUpdated(() => store.drawEvents(events.value))
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div class="bg-white overflow-auto">
		<div
			class="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">

			<section v-for="month in months" :key="month.index" class="text-center">
				<h2 class="font-semibold text-gray-900">{{ capitalizeFirstLetter(store.months[month.index].long) }}</h2>

				<div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
					<div v-for="index in store.weekdays.length" :key="index" class="bg-white py-2">
						{{ capitalizeFirstLetter(store.weekdays[month.days[index - 1].index].short).substring(0, 1) }}
					</div>
				</div>

				<div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
					<button v-for="(day, dayIdx) in month.days" :key="dayIdx" type="button" :class="[
					isCurrentMonth(month.index, day.datetime) ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
					'py-1.5 hover:bg-gray-100 focus:z-10',
					dayIdx === 0 && 'rounded-tl-lg',
					dayIdx === 6 && 'rounded-tr-lg',
					dayIdx === month.days.length - 7 && 'rounded-bl-lg',
					dayIdx === month.days.length - 1 && 'rounded-br-lg']">
						<time :datetime="day.datetime" :class="[
						'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
						isToday(day.date) && 'bg-indigo-600 font-semibold text-white',
						day.date == selectedDate && 'bg-gray-500']">
							{{ day.datetime.split('-').pop().replace(/^0/, '') }}
						</time>
					</button>
				</div>
			</section>
		</div>
	</div>
</template>