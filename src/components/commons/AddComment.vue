<template>
	<div class="mb-4 border border-netral-30 py-[13px] px-[22px] card">
		<div class="flex gap-4">
			<div class="flex flex-col flex-1">
				<div v-if="previewImages?.length > 0" class="flex flex-wrap bg-netral-20 px-6 py-[18px] mt-4">
					<div v-for="(preview, index) in previewImages" :key="index" class="relative p-2 w-36">
						<div
							class="absolute flex items-center justify-center rounded-full cursor-pointer top-1 right-1 bg-netral-100 w-7 h-7 bg-opacity-80"
							@click="deleteImage(index)"
						>
							<i class="text-white ti ti-x" style="font-size: 0.75rem"></i>
						</div>
						<img :src="preview" alt="Image Preview" class="object-cover w-full rounded h-36" />
					</div>
				</div>
				<textarea
					id="message"
					class="block w-full h-10 border-none text-body-medium text-netral-100 dark:placeholder:text-netral-10 dark:text-netral-10 dark:bg-netral-100 focus:border-none focus:ring-0"
					placeholder="Apa yang sedang Anda pikirkan?"
					v-model="input"
				></textarea>

				<div class="flex items-center justify-between mt-2">
					<div class="flex gap-4 text-primary dark:text-primary-dark">
						<input type="file" hidden ref="imageInput" accept="image/png, image/gif, image/jpeg, image/jpg" @change="handleImageChange" multiple />
						<button @click="handleClickImageInput">
							<i class="ti ti-photo" style="font-size: 1.25rem"></i>
						</button>
						<div class="relative">
							<div class="absolute bottom-8 z-[1]" ref="componentRef">
								<EmojiPicker v-if="showEmoji" :native="true" @select="onSelectEmoji" />
							</div>
							<button type="button" @click="toggleEmoji" ref="excludeRef">
								<i class="ti ti-mood-smile" style="font-size: 1.25rem"></i>
							</button>
						</div>
					</div>
					<button class="button-primary" @click.prevent="handleSend" :disabled="!input || loading">Posting</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import useClickOutside from '../../extends/helpers/util.clickoutside'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const imageInput = ref(null)
const input = ref('')
const showEmoji = ref(false)
const componentRef = ref()
const excludeRef = ref()
const previewImages = ref([])
const loading = ref(false)

const { profile } = defineProps({
	profile: Object
})
const emit = defineEmits(['postFeed'])

const handleImageChange = () => {
	const files = imageInput.value.files
	if (!files || files.length === 0) {
		return
	}
	const maxSizeInKB = 5120 // 5120KB = 5MB
	if (previewImages.value.length + files.length > 5) {
		return
	}
	const fileReaders = []
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		if (file.size > maxSizeInKB * 1024) {
			continue
		}
		const fileReader = new FileReader()
		fileReader.onload = () => {
			previewImages.value.push(fileReader.result)
		}
		fileReaders.push(fileReader)
		fileReaders[i].readAsDataURL(file)
	}
}

const deleteImage = (index) => {
	previewImages.value.splice(index, 1)
}

const handleClickImageInput = () => {
	imageInput.value.click()
}

const onSelectEmoji = (emoji) => {
	input.value += emoji?.i
}

const toggleEmoji = () => {
	showEmoji.value = !showEmoji.value
}

useClickOutside(
	componentRef,
	() => {
		showEmoji.value = false
	},
	excludeRef
)
</script>

<style scoped></style>
