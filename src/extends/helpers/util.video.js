const youtubeRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
const driveRegex = /^https:\/\/drive\.google\.com\/[^\s/]+\/d\/[^/?]+/

export const isYoutube = (url) => {
	return youtubeRegex.test(url)
}

export const embedYoutube = (url) => {
	const videoId = getYoutubeVideoId(url)

	return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

export const getYoutubeVideoId = (url) => {
	const matches = url && (url.match(/[?&]v=([^&]+)/i) || url.match(/(?:\/)([a-zA-Z0-9_-]{11})(?:[\/?]|$)/))

	return matches ? matches[1] : null
}

export const embedDrive = (url) => {
	if (url) {
		let buffer = url.replace('/view', '/preview')
		return buffer
	}
}

export const isVideoUrl = (url) => {
	const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', '3gp']
	const regex = new RegExp(`\\.(?:${videoExtensions.join('|')})$`, 'i')

	return regex.test(url)
}

export const isVideo = (url) => {
	return youtubeRegex.test(url) || driveRegex.test(url) || isVideoUrl(url)
}

export const getUrl = (url) => {
	if (youtubeRegex.test(url)) {
		return embedYoutube(url)
	} else if (driveRegex.test(url)) {
		return embedDrive(url)
	} else {
		return url
	}
}
