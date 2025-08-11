/**
 * based on https://stackoverflow.com/questions/41948/how-do-i-get-the-difference-between-two-dates-in-javascript
 * @param date1, @param date2, @param type | @returns a number
 */

import moment from 'moment-timezone'
import 'moment/dist/locale/id';

export const differenceOfTwoDate = (date1, date2, type = 'hour') => {
	const msMinutes = 60 * 1000
	const msHours = 60 * 60 * 1000
	const msDays = 60 * 60 * 24 * 1000

	const newDate1 = new Date(date1)
	const newDate2 = new Date(date2)
	const diff = newDate2.getTime() - newDate1.getTime()

	let result = 0
	switch (type) {
		case 'minute':
			result = diff / msMinutes
			break
		case 'hour':
			result = diff / msHours
			break
		case 'day':
			result = diff / msDays
			break
	}

	return Math.floor(result)
}

export const debounce = (routine, wait, immediate = false) => {
	let timeout = null
	return function () {
		const context = this
		const args = arguments
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			timeout = null
			if (!immediate) routine.apply(context, args)
		}, wait)
		if (immediate && !timeout) routine.apply(context, args)
	}
}

let timers = {}
export function debounceDeep(id, functional, timeout = 300) {
	if (timers[id]) clearTimeout(timers[id])
	return (...args) => {
		timers[id] = setTimeout(() => {
			functional.apply(this, args)
		}, timeout)
	}
}

export const getByDateStringRange = (value, divider = '/') => {
	return value?.day?.toString().padStart(2, '0') + divider + value?.month?.toString().padStart(2, '0') + divider + value?.year?.toString()
}

export const getByDateStringSplit = (value, divider = '/') => {
	if (!value) return ''
	const splitters = value?.split(divider)
	if (splitters.length !== 3) return ''
	return splitters[2]?.toString().padStart(2, '0') + divider + splitters[1].toString().padStart(2, '0') + divider + splitters[0]?.toString()
}

export const sleep = async (ms = 15) => {
	return await new Promise((resolve) => setTimeout(resolve, ms))
}

export const hijriMonths = [
	'Muharram',
	'Safar',
	'Rabiul Awal',
	'Rabiul Akhir',
	'Jumadil Awal',
	'Jumadil Akhir',
	'Rajab',
	"Sya'ban",
	'Ramadan',
	'Syawal',
	'Dzulkaidah',
	'Dzulhijjah'
]

export const formatDateHijri = (date) => {
	const [year, month, day] = date.split('-').map(Number)

	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		return 'Invalid date format'
	}

	const hijriMonth = hijriMonths[month - 1]
	const formattedDate = `${day} ${hijriMonth} ${year}H`

	return formattedDate
}

export const formatDateToIndo = (dateString) => {
	let date = new Date(dateString)

	let day = date.getDate()
	let monthIndex = date.getMonth()
	let year = date.getFullYear()

	let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

	let formattedDate = day + ' ' + months[monthIndex] + ' ' + year

	return formattedDate
}

export const printMonthAndYear = (monthIndex, year) => {
	let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

	let formattedDate = months[monthIndex] + ' ' + year

	return formattedDate
}

export const timeSince = (date) => {
	let seconds = Math.floor((new Date() - date) / 1000)

	let interval = seconds / 31536000

	if (interval > 1) {
		return Math.floor(interval) + ' tahun yang lalu'
	}
	interval = seconds / 2592000
	if (interval > 1) {
		return Math.floor(interval) + ' bulan yang lalu'
	}
	interval = seconds / 86400
	if (interval > 1) {
		return Math.floor(interval) + ' hari yang lalu'
	}
	interval = seconds / 3600
	if (interval > 1) {
		return Math.floor(interval) + ' jam yang lalu'
	}
	interval = seconds / 60
	if (interval > 1) {
		return Math.floor(interval) + ' menit yang lalu'
	}
	return Math.floor(seconds) < 1 ? 1 + ' detik yang lalu' : Math.floor(seconds) + ' detik yang lalu'
}

export const getDateTime = (data) => {
	const date = new Date(data)
	const dateStr =
		('00' + (date.getMonth() + 1)).slice(-2) +
		'/' +
		('00' + date.getDate()).slice(-2) +
		'/' +
		date.getFullYear() +
		' ' +
		('00' + date.getHours()).slice(-2) +
		':' +
		('00' + date.getMinutes()).slice(-2) +
		':' +
		('00' + date.getSeconds()).slice(-2)

	return dateStr
}

export const isPastDate = (givenDate) => {
	let diff = new Date().getTime() - givenDate.getTime()
	return diff > 0 ? true : false
}

function padTo2Digits(num) {
	return num.toString().padStart(2, '0')
}

export const dateTimeFormat = (date) => {
	return (
		[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
		' ' +
		[padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')
	)
}

export const timeFormat = (currentDate) => {
	let options = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false // Use 24-hour format
	}

	let formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate)

	return formattedDate
}

export const timeAgo = (time) => {
  moment.locale('id');
  const formated = moment(time).fromNow();

  return formated
}


export function formatterDate(date, type) {
	if (!date) {
		return ''
	}
	date = date.replace('Z', '').replace('T', ' ')
	const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
	const dateObject = new Date(date)
	const dateString = `${dateObject.getDate()} ${monthName[dateObject.getMonth()]} ${dateObject.getFullYear()}`
	const timeString = type !== 'hour' ? '' : `${dateObject.getHours()}:${(dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes()}`
	return `${dateString} ${timeString}`
}

export function formatTimeZone(stringDate, format = 'dddd, DD MMMM YYYY - HH:mm') {
	const now = moment(stringDate)
	let timezones = moment.tz.guess()

	switch (timezones) {
		case 'Asia/Jakarta':
			return `${now.tz(timezones).format(format)} WIB`

		case 'Asia/Makassar':
			return `${now.tz(timezones).format(format)} WITA`

		case 'Asia/Jayapura':
			return `${now.tz(timezones).format(format)} WIT`

		default:
			break
	}

	return timezones
}

export function formatOnlyTimeZone(data) {
	let originalTime = data
	let originalZone = 'Asia/Jakarta'
	let timeInOriginalZone = moment.tz(originalTime, 'HH:mm', originalZone)
	let timezones = moment.tz.guess()

	switch (timezones) {
		case 'Asia/Jakarta':
			return `${timeInOriginalZone.clone().tz(timezones).format('HH:mm')}`

		case 'Asia/Makassar':
			return `${timeInOriginalZone.clone().tz(timezones).format('HH:mm')}`

		case 'Asia/Jayapura':
			return `${timeInOriginalZone.clone().tz(timezones).format('HH:mm')}`

		default:
			break
	}
}

