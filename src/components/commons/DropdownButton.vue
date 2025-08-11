<script setup>
import { onMounted, ref, useSlots } from "vue";
import { Dropdown } from "flowbite";

import Button from "./Button.vue";

const props = defineProps({
  className: {
    type: String,
    default:
      "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700",
  },
  id: {
    type: String,
    default: "dropdownDefaultButton",
  },
  isFull: {
    type: Boolean,
    default: false,
  },
  isPersist: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const buttonSlot = !!slots.button;

const dropdownRef = ref(null);
const toggleRef = ref(null);
let dropdownInstance = null;

const handleClose = () => {
  if (dropdownRef.value && toggleRef.value) {
    dropdownInstance = new Dropdown(dropdownRef.value, toggleRef.value);
  }

  if (dropdownRef.value) {
    dropdownRef.value.querySelectorAll("a, button, li").forEach((el) => {
      el.addEventListener("click", () => {
        dropdownInstance?.hide();
      });
    });
  }

  dropdownRef.value = null;
  toggleRef.value = null;
};

defineExpose({
  handleClose,
});

onMounted(() => {
  if (!props.isPersist) {
    handleClose();
  }
});
</script>

<template>
  <button
    :class="`${isFull ? 'w-full' : ''}`"
    ref="toggleRef"
    :id="id"
    :data-dropdown-toggle="`dropdown-${id}`"
    type="button"
  >
    <Button v-if="!buttonSlot">Dropdown</Button>
    <slot v-else name="button" />
  </button>

  <div
    :id="`dropdown-${id}`"
    ref="dropdownRef"
    :class="className"
    :aria-labelledby="id"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
      <slot name="content" />
    </ul>
  </div>
</template>
