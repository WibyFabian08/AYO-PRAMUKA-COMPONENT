<script setup>
import { ref, computed, watch } from "vue";
import useClickOutside from "../../extends/helpers/util.clickoutside";

defineOptions({
  name: "MultipleSelect",
});

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: null,
  },
  caption: {
    type: String,
    default: null,
  },
  images: {
    type: String,
    default: null,
  },
  label: { type: String, default: null },
  error: { type: String, default: null },
  note: { type: String, default: null },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["update:modelValue", "handleSelect"]);

const componentRef = ref();
const excludeRef = ref();
const searchQuery = ref("");
const isOpen = ref(false);
const selected = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = [...newValue];
  },
  { deep: true }
);

watch(
  () => props.value,
  (newValue) => {
    selected.value = [...newValue];
  },
  { deep: true }
);

const filteredOptions = computed(() => {
  return props.options.filter(
    (option) =>
      option[props.title] &&
      option[props.title]
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const isSelected = (option) => {
  return selected.value.some((sel) => sel[props.title] === option[props.title]);
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  const selectedIndex = selected.value.findIndex(
    (sel) => sel[props.title] === option[props.title]
  );
  if (selectedIndex === -1) {
    selected.value.push(option);
  } else {
    selected.value.splice(selectedIndex, 1);
  }
  searchQuery.value = "";
  emits("update:modelValue", [...selected.value]);
  emits("handleSelect", [...selected.value]);
};

const handleKeydown = (event) => {
  if (event.key === "Enter" || event.key === "Tab") {
    event.preventDefault();
    if (filteredOptions.value.length > 0) {
      selectOption(filteredOptions.value[0]);
    }
  }
};

const removeSelected = (option) => {
  const index = selected.value.indexOf(option);
  if (index !== -1) {
    selected.value.splice(index, 1);
  }

  emits("update:modelValue", [...selected.value]);
};

useClickOutside(componentRef, () => (isOpen.value = false), excludeRef);
</script>

<template>
  <label
    v-if="label"
    class="block mb-2 text-s text-netral-90 dark:text-netral-40"
    >{{ label }}</label
  >
  <div class="relative w-full">
    <div
      class="flex items-center justify-between w-full py-2 pr-[10px] pl-3 border border-neutral-30 rounded-md cursor-pointer gap-2"
      :class="[error ? 'base-input-error' : 'base-input']"
      ref="excludeRef"
      @click="toggleDropdown"
    >
      <div class="flex flex-wrap items-center flex-1 gap-2">
        <div
          v-for="(item, idx) in selected.slice(0, 2)"
          :key="idx"
          class="flex items-center gap-2 px-2 py-1 rounded bg-netral-30 border-netral-50 min-w-20 max-w-32"
        >
          <span
            class="overflow-hidden font-medium text-neutral-100 text-s text-nowrap text-ellipsis"
            >{{ item[props.title] }}</span
          >
          <i
            class="cursor-pointer ti ti-x text-neutral-100"
            @click.stop="removeSelected(item)"
          ></i>
        </div>
        <div v-if="selected.length === 0" class="font-medium text-s">
          Pilih...
        </div>
      </div>
      <div class="flex items-center justify-end gap-3">
        <div
          v-if="selected && selected.length > 0"
          class="flex items-center gap-2 px-2 py-1 rounded bg-primary-light"
        >
          <span class="text-xs text-netral-100">{{ selected.length }}</span>
        </div>
        <i
          class="ti text-neutral-100"
          :class="isOpen ? 'ti-chevron-up' : 'ti-chevron-down'"
        ></i>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-1 border rounded-md bg-neutral-10 border-neutral-30"
      ref="componentRef"
    >
      <div class="relative w-full">
        <i
          class="absolute transform -translate-y-1/2 ti ti-search top-1/2 left-3 text-netral-100 text-heading-s"
        ></i>
        <input
          type="text"
          v-model="searchQuery"
          @input="filterOptions"
          @keydown="handleKeydown"
          placeholder="Cari..."
          class="w-full py-3 pl-10 pr-3 font-medium text-s rounded-t-md border-netral-40 focus:border-netral-40 focus:ring-0 focus:outline-none"
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
            isSelected(option)
              ? ' hover:bg-netral-30 cursor-pointer bg-primary-light'
              : ' hover:bg-netral-30 cursor-pointer bg-netral-10'
          "
        >
          <div :class="props.images ? 'flex gap-3 items-center' : ''">
            <img
              v-if="props.images"
              :src="option[props.images]"
              :alt="option[props.images]"
              class="object-cover w-10 h-10 rounded-full"
            />
            <div class="flex flex-col gap-y-1">
              <p class="text-s text-netral-100">
                {{ option[props.title] }}
              </p>
              <p v-if="props.caption" class="text-s text-netral-80">
                {{ option[props.caption] }}
              </p>
            </div>
          </div>
          <i v-if="isSelected(option)" class="ti ti-check text-primary"></i>
        </div>
        <div
          v-else
          class="px-3 py-2 font-medium text-center bg-white text-s text-danger"
        >
          Pencarian tidak ditemukan
        </div>
      </div>
    </div>
  </div>
  <p v-if="note" class="text-s text-netral-70">{{ note }}</p>
  <p v-if="error" class="mt-1 text-s text-danger dark:text-danger">
    {{ error }}
  </p>
</template>
