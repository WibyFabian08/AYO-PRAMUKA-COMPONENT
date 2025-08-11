<script setup>
const emit = defineEmits(["update:value", "handleInput", "handleKeyup"]);
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
  iconLeft: {
    type: Boolean,
    default: false,
  },
  iconRight: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autoComplete: {
    type: String,
    default: "off",
  },
  textTransform: {
    type: String,
    default: "normal",
  },
});

const handleInput = (e) => {
  let val = e.target.value;

  if (props.textTransform === "uppercase") {
    val = val.toUpperCase();
    e.target.value = val;
  }
  emit("update:value", val);
  emit("handleInput", val);
};

const handleKeyup = () => {
  emit("handleKeyup");
};
</script>

<template>
  <div class="w-full">
    <label
      class="mb-1 font-semibold form-label text-s text-neutral-900"
      v-if="label"
      >{{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <div class="relative">
      <div
        v-if="iconLeft"
        class="absolute inset-y-0 flex items-center start-0 ps-2"
      >
        <slot name="iconLeft" />
      </div>
      <input
        type="text"
        @input="handleInput"
        @keyup="handleKeyup"
        :autoComplete="autoComplete"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        class="outline-none text-s disabled:bg-netral-30 disabled:border-netral-50 disabled:cursor-not-allowed"
        :class="[
          error ? 'base-input-error' : 'base-input',
          iconLeft ? 'ps-10' : iconRight ? 'pe-10' : '',
        ]"
      />

      <div
        v-if="iconRight"
        class="absolute inset-y-0 flex items-center end-0 pe-2"
      >
        <slot name="iconRight" />
      </div>
    </div>
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>

<style scoped></style>
