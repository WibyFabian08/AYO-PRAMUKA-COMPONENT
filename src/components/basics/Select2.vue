<script setup>
import { ref, computed, defineExpose } from 'vue'

import Spinner from './Spinner.vue'

defineOptions({
  name: 'Select2'
})

const props = defineProps({
	optionsProps: {
		type: Array,
		default: []
	},
	label: {
		type: String,
		default: ''
	},
	error: {
		type: String,
		default: null
	},
	selected: {
		type: Object,
		default: null
	},
	placeholder: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['handleSelect', 'clear'])

const searchTerm = ref(props.selected ? props.selected.name : '')
const isOptionsExpanded = ref(false)

const selectedOption = ref(props.selected ? props.selected : null)

const filterOptions = () => {
	isOptionsExpanded.value = true
}

const selectOption = (option) => {
	selectedOption.value = option.name
	isOptionsExpanded.value = false
	searchTerm.value = option.name
	emit('handleSelect', option)
}

const deleteSelect = () => {
	searchTerm.value = ''
	selectedOption.value = null
	emit('clear')
}

const handleValidationClear = () => {
	if (props.optionsProps.filter((option) => option?.name?.toLowerCase().includes(searchTerm?.value?.toLowerCase())).length === 0) {
		deleteSelect()
	}
}

const filteredOptions = computed(() => {
	return props.optionsProps.filter((option) => option?.name?.toLowerCase().includes(searchTerm?.value?.toLowerCase()))
})

const handleFocus = () => {
	isOptionsExpanded.value = true
}

const handleBlur = () => {
	isOptionsExpanded.value = false
}

defineExpose({
	deleteSelect
})
</script>

<template>
	<div class="relative w-full">
		<label class="block mb-2 text-m text-netral-90 dark:text-netral-40" v-if="label">{{ label }}</label>
		<div class="relative" @focusout="handleBlur">
			<input
				v-model="searchTerm"
				@input="filterOptions"
				@focus="handleFocus"
				@change="handleValidationClear"
				type="text"
				class="w-full p-3 font-medium border rounded-lg bg-netral-10 border-netral-40 dark:border-netral-80 dark:bg-netral-100 text-netral-100 text-s focus:ring-primary dark:focus:ring-netral-80 focus:border-primary dark:focus:border-netral-80 dark:placeholder:text-netral-10 dark:text-netral-10"
				:placeholder="placeholder"
			/>
			<div v-if="loading" class="absolute top-[10px] right-0">
				<Spinner />
			</div>
			<i
				v-if="selectedOption !== null && !disabled"
				class="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2 ti ti-x"
				@click="deleteSelect"
			></i>
			<ul
				v-show="isOptionsExpanded && filteredOptions.length > 0"
				class="absolute left-0 right-0 z-50 mt-1 overflow-auto bg-white divide-y rounded-lg shadow-lg dark:bg-netral-100 max-h-32 scrollable"
			>
				<li
					v-for="(option, index) in filteredOptions"
					:key="index"
					class="px-3 py-2 transition-colors duration-300 cursor-pointer text-s dark:text-white text-netral-80 hover:bg-gray-200 dark:hover:bg-primary-dark"
					@mousedown.prevent="selectOption(option)"
				>
					{{ option.name }}
				</li>
			</ul>
		</div>
		<p v-if="error" class="mt-1 text-s text-danger dark:text-danger">{{ error }}</p>
	</div>
</template>

<style>
.scrollable::-webkit-scrollbar {
	width: 5px;
}
.scrollable::-webkit-scrollbar-track {
	background-color: #eee;
}
.scrollable::-webkit-scrollbar-thumb {
	background-color: rgb(138, 133, 133);
}
</style>
