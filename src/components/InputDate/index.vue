<script setup>
const emit = defineEmits(["update:value", "handleChange"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const handleInput = (e) => {
  emit("update:value", e.target.value);
  emit("handleChange", e.target.value);
};
</script>

<template>
  <div class="w-full">
    <label
      class="mb-1 font-semibold text-s form-label text-neutral-900"
      v-if="label"
      >{{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <input
      type="date"
      @change="handleInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
      class="border outline-none text-s disabled:bg-netral-30 disabled:border-netral-50 disabled:cursor-not-allowed focus:ring-0 focus:outline-none active:ring-0 active:outline-none border-netral-30 active:border-netral-30 focus:border-netral-30"
      :class="[error ? 'base-input-error' : 'base-input']"
    />
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>

<style scoped></style>
