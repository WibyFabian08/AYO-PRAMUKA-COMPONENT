<script setup>
import { ref, watch } from 'vue'

defineOptions({
  name: 'Select'
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
	disabled: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['handleSelect'])

const isOptionsExpanded = ref(false)
const selectedOption = ref(props.selected ? props.selected.name : props.optionsProps[0].name)

watch(() => {
	selectedOption.value = props.selected ? props.selected.name : props.optionsProps[0].name
})

const setOption = (option) => {
	selectedOption.value = option.name
	isOptionsExpanded.value = false

	emit('handleSelect', option)
}

const toggleOptions = () => {
	if (props.disabled === false) {
		isOptionsExpanded.value = !isOptionsExpanded.value
	}
}
</script>

<template>
	<div class="relative w-full" :class="disabled === true ? 'opacity-[0.6]' : ''">
		<label v-if="label.length > 0" class="block mb-2 text-m text-netral-90 dark:text-netral-40">{{ label }}</label>
		<button
			type="button"
			class="flex items-center justify-between gap-3 w-full px-4 py-[13px] font-medium border rounded-lg bg-transparent border-netral-40 dark:border-netral-80 dark:bg-netral-100 text-netral-100 text-s focus:ring-primary dark:focus:ring-netral-80 focus:border-primary dark:focus:border-netral-80 dark:placeholder:text-netral-10 dark:text-netral-10"
			@click="toggleOptions"
			@blur="isOptionsExpanded = false"
		>
			<span class="truncate">{{ selectedOption }}</span>
			<svg
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="w-4 h-4 transition-transform duration-200 ease-in-out transform text-netral-80"
				:class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<transition
			class="absolute"
			enter-active-class="transition duration-500 transform ease-custom"
			enter-class="scale-y-0 -translate-y-1/2 opacity-0"
			enter-to-class="scale-y-100 translate-y-0 opacity-100"
			leave-active-class="transition duration-300 transform ease-custom"
			leave-class="scale-y-100 translate-y-0 opacity-100"
			leave-to-class="scale-y-0 -translate-y-1/2 opacity-0"
		>
			<ul
				v-show="isOptionsExpanded"
				class="absolute left-0 right-0 z-[99999] overflow-auto bg-white rounded-lg shadow-lg dark:bg-netral-100 max-h-[160px] select-wrapper"
			>
				<li
					v-for="(option, index) in optionsProps"
					:key="index"
					class="w-full px-3 py-2 transition-colors duration-300 cursor-pointer text-s dark:text-white text-netral-80 hover:bg-gray-200 dark:hover:bg-primary-dark"
					@mousedown.prevent="setOption(option)"
				>
					<p class="truncate text-ellipsis">
						{{ option.name }}
					</p>
				</li>
			</ul>
		</transition>
		<p v-if="error" class="mt-1 text-s text-danger dark:text-danger">{{ error }}</p>
	</div>
</template>

<style>
.ease-custom {
	transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}

.select-wrapper::-webkit-scrollbar {
	width: 5px;
}

.select-wrapper::-webkit-scrollbar-track {
	background-color: #eee;
}

.select-wrapper::-webkit-scrollbar-thumb {
	background-color: rgb(138, 133, 133);
}
</style>
