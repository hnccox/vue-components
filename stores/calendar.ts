import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
	state: () => ({
		displayEvents: [],
		eventIsBeingEdited: false,
		events: [
			{
				uid: '1661337000000-1661340600000',
				name: 'Today event',
				location: null,
				href: '',
				imageUrl: '',
				start: 1661337000000,
				startDatetime: '2022-01-22T06:00',
				end: 1661340600000,
				endDatetime: '2022-01-22T07:00',
			},
			{
				uid: '1661349600000-1661353200000',
				name: 'Another today event',
				location: null,
				href: '',
				imageUrl: '',
				start: 1661349600000,
				startDatetime: '2022-01-22T06:00',
				end: 1661353200000,
				endDatetime: '2022-01-22T07:00',
			},
			{
				uid: '1661353200000-1661356800000',
				name: 'Another today event again',
				location: null,
				href: '',
				imageUrl: '',
				start: 1661353200000,
				startDatetime: '2022-01-22T06:00',
				end: 1661356800000,
				endDatetime: '2022-01-22T07:00',
			},
			{
				uid: '1661245980000-1661332380000',
				name: 'Overlapping Event',
				location: null,
				href: '',
				imageUrl: '',
				start: 1661245980000,
				startDatetime: '2022-01-22T06:00',
				end: 1661332380000,
				endDatetime: '2022-01-22T07:00',
			},
			{
				uid: '1648454400000-1648458000000',
				name: 'Breakfast',
				location: null,
				href: '',
				imageUrl: '',
				start: 1648454400000,
				startDatetime: '2022-01-22T06:00',
				end: 1648458000000,
				endDatetime: '2022-01-22T07:00',
			},
			{
				uid: '1642836600000-1642845600000',
				name: 'Flight to Paris',
				location: {
					name: 'John F. Kennedy International Airport',
					coords: []
				},
				href: '',
				imageUrl: '',
				start: 1642836600000,
				startDatetime: '2022-01-22T07:30',
				end: 1642845600000,
				endDatetime: '2022-01-22T10:00',
			},
			{
				uid: '1642845600000-1642851000000',
				name: 'Sightseeing',
				location: {
					name: 'Eiffel Tower',
					coords: []
				},
				href: '',
				imageUrl: '',
				start: 1642845600000,
				startDatetime: '2022-01-22T11:00',
				end: 1642851000000,
				endDatetime: '2022-01-22T12:30'
			},
			{
				uid: '1667106000000-1667107800000',
				name: 'DST ending',
				location: {
					name: 'Home',
					coords: []
				},
				href: '',
				imageUrl: '',
				start: 1667106000000,
				startDatetime: '2022-10-30T05:00',
				end: 1667107800000,
				endDatetime: '2022-10-30T05:30'
			}
		],
		hours:
			[
				{ index: 0, hour24: '00:00', hour12: '12 AM' },
				{ index: 1, hour24: '01:00', hour12: '1 AM' },
				{ index: 2, hour24: '02:00', hour12: '2 AM' },
				{ index: 3, hour24: '03:00', hour12: '3 AM' },
				{ index: 4, hour24: '04:00', hour12: '4 AM' },
				{ index: 5, hour24: '05:00', hour12: '5 AM' },
				{ index: 6, hour24: '06:00', hour12: '6 AM' },
				{ index: 7, hour24: '07:00', hour12: '7 AM' },
				{ index: 8, hour24: '08:00', hour12: '8 AM' },
				{ index: 9, hour24: '09:00', hour12: '9 AM' },
				{ index: 10, hour24: '10:00', hour12: '10 AM' },
				{ index: 11, hour24: '11:00', hour12: '11 AM' },
				{ index: 12, hour24: '12:00', hour12: '12 PM' },
				{ index: 13, hour24: '13:00', hour12: '1 PM' },
				{ index: 14, hour24: '14:00', hour12: '2 PM' },
				{ index: 15, hour24: '15:00', hour12: '3 PM' },
				{ index: 16, hour24: '16:00', hour12: '4 PM' },
				{ index: 17, hour24: '17:00', hour12: '5 PM' },
				{ index: 18, hour24: '18:00', hour12: '6 PM' },
				{ index: 19, hour24: '19:00', hour12: '7 PM' },
				{ index: 20, hour24: '20:00', hour12: '8 PM' },
				{ index: 21, hour24: '21:00', hour12: '9 PM' },
				{ index: 22, hour24: '22:00', hour12: '10 PM' },
				{ index: 23, hour24: '23:00', hour12: '11 PM' }
			],
		weekdays: [
			{ index: 0, short: 'Sun', long: 'Sunday' },
			{ index: 1, short: 'Mon', long: 'Monday' },
			{ index: 2, short: 'Tue', long: 'Tuesday' },
			{ index: 3, short: 'Wed', long: 'Wednesday' },
			{ index: 4, short: 'Thu', long: 'Thursday' },
			{ index: 5, short: 'Fri', long: 'Friday' },
			{ index: 6, short: 'Sat', long: 'Saturday' }
		],
		months: [
			{ index: 0, short: 'Jan', long: 'January' },
			{ index: 1, short: 'Feb', long: 'February' },
			{ index: 2, short: 'Mar', long: 'March' },
			{ index: 3, short: 'Apr', long: 'April' },
			{ index: 4, short: 'May', long: 'May' },
			{ index: 5, short: 'Jun', long: 'June' },
			{ index: 6, short: 'Jul', long: 'July' },
			{ index: 7, short: 'Aug', long: 'August' },
			{ index: 8, short: 'Sep', long: 'September' },
			{ index: 9, short: 'Oct', long: 'October' },
			{ index: 10, short: 'Nov', long: 'November' },
			{ index: 11, short: 'Dec', long: 'December' }
		],
		firstDayOfWeek: 1
	}),
	getters: {
		getWeekdays: (state) => {
			return state.weekdays || [
				{ index: 0, short: 'Sun', long: 'Sunday' },
				{ index: 1, short: 'Mon', long: 'Monday' },
				{ index: 2, short: 'Tue', long: 'Tuesday' },
				{ index: 3, short: 'Wed', long: 'Wednesday' },
				{ index: 4, short: 'Thu', long: 'Thursday' },
				{ index: 5, short: 'Fri', long: 'Friday' },
				{ index: 6, short: 'Sat', long: 'Saturday' }
			]
		},
		getEvents: (state) => (range: { from: Date, until: Date }, orderby: string | null = null) => {
			let events = state.events.filter((event) => event.start >= range.from.valueOf() && event.start < range.until.valueOf() || event.end >= range.from.valueOf() && event.end < range.until.valueOf())
			if (orderby === 'asc') return events.sort((a, b) => b.start - a.start)
			if (orderby === 'desc') return events.sort((a, b) => a.start - b.start)
			return events
		},
		getEventById: (state) => {
			return (eventUid: string) => state.events.find((event) => event.uid === eventUid)
		},
		getEventByRef: (state) => {
			return (eventRef: string) => state.events.find((event) => event.start === parseInt(eventRef.split("-")[0]) && event.end === parseInt(eventRef.split("-")[1]))
		}
	},
	actions: {
		async fetchEvents(range: { from: {}, until: {} }) {
			// try {
			// 	// const response = this.$axios.get(`http://localhost:3001/api/events/${from}/${to}`)

			// 	const { data: events } = await useFetch(`http://localhost:3001/api/events/${range.from}/${range.to}`) as any
			// 	for (let i = 0; i < events.length; i++) {
			// 		console.log('hi')
			// 	}
			// 	this.events = events
			// } catch {
			// 	// whatever
			// }
		},
		async updateEvent(event) {
			let eventId = event.id
			let target = this.events.find((event) => event.id === eventId)
			console.log(target)
			target = event
			console.log(target)
		},
		// drawEvents(datetimerange) {

		// 	console.log('store drawEvents')
		// 	console.log(datetimerange)
		// 	let eventsArray = this.getEvents(datetimerange, 'desc')
		// 	console.log(eventsArray)
		// 	let drawEvents = []
		// 	let leftOffset = 0
		// 	let rightOffset = 0

		// 	function getChildren(eventArray) {
		// 		let array = []
		// 		while (eventArray.length > 0) {
		// 			let event = eventArray[0]
		// 			let elems = Array.from(document.querySelectorAll(`[data-event="${event.start}-${event.end}"]`)) as Array<HTMLElement>
		// 			console.log(elems)
		// 			elems.forEach(elem => {
		// 				elem.style.left = `${leftOffset}%`
		// 				elem.style.right = `${rightOffset}%`
		// 				elem.style.width = `calc(100% - ${leftOffset}% - ${rightOffset}%)`
		// 			})

		// 			let children = eventsArray.filter((overlap) => ((overlap.end > event.start && overlap.end <= event.end) || (event.end > overlap.start && event.end <= overlap.end)) && overlap.uid !== event.uid);
		// 			if (children.length == 0) {
		// 				eventsArray = eventsArray.filter(ev => ev !== event)
		// 				eventArray = eventArray.filter(ev => ev !== event)
		// 				array.push(event)
		// 			} else {
		// 				eventsArray = eventsArray.filter(ev => ev !== event)
		// 				eventArray = eventArray.filter(ev => ev !== event)
		// 				leftOffset = leftOffset + 10
		// 				rightOffset = rightOffset + 5
		// 				array.push([event, getChildren(children)])
		// 			}
		// 		}
		// 		return array
		// 	}

		// 	while (eventsArray.length > 0) {
		// 		let event = eventsArray[0]
		// 		let elems = Array.from(document.querySelectorAll(`[data-event="${event.start}-${event.end}"]`)) as Array<HTMLElement>
		// 		console.log(elems)
		// 		leftOffset = 0
		// 		rightOffset = 0
		// 		elems.forEach(elem => {
		// 			elem.style.left = `${leftOffset}%`
		// 			elem.style.right = `${rightOffset}%`
		// 			elem.style.width = `calc(100% - ${leftOffset}% - ${rightOffset}%)`
		// 		})
		// 		let children = eventsArray.filter((overlap) => ((overlap.end > event.start && overlap.end <= event.end) || (event.end > overlap.start && event.end <= overlap.end)) && overlap.uid !== event.uid);
		// 		if (children.length == 0) {
		// 			eventsArray = eventsArray.filter(ev => ev !== event)
		// 			drawEvents.push(event)
		// 		} else {
		// 			eventsArray = eventsArray.filter(ev => ev !== event)
		// 			leftOffset = leftOffset + 10
		// 			rightOffset = rightOffset + 5
		// 			drawEvents.push([event, getChildren(children)])
		// 		}
		// 	}
		// }
		drawEvents(events) {

			let eventsArray = events
			let drawEvents = []
			let leftOffset = 0
			let rightOffset = 0

			function getChildren(eventArray) {
				let array = []
				while (eventArray.length > 0) {
					let event = eventArray[0]
					let elems = Array.from(document.querySelectorAll(`[data-event="${event.start}-${event.end}"]`)) as Array<HTMLElement>
					elems.forEach(elem => {
						elem.style.left = `${leftOffset}%`
						elem.style.right = `${rightOffset}%`
						elem.style.width = `calc(100% - ${leftOffset}% - ${rightOffset}%)`
					})

					let children = eventsArray.filter((overlap) => ((overlap.end > event.start && overlap.end <= event.end) || (event.end > overlap.start && event.end <= overlap.end)) && overlap.uid !== event.uid);
					if (children.length == 0) {
						eventsArray = eventsArray.filter(ev => ev !== event)
						eventArray = eventArray.filter(ev => ev !== event)
						array.push(event)
					} else {
						eventsArray = eventsArray.filter(ev => ev !== event)
						eventArray = eventArray.filter(ev => ev !== event)
						leftOffset = leftOffset + 10
						rightOffset = rightOffset + 5
						array.push([event, getChildren(children)])
					}
				}
				return array
			}

			while (eventsArray.length > 0) {
				let event = eventsArray[0]
				let elems = Array.from(document.querySelectorAll(`[data-event="${event.start}-${event.end}"]`)) as Array<HTMLElement>
				leftOffset = 0
				rightOffset = 0
				elems.forEach(elem => {
					elem.style.left = `${leftOffset}%`
					elem.style.right = `${rightOffset}%`
					elem.style.width = `calc(100% - ${leftOffset}% - ${rightOffset}%)`
				})
				let children = eventsArray.filter((overlap) => ((overlap.end > event.start && overlap.end <= event.end) || (event.end > overlap.start && event.end <= overlap.end)) && overlap.uid !== event.uid);
				if (children.length == 0) {
					eventsArray = eventsArray.filter(ev => ev !== event)
					drawEvents.push(event)
				} else {
					eventsArray = eventsArray.filter(ev => ev !== event)
					leftOffset = leftOffset + 10
					rightOffset = rightOffset + 5
					drawEvents.push([event, getChildren(children)])
				}
			}
		}
	}
})