<script setup>
import { IconEye, IconEyeOff } from "@tabler/icons-vue";
import { ref } from "vue";
const showPassword = ref(true);
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
});

const handleInput = (e) => {
  emit("update:value", e.target.value);
  emit("handleInput", e.target.value);
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
        :type="showPassword ? 'password' : 'text'"
        @input="handleInput"
        @keyup="handleKeyup"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        class="outline-none text-s disabled:bg-netral-30 disabled:border-netral-50 disabled:cursor-not-allowed"
        :class="[
          error ? 'base-input-error' : 'base-input',
          iconLeft ? 'ps-10' : iconRight ? 'pe-10' : '',
        ]"
      />

      <div class="absolute inset-y-0 flex items-center end-0 pe-2">
        <button @click="showPassword = !showPassword">
          <IconEye v-if="showPassword" />
          <IconEyeOff v-else />
        </button>
      </div>
    </div>
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>

<style scoped></style>
