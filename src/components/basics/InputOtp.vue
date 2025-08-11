<script setup>
import { computed, onBeforeUpdate, ref, watch } from 'vue'

defineOptions({
  name: 'InputOtp'
})

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
	inputLength: {
		type: [Number, String],
		default: 6
	}
})

const length = computed(() => props.inputLength)
const fields = ref([])
const fieldValues = ref([])

const composite = computed(() => {
	const nonNullFields = fieldValues.value.filter((value) => value)
	if (length.value !== nonNullFields.length) {
		return ''
	}
	return nonNullFields.join('')
})

watch(composite, () => {
	if (composite.value) {
		emits('update:modelValue', composite.value) // You should emit this value, e.g.
	}
})

const updateFieldRef = (element, index) => {
	if (element) {
		fields.value[index] = element
	}
}

const onFocused = (index) => {
	if (index >= 0) {
		if (index < length.value) {
			fields.value[index].select()
		} else {
			if (composite.value) {
				fields.value[index - 1].blur()
			}
		}
	}
}

const onUpdated = (value, index) => {
	if (value) {
		onFocused(index + 1)
	}
}

const onPasted = (event, index) => {
	event.preventDefault()
	const pastedData = event.clipboardData
		.getData('text/plain')
		.slice(0, props.inputLength - index + 1)
		.split('')
	if (!pastedData.join('').match(/^\d+$/)) return false
	const currentValue = fieldValues.value.slice(0, index)
	const combinedValue = currentValue.concat(pastedData)
	fieldValues.value = combinedValue.slice(0, props.inputLength)
}

const onKeyUp = (event, index) => {
	const key = event.key
	if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(key)) {
		return
	}
	if (['Delete'].includes(key)) {
		return
	}
	if (key === 'ArrowLeft' || key === 'Backspace') {
		onFocused(index - 1)
	} else if (key === 'ArrowRight') {
		onFocused(index + 1)
	}
}

const onKeypress = (event) => {
	event = event ? event : window.event
	var charCode = event.which ? event.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		event.preventDefault()
		return false
	}
	return true
}

onBeforeUpdate(() => {
	fields.value = []
})
</script>

<template>
	<div class="mb-4">
		<div class="flex flex-wrap gap-2">
			<input
				v-for="i in length"
				:key="i"
				:ref="(el) => updateFieldRef(el, i - 1)"
				v-model="fieldValues[i - 1]"
				v-bind="$attrs"
				outlined
				maxlength="1"
				class="text-center bg-netral-10 border border-netral-40 font-medium text-netral-100 text-body rounded-lg focus:ring-primary focus:border-primary block w-[2.5rem] p-3"
				input-class="text-center"
				@keyup="onKeyUp($event, i - 1)"
				@keypress="onKeypress($event)"
				@paste="onPasted($event, i - 1)"
				@update:model-value="onUpdated($event, i - 1)"
			/>
		</div>
	</div>
</template>
