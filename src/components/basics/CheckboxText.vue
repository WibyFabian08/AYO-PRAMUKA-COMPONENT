<script setup>
import { ref, watch } from "vue";

defineOptions({
  name: "Checkbox",
});

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: {},
  },
  value: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: null,
  },
  idDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleCheck"]);

const isChecked = ref(props.value);
const bufferData = ref(props.data);

watch(isChecked, (val) => {
  isChecked.value = val;
});

watch(
  () => props.value,
  (val) => {
    isChecked.value = val;
  }
);

const handleCheck = (data) => {
  emit("handleCheck", data);
};
</script>

<template>
  <div class="inline-flex items-center justify-center gap-2">
    <input
      :disabled="idDisabled"
      :id="data.id"
      type="checkbox"
      :checked="isChecked"
      v-model="isChecked"
      @change="handleCheck(isChecked)"
      class="w-5 h-5 rounded bg-netral-10 border-primary text-primary focus:ring-primary dark:focus:ring-primary dark:ring-offset-netral-90 focus:ring-2 dark:bg-netral-80 dark:border-netral-60"
    />
    <label
      v-if="label.length > 0"
      :for="data.id"
      class="font-medium text-s text-netral-100 dark:text-netral-30"
      >{{ label }}</label
    >
  </div>
</template>
