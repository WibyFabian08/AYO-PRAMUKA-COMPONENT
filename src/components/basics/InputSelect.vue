<script setup>
import { ref, computed, watch } from 'vue'
import useClickOutside from '../../extends/helpers/util.clickoutside'

defineOptions({
  name: 'InputSelect'
})

const props = defineProps({
	options: {
		type: Array,
		default: () => []
	},
	title: {
		type: String,
		default: null
	},
	caption: {
		type: String,
		default: null
	},
	images: {
		type: String,
		default: null
	},
	label: { type: String, default: null },
	error: { type: String, default: null },
	note: { type: String, default: null },
	modelValue: {
		type: Object,
		default: () => null
	}
})

const emits = defineEmits(['update:modelValue'])

const componentRef = ref()
const excludeRef = ref()
const selected = ref(props.modelValue)
const searchQuery = ref('')
const isOpen = ref(false)

const filteredOptions = computed(() => {
	if (searchQuery.value === '') {
		return props.options
	} else {
		return props.options.filter((option) => option[props.title].toLowerCase().includes(searchQuery.value.toLowerCase()))
	}
})

const toggleDropdown = () => {
	isOpen.value = !isOpen.value
}

const selectOption = (option) => {
	selected.value = option
	searchQuery.value = ''
	isOpen.value = false
	emits('update:modelValue', option)
}

const handleKeydown = (event) => {
	if (event.key === 'Enter' || event.key === 'Tab') {
		event.preventDefault()
		if (filteredOptions.value.length > 0) {
			selectOption(filteredOptions.value[0])
		}
	}
}

watch(
	() => props.value,
	(newValue) => {
		selected.value = newValue
	}
)

useClickOutside(
	componentRef,
	() => {
		isOpen.value = false
	},
	excludeRef
)
</script>

<template>
	<label v-if="label" class="block mb-2 text-s text-netral-90 dark:text-netral-40">{{ label }}</label>
	<div class="relative w-full">
		<div
			class="flex items-center w-full py-2 pr-[10px] pl-3 border border-netral-30 rounded-md cursor-pointer"
			ref="excludeRef"
			@click="toggleDropdown"
		>
			<div class="w-11/12 outline-none cursor-pointer">
				<p class="overflow-hidden font-medium text-m text-nowrap text-ellipsis" :class="selected ? 'text-netral-100' : 'text-netral-70'">
					{{ selected ? selected[props.title] : 'Pilih' }}
				</p>
			</div>
			<div class="flex justify-end w-1/12">
				<i class="flex-none ti text-netral-100" :class="isOpen ? 'ti-chevron-up' : 'ti-chevron-down'"></i>
			</div>
		</div>
		<div v-if="isOpen" class="absolute z-10 w-full mt-1 border rounded-md bg-netral-10 border-netral-30" ref="componentRef">
			<div class="relative w-full">
				<i class="absolute transform -translate-y-1/2 ti ti-search top-1/2 left-3 text-netral-100 text-heading-s"></i>
				<input
					type="text"
					v-model="searchQuery"
					@input="filterOptions"
					@keydown="handleKeydown"
					placeholder="Cari..."
					class="w-full py-3 pl-10 pr-3 font-medium text-m rounded-t-md border-netral-40 focus:border-netral-40 focus:ring-0 focus:outline-none"
					autofocus
				/>
			</div>
			<div class="overflow-y-auto max-h-60">
				<div
					v-if="filteredOptions.length"
					v-for="(option, index) in filteredOptions"
					:key="index"
					@click="selectOption(option)"
					class="flex justify-between items-center py-2 pr-[10px] pl-3"
					:class="
						selected && option[props.title] === selected[props.title]
							? ' hover:bg-netral-30 cursor-pointer bg-primary-light'
							: ' hover:bg-netral-30 cursor-pointer'
					"
				>
					<div :class="props.images ? 'flex gap-3 items-center' : ''">
						<img v-if="props.images" :src="option[props.images]" :alt="option[props.images]" class="object-cover w-10 h-10 rounded-full" />
						<div class="flex flex-col gap-y-1">
							<p class="text-m text-netral-100">
								{{ option[props.title] }}
							</p>
							<p v-if="props.caption" class="text-s text-netral-80">
								{{ option[props.caption] }}
							</p>
						</div>
					</div>
					<i v-if="selected && option[props.title] === selected[props.title]" class="ti ti-check text-primary"></i>
				</div>
				<div v-else class="px-3 py-2 text-center text-gray-500">Pencarian tidak ditemukan</div>
			</div>
		</div>
	</div>
	<p v-if="note" class="text-s text-netral-70">{{ note }}</p>
	<p v-if="error" class="mt-1 text-s text-danger dark:text-danger">{{ error }}</p>
</template>
