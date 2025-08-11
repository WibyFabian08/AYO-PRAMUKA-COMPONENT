<script setup>
import { ref, onUnmounted, computed } from 'vue'

defineOptions({
  name: 'ImageView'
})

const isLoaded = ref(false)
const isError = ref(false)
const showPreview = ref(false)
const defaultImage = ref('https://media.giphy.com/media/ycfHiJV6WZnQDFjSWH/giphy.gif')
const noImage = ref('https://gethome.ge//assets/frontend/img/no-image-800x511.png')

const loader = computed(() => {
	return `background-image: url("${defaultImage.value}"); background-repeat:no-repeat; background-position: center center; background-size: cover;`
})

const loaded = () => {
	isLoaded.value = true
}

const togglePreview = () => {
	showPreview.value = !showPreview.value
}

const handleError = () => {
	isError.value = true
}

const props = defineProps({
	imageUrl: {
		type: String,
		default: '',
		required: true
	},
	canPreview: {
		type: Boolean,
		default: true
	}
})

onUnmounted(() => {
	isLoaded.value = false
})
</script>

<template>
	<div class="relative w-full h-full">
		<img
			@click="togglePreview"
			:class="{
				'object-contain border dark:border-netral-50 rounded-lg object-center w-full h-full cursor-pointer': isError,
				'object-cover object-center w-full h-full cursor-pointer': !isError
			}"
			:style="!isLoaded ? loader : ''"
			:src="isError ? noImage : imageUrl"
			@error="handleError"
			@load="loaded"
		/>

		<transition name="preview-wrapper" appear>
			<div
				v-if="showPreview && canPreview"
				@click.self="togglePreview"
				class="fixed inset-0 flex items-center justify-center"
				style="z-index: 9999; background-color: rgba(0, 0, 0, 0.6)"
			>
				<div class="h-auto overflow-hidden w-96 rounded-xl">
					<img
						:class="{
							'object-contain rounded-lg object-center w-full h-full cursor-pointer': isError,
							'object-cover object-center w-full h-full cursor-pointer': !isError
						}"
						v-show="isLoaded"
						:src="isError ? noImage : imageUrl"
						@error="handleError"
						@load="loaded"
					/>
				</div>
			</div>
		</transition>
	</div>
</template>

<style>
.preview-wrapper-enter-from {
	opacity: 0;
}

.preview-wrapper-enter-to {
	opacity: 1;
}

.preview-wrapper-enter-active {
	transition: all 0.5s ease-in-out;
}

.preview-wrapper-leave-from {
	opacity: 1;
}

.preview-wrapper-leave-to {
	opacity: 0;
}

.preview-wrapper-leave-active {
	transition: all 0.5s ease-in-out;
}
</style>
