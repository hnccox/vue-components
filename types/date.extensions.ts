// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.

interface Date {
	getWeekYear(): number;
	getWeek(): number;
	getDayOfYear(): number;
	getHoursInDay(): number[];
	getUTCHoursInDay(): number[];
	getFirstDayOfWeek(): number;
	setFirstDayOfWeek(firstDayOfWeek: number): void;
	_calculateFirstDayOfWeekOffset(firstDayOfWeek: number): number;
}

Date.prototype._calculateFirstDayOfWeekOffset = (firstDayOfWeek: number): number => {
	let thursday = 4
	if (thursday - firstDayOfWeek < 0) {
		return thursday - firstDayOfWeek + 7
	} else {
		return thursday - firstDayOfWeek
	}
}

Date.prototype.setFirstDayOfWeek = function (firstDayOfWeek: number): void {
	this.firstDayOfWeek = firstDayOfWeek
}

Date.prototype.getFirstDayOfWeek = function (): number {
	return this.hasOwnProperty('firstDayOfWeek') ? this.firstDayOfWeek : 1
}

Date.prototype.getHoursInDay = function (): number[] {
	var date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0)
	var day = date.getDay()
	var hours = []

	while (date.getDay() === day) {
		hours.push(date.getHours())
		date.setTime(date.getTime() + 60000 * 60)
	}

	return hours
}

Date.prototype.getUTCHoursInDay = function (): number[] {
	var date = new Date(Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), 0, 0, 0, 0))
	var day = date.getUTCDay()
	var hours = []

	while (date.getUTCDay() === day) {
		hours.push(date.getUTCHours())
		date.setUTCMilliseconds(date.getUTCMilliseconds() + 60000 * 60)
	}

	console.log('HOURS!!')
	console.log(hours)
	return hours
}

Date.prototype.getDayOfYear = function (): number {
	var date = new Date(this.getFullYear(), 0, 1);

	var year = this.getFullYear()
	var month = this.getMonth()
	var countDays = 1;
	if (date.getFullYear() == year) {
		while (date.getMonth() < month) {
			date.setDate(date.getDate() + 1)
			countDays++
		}
		while (date.getDate() < this.getDate()) {
			date.setDate(date.getDate() + 1)
			countDays++
		}
		date.setFullYear(date.getFullYear() + 1)
	}

	return countDays
}
// Returns the ISO week of the date.
Date.prototype.getWeek = function (): number {
	var date = structuredClone(this)
	var firstDayOfWeek = date.getFirstDayOfWeek() // ?
	date.setHours(0, 0, 0, 0);

	// Thursday in current week decides the year.
	date.setDate(date.getDate() + this._calculateFirstDayOfWeekOffset(firstDayOfWeek) - (date.getDay() + (7 - firstDayOfWeek)) % 7);

	// January (7 - offset) is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, (7 - this._calculateFirstDayOfWeekOffset(firstDayOfWeek)));

	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
		- this._calculateFirstDayOfWeekOffset(firstDayOfWeek) + (week1.getDay() + (7 - firstDayOfWeek)) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function (): number {
	var date = new Date(this.getTime());
	var firstDayOfWeek = this.getFirstDayOfWeek();
	date.setHours(0, 0, 0, 0);

	date.setDate(date.getDate() + this._calculateFirstDayOfWeekOffset(firstDayOfWeek) - (date.getDay() + (7 - firstDayOfWeek)) % 7);
	return date.getFullYear();
}
