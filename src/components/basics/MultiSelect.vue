<script setup>
import { ref, watch } from "vue";
import { IconSquareCheckFilled } from "@tabler/icons-vue";

defineOptions({
  name: "MultiSelect",
});

const props = defineProps({
  optionsProps: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: null,
  },
  selected: {
    type: Array,
    default: [],
  },
  renderedOption: {
    type: String,
    default: "name",
  },
  berulang: {
    type: String,
    default: "Harian",
  },
});

const emit = defineEmits(["handleSelect", "update:selected"]);

const isOptionsExpanded = ref(false);
const selectedList = ref([]);

const setOption = (option) => {
  let filtered = selectedList.value.some(
    (res) => res[props.renderedOption] === option[props.renderedOption]
  );
  if (filtered === false) {
    selectedList.value.push(option);
  } else {
    let filter = selectedList.value.filter(
      (item) => item[props.renderedOption] !== option[props.renderedOption]
    );
    selectedList.value = filter;
  }

  emit("update:selected", selectedList.value);
  emit("handleSelect", selectedList.value);
};

const filteredList = (val) => {
  let filtered = selectedList.value.some(
    (res) => res[props.renderedOption] === val[props.renderedOption]
  );
  if (filtered === false) {
    return false;
  } else {
    return true;
  }
};

const handleBlur = () => {
  isOptionsExpanded.value = false;
  emit("update:selected", selectedList.value);
  emit("handleSelect", selectedList.value);
};

watch(
  () => [props.selected],
  ([list]) => {
    if (Array.isArray(list)) {
      selectedList.value = list;
    } else {
      selectedList.value = [];
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-show="berulang === 'Harian'" class="relative w-full">
    <label class="mb-1 font-semibold form-label text-s text-netral-100">{{
      label
    }}</label>
    <button
      type="button"
      class="flex items-center justify-between w-full font-medium border rounded-lg dark:border-netral-80 dark:bg-netral-100 text-netral-100 text-s focus:ring-primary dark:focus:ring-netral-80 focus:border-primary dark:focus:border-netral-80 dark:placeholder:text-netral-10 dark:text-netral-10"
      :class="[error ? 'base-input-error' : 'base-input']"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="handleBlur"
    >
      <span class="truncate">({{ selected?.length }}) terpilih</span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-4 h-4 transition-transform duration-200 ease-in-out transform text-netral-80"
        :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <transition
      class="absolute"
      enter-active-class="transition duration-500 transform ease-custom"
      enter-class="scale-y-0 -translate-y-1/2 opacity-0"
      enter-to-class="scale-y-100 translate-y-0 opacity-100"
      leave-active-class="transition duration-300 transform ease-custom"
      leave-class="scale-y-100 translate-y-0 opacity-100"
      leave-to-class="scale-y-0 -translate-y-1/2 opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="absolute left-0 right-0 z-[99999] overflow-auto bg-white rounded-lg shadow-lg dark:bg-netral-100 max-h-[160px] select-wrapper"
      >
        <li
          v-for="(option, index) in optionsProps"
          :key="index"
          class="flex items-center justify-between w-full px-3 py-2 transition-colors duration-300 cursor-pointer text-s dark:text-white text-netral-80 hover:bg-gray-200 dark:hover:bg-primary-dark"
          @mousedown.prevent="setOption(option)"
        >
          <p class="font-medium line-clamp-1 text-netral-100">
            {{ option[renderedOption] }}
          </p>
          <IconSquareCheckFilled
            v-if="filteredList(option)"
            :size="16"
            class="text-primary"
          />
        </li>
      </ul>
    </transition>
    <p v-if="error" class="mt-1 text-s text-danger dark:text-danger">
      {{ error }}
    </p>
  </div>
</template>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}

.select-wrapper::-webkit-scrollbar {
  width: 5px;
}

.select-wrapper::-webkit-scrollbar-track {
  background-color: #eee;
}

.select-wrapper::-webkit-scrollbar-thumb {
  background-color: rgb(138, 133, 133);
}
</style>
