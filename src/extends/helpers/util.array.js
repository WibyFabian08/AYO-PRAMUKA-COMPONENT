export const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export const concatShuffleArray = (arrayData) => {
	return new Array(Math.ceil(arrayData.length / 2)).fill('').map(function () {
		return this.splice(0, 2)
	}, arrayData.slice())
}

export const getDifference = (array1, array2, key) => {
	return array1.filter((object1) => {
		return !array2.some((object2) => {
			return object1[key] === object2[key]
		})
	})
}
