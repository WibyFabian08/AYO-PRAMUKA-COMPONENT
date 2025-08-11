<script setup>
defineOptions({
  name: 'InputText'
})

const props = defineProps({
	label: { type: String, default: null },
	type: { type: String, default: 'text' },
	placeholder: { type: String, default: '' },
	iconLeft: { type: Boolean, default: false },
	iconRight: { type: Boolean, default: false },
	error: { type: String, default: null },
	note: { type: String, default: null },
	className: { type: String, default: '' },
	readOnly: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	modelValue: { type: [String, Number], default: null },
	minLength: { type: String, default: '0' },
	maxLength: { type: String, default: '10000000000000000' },
	min: { type: Number, default: 0 },
	inputType: {
		type: String,
		default: 'text'
	},
	id: {
		type: String,
		default: 'text'
	},
	inputMode: {
		type: String,
		default: 'text'
	},
	autoComplete: {
		type: String,
		default: 'on'
	}
})

const emit = defineEmits(['update:modelValue', 'handleEnter', 'onBlur', 'onPress', 'onKeyUp'])
const onInput = (event) => {
	emit('update:modelValue', event.target.value)
}
const onChange = (event) => {
	emit('update:modelValue', event.target.value)
}

const onEnter = (e) => {
	emit('handleEnter', e)
}

const onBlur = (e) => {
	emit('onBlur', e)
}

const onKeyUp = (e) => {
	emit('onKeyUp', e)
}

const onKeyPress = (e) => {
	if (props.inputMode === 'numeric') {
		NumbersOnly(e)
	}
}
const NumbersOnly = (evt) => {
	evt = evt ? evt : window.event
	var charCode = evt.which ? evt.which : evt.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
		evt.preventDefault()
	} else {
		return true
	}
}
</script>

<template>
	<div :class="className" v-if="inputType === 'text'">
		<label v-if="label" class="block mb-2 text-s text-netral-90 dark:text-netral-40">{{ label }}</label>
		<div class="relative">
			<div v-if="iconLeft" class="absolute inset-y-0 start-0 flex items-center ps-3.5">
				<slot name="iconLeft" />
			</div>
			<input
				:value="modelValue"
				:type="type"
				:inputmode="inputMode"
				class="base-input"
				:class="iconLeft ? 'ps-10' : iconRight ? 'pe-10' : ''"
				:placeholder="placeholder"
				:readonly="readOnly"
				:disabled="disabled"
				:minlength="minLength"
				:maxlength="maxLength"
				@input="onInput"
				@change="onChange"
				@keyup="onKeyUp"
				@keyup.enter="onEnter"
				@keypress="onKeyPress"
				@blur="onBlur"
				:id="id"
				:min="min"
				:autocomplete="autoComplete"
			/>
			<div type="submit" v-if="iconRight" class="absolute inset-y-0 end-0 flex items-center pe-3.5">
				<slot name="iconRight" />
			</div>
		</div>
		<p v-if="note" class="text-s text-netral-70">{{ note }}</p>
		<p v-if="error" class="mt-1 text-s text-danger dark:text-danger">{{ error }}</p>
	</div>

	<div :class="className" v-if="inputType === 'text-area'">
		<label v-if="label" class="block mb-2 text-s text-netral-90 dark:text-netral-40">{{ label }}</label>
		<div class="relative">
			<div v-if="iconLeft" class="absolute inset-y-0 start-0 flex items-center ps-3.5 dark:text-netral-10">
				<slot name="iconLeft" />
			</div>
			<textarea
				:value="modelValue"
				:type="type"
				class="base-input"
				:class="iconLeft ? 'ps-10' : iconRight ? 'pe-10' : ''"
				:placeholder="placeholder"
				:readonly="readOnly"
				:disabled="disabled"
				:minlength="minLength"
				:maxlength="maxLength"
				@input="onInput"
				@change="onChange"
				@keyup.enter="onEnter"
				@blur="onBlur"
				:id="id"
				:min="min"
			/>
			<div type="submit" v-if="iconRight" class="absolute inset-y-0 end-0 flex items-center pe-3.5 dark:text-netral-10">
				<slot name="iconRight" />
			</div>
		</div>
		<p v-if="error" class="mt-1 text-s text-danger dark:text-danger">{{ error }}</p>
	</div>
</template>
