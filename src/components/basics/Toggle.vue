<script setup>
import { ref, watch } from 'vue'

defineOptions({
  name: 'Toggle'
})

const props = defineProps({
	value: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
		default: null
	},
	index: {
		type: Number,
		default: null
	},
	isDisabled: {
		type: Boolean,
		default: false
	}
})

const isActive = ref(props.value)
const bufferData = ref(props.data)

watch(isActive, (val) => {
	isActive.value = val
})

const emit = defineEmits(['handleToggle'])

const handleToggle = (data) => {
	bufferData.value = {
		...data,
		is_active: isActive.value,
		index: props.index
	}
	emit('handleToggle', bufferData.value)
}
</script>

<template>
	<div class="flex items-center justify-center gap-2">
		<span class="text-s font-medium text-netral-100 ms-3 dark:text-netral-30">{{ isActive ? 'Aktif' : 'Tidak Aktif' }}</span>
		<label class="relative inline-flex items-center cursor-pointer">
			<input :disabled="isDisabled" @change="handleToggle(data)" type="checkbox" v-model="isActive" :checked="isActive" class="sr-only peer" />
			<div
				class="w-11 h-6 bg-netral-20 peer-focus:outline-none rounded-full peer dark:bg-netral-90 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-netral-10 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-netral-10 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-netral-70 peer-checked:bg-primary"
			></div>
		</label>
	</div>
</template>
