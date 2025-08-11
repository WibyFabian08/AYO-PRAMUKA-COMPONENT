<script setup>
import Spinner from "./Spinner.vue";
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  buttonType: {
    type: String,
    default: "primary",
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  emit("handleClick");
};
</script>

<template>
  <button
    v-if="buttonType === 'primary'"
    @click="handleClick"
    :type="type"
    :disabled="loading || isDisabled"
    class="flex items-center justify-center gap-1 text-white transition-all duration-150 cursor-pointer text-s bg-primary hover:opacity-80 disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
    :class="`${iconOnly ? 'px-2 py-2 rounded-md' : 'px-4 py-2 rounded-lg'} ${className}`"
  >
    <slot> Button </slot>
    <Spinner v-if="loading" />
  </button>

  <button
    v-if="buttonType === 'success'"
    @click="handleClick"
    :type="type"
    :disabled="loading || isDisabled"
    class="flex items-center justify-center gap-1 text-white transition-all duration-150 cursor-pointer text-s bg-success hover:opacity-80 disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
    :class="`${iconOnly ? 'px-2 py-2 rounded-md' : 'px-4 py-2 rounded-lg'} ${className}`"
  >
    <slot> Button </slot>
    <Spinner v-if="loading" />
  </button>

  <button
    v-if="buttonType === 'danger'"
    @click="handleClick"
    :type="type"
    :class="`${iconOnly ? 'px-2 py-2 rounded-md' : 'px-4 py-2 rounded-lg'} ${className}`"
    :disabled="loading || isDisabled"
    class="flex items-center justify-center gap-1 text-white transition-all duration-150 cursor-pointer text-s bg-danger hover:opacity-80 disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
  >
    <slot> Button </slot>
    <Spinner v-if="loading" />
  </button>

  <button
    v-if="buttonType === 'outline'"
    @click="handleClick"
    :class="`${iconOnly ? 'px-2 py-2 rounded-md' : 'px-4 py-2 rounded-lg'} ${className}`"
    :type="type"
    :disabled="loading || isDisabled"
    class="flex items-center justify-center gap-1 bg-white border cursor-pointer text-s border-primary disabled:bg-netral-10 text-primary disabled:border-primary disabled:cursor-not-allowed"
  >
    <slot> Button </slot>
    <Spinner v-if="loading" />
  </button>
</template>
