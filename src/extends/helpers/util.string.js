import { value } from 'valibot'

export const toCapitalizeAll = (string) =>
	string
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

// https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
export const toKebabCase = (text) =>
	text
		.replace(/\W+/g, '-')
		.replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, '-$1')
		.toLowerCase()

// from - https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/
export const toKebabCaseSecond = (text) =>
	text
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase()

// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
export const toUuid = () => {
	let randomText = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16)
	let guid = [
		randomText.substring(0, 8),
		randomText.substring(8, 8 + 4),
		'4000-8' + randomText.substring(13, 13 + 3),
		randomText.substring(16, 16 + 12)
	].join('-')
	return guid
}

export function toCurrency(number) {
	if (!number) return 0
	const value = number.toString().replace(/\./g, '')
	return Number(value) > 0 ? value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
}

export function toNiceByte(number) {
	const formatter = Intl.NumberFormat('en', { notation: 'compact' })
	return formatter.format(Number(number) || 0)
}

export function toThousand(number, decimal = 0) {
	const tier = (Math.log10(Math.abs(number)) / 3) | 0 // what tier? (determines SI symbol)
	if (tier === 0) return number // if zero, we don't need a suffix
	// get suffix and determine scale
	const numberSymbols = ['', 'K', 'M', 'G', 'T', 'P', 'E']
	const suffix = numberSymbols[tier]
	const scale = Math.pow(10, tier * 3)
	const scaled = number / scale // scale the number
	return Number(scaled) === scaled && scaled % 1 === 0 ? scaled + suffix : scaled.toFixed(decimal) + suffix // format number and add suffix
}

export function toTextLimiter(text, limit = 50) {
	if (typeof text !== 'string') return text
	if (text.length > limit) return text.substring(0, limit - 3) + '...'
	return text
}

export function getAbbreviation(value) {
	let text = ''
	const splitNames = String(value).trim().split(' ')
	if (splitNames.length > 1) {
		text = splitNames[0].charAt(0) + splitNames[1].charAt(0)
	} else {
		text = splitNames[0].charAt(0)
	}
	return text.toUpperCase()
}

export function getTruncate(value, length, separator = null) {
	if (typeof value === 'string' && length > 0) {
		const result = value.slice(0, length)
		return value.length < length ? result : result.concat(separator || '...')
	}
	return value
}

export const getEllipsisName = (value) => {
	const maxLength = 100
	let textName = String(value || '')
		.replace(/ä/g, 'a')
		.replace(/ö/g, 'o')
		.replace(/Ä/g, 'A')
		.replace(/Ö/g, 'O')
		.replace(/[^\000-\177]/g, '')
		.replace(/(\r\n?|\n|\t)/g, '')
	textName = textName.length > maxLength ? textName.substring(0, maxLength - 3) + '...' : textName
	return textName
}

export const getAlphaNumText = (value) => {
	if (typeof value !== 'string') return value
	return value
		.replace('@', '')
		.replace(/\s+/g, '')
		.replace(/[^\w\\.\\-]+/g, '')
}

export const getDateFormat = (value) => {
	var d = new Date(value)
	var datestring =
		('0' + d.getDate()).slice(-2) +
		'-' +
		('0' + (d.getMonth() + 1)).slice(-2) +
		'-' +
		d.getFullYear() +
		' ' +
		('0' + d.getHours()).slice(-2) +
		':' +
		('0' + d.getMinutes()).slice(-2)
	return datestring
}

export const convertArabNumber = (value) => {
	if (typeof value !== 'number') {
		return 'Masukkan angka sebagai parameter'
	}
	try {
		const numberArab = value.toLocaleString('ar-EG')
		return numberArab
	} catch (error) {
		console.error('Terjadi kesalahan dalam konversi:', error)
		return 'Gagal mengkonversi angka'
	}
}

export const createChannelId = (otherId, myId) => {
	const channelId = [otherId.substring(0, 5), myId.substring(0, 5)]

	return channelId.join('-')
}

export const socialMediaShare = (type, data) => {
	let uri = data?.uri || null
	if (!uri) return ''
	let urlText = null
	const title = data?.title || 'Ayo Dakwah'
	const description = data?.description || ''
	const newLine = '%0D%0A' // decodeURIComponent('%0D%0A') same as \r\n
	uri = encodeURIComponent(uri)
	switch (type) {
		case 'email':
			urlText = `mailto:?subject=${title}&body=${uri + newLine + description}`
			break
		case 'facebook':
			urlText = `https://www.facebook.com/share/share.php?u=${uri}`
			break
		case 'twitter':
			urlText = `https://twitter.com/intent/tweet?text=${title}&url=${uri}`
			break
		case 'whatsapp':
			urlText = `https://api.whatsapp.com/send?text=${title + newLine + uri + newLine + description}`
			break
	}
	return urlText
}

export const createUid = (length) => {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return result
}

export const convertCreatedAt = (date) => {
	const tanggalISO = new Date(date)

	const tahun = tanggalISO.getFullYear()
	const bulan = String(tanggalISO.getMonth() + 1).padStart(2, '0')
	const tanggal = String(tanggalISO.getDate()).padStart(2, '0')

	const tanggalFormatBaru = `${tanggal}/${bulan}/${tahun}`
	return tanggalFormatBaru
}

export const capitalizeFirstLetter = (sentence) => {
	const words = sentence.split(' ')

	for (let i = 0; i < words.length; i++) {
		words[i] = words[i][0].toUpperCase() + words[i].substr(1)
	}

	return words.join(' ')
}
