<script setup>
import { ref, watch } from 'vue'
import { useDropzone } from 'vue3-dropzone'
import Swal from 'sweetalert2'

defineOptions({
  name: 'UploadFile'
})

const props = defineProps({
	defaultFile: {
		type: String,
		default: null
	},
	modelValue: {
		type: Array,
		default: () => []
	},
	maxSize: {
		type: Number,
		default: 2000000
	},
	maxFiles: {
		type: Number,
		default: 5
	}
})

const file = ref([...props.modelValue])

const maxFileSizeMB = (props.maxSize / 1000 / 1000).toFixed(2)

const emits = defineEmits(['update:modelValue'])

const dropzone = useDropzone({
	accept: '.pdf,image/jpg,image/jpeg,image/png',
	maxSize: props.maxSize,
	multiple: true,
	maxFiles: props.maxFiles,
	onDrop: (acceptFiles, rejectReasons) => {
		handleDrop(acceptFiles, rejectReasons)
	}
})

const handleDrop = (acceptFiles, rejectReasons) => {
	if (rejectReasons.length > 0) {
		rejectReasons.forEach((element) => {
			if (element?.errors?.some((e) => e.code === 'file-too-large')) {
				showAlert('Error', 'Maksimal Ukuran Lampiran ' + maxFileSizeMB + ' MB', 'error')
			}
			if (element?.errors?.some((e) => e.code === 'too-many-files')) {
				showAlert('Error', 'Hanya Boleh Mengunggah Maksimal ' + props.maxFiles + ' Lampiran', 'error')
			}
		})
	} else {
		if (file.value.length + acceptFiles.length <= props.maxFiles) {
			file.value.push(...acceptFiles)
			emits('update:modelValue', file.value)
		} else {
			showAlert('Error', 'Maksimal ' + props.maxFiles + ' Lampiran', 'error')
		}
	}
}

const formatFileSize = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 MB'
	const mb = 1024 * 1024
	const dm = decimals < 0 ? 0 : decimals
	return (bytes / mb).toFixed(dm) + ' MB'
}

const showAlert = (title, text, icon) => {
	Swal.fire({
		title,
		text,
		icon,
		iconColor: '#8E4AA1',
		showConfirmButton: false,
		timer: 1500
	})
}

const removeFile = (index) => {
	file.value.splice(index, 1)
	emits('update:modelValue', file.value)
}

watch(
	() => props.modelValue,
	(newFiles, oldFiles) => {
		if (newFiles !== oldFiles) {
			file.value = [...newFiles]
		}
	}
)
</script>

<template>
	<div class="w-full">
		<div v-if="defaultFile" class="flex items-center px-3 py-2 mb-1 rounded bg-primary-light">
			<div class="flex items-center justify-between w-full">
				<div class="flex items-center gap-2">
					<i class="ti ti-file"></i>
					<p class="m-0 text-left text-primary">File telah diunggah</p>
					<a :href="defaultFile" class="m-0 text-primary" target="_blank">Tinjau</a>
				</div>
			</div>
		</div>
		<div class="w-full border border-dashed rounded-lg border-primary">
			<div v-bind="dropzone.getRootProps()" class="p-3 min-h-12">
				<input v-bind="dropzone.getInputProps()" />
				<div class="flex">
					<div class="flex items-center flex-1 gap-3">
						<div class="p-3 rounded-md bg-primary-light">
							<i class="ti ti-file-filled text-primary text-[24px]"></i>
						</div>
						<div class="flex flex-col">
							<p class="font-semibold text-m text-netral-100">Tarik kesini atau unggah file</p>
							<p class="text-s text-netral-80">Ukuran file maksimum {{ maxFileSizeMB }} MB</p>
						</div>
					</div>
					<div class="self-center text-center">
						<button class="button button-primary">Pilih File</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full mt-2">
		<div class="col-12">
			<div v-for="(data, index) in file" :key="index" class="py-1 mb-2 border rounded-lg bg-netral-10 border-netral-40">
				<div class="flex items-center justify-between gap-2 px-3 py-2 rounded">
					<a :href="data.imagePath" class="flex items-center gap-[15px] overflow-hidden" target="_blank">
						<div class="p-2 rounded-md bg-primary-light">
							<i class="ti ti-file-filled text-primary text-[20px]"></i>
						</div>
						<p class="overflow-hidden font-semibold text-start text-netral-100 text-m whitespace-nowrap overflow-ellipsis">
							{{ data.name }}
						</p>
					</a>
					<div class="flex items-center gap-3">
						<p class="ml-auto text-s text-netral-70 whitespace-nowrap">{{ formatFileSize(data.size) }}</p>
						<button class="text-netral-50" @click="removeFile(index)">
							<i class="ti ti-x"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
