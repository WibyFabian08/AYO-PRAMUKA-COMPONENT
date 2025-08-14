<script>
import { debounce } from "@/config/common";
import { IconChevronDown, IconFilter } from "@tabler/icons-vue";

export default {
  components: {
    IconChevronDown,
    IconFilter,
  },
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
      selectedItem: null,
      selectedIndex: -1,
      hoveredIndex: -1,
      isFocused: false,
    };
  },
  emits: ["handleSelect", "handleSearch", 'update:value'],
  props: {
    options: {
      type: Array,
      default: [],
    },
    renderOption: {
      type: String,
      default: "name",
    },
    label: {
      type: String,
      default: "Pilih Item",
    },
    placeholder: {
      type: String,
      default: "Cari anggota",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    customSearch: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
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
    isFilter: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function (val) {
      if (val) {
        this.searchQuery = val[this.renderOption];
      } else {
        this.searchQuery = ''
      }
    },
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
        option[this.renderOption]
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch() {
      if (this.customSearch) {
        debounce(() => {
          this.$emit("handleSearch", this.searchQuery);
        }, 300)();
      }
    },
    handleSelect(data) {
      this.$emit('update:value', data)
      this.$emit("handleSelect", data);
    },
    handleFocus() {
      this.searchQuery = "";
      this.handleSelect(null);
      this.isFocused = true;
      this.showDropdown = true;
    },
    handleBlur() {
      setTimeout(() => {
        this.isFocused = false;
        this.showDropdown = false;
      }, 200);
    },
    handleEsc() {
      setTimeout(() => {
        this.searchQuery = "";
        this.isFocused = false;
        this.showDropdown = false;
        this.handleSelect(null);
      }, 200);
    },
    selectItem(option) {
      this.selectedItem = option;
      this.searchQuery = option[this.renderOption];
      this.showDropdown = false;
      this.selectedIndex = -1;

      this.handleSelect(option);
    },
    moveDown() {
      if (this.selectedIndex < this.options.length - 1) {
        this.selectedIndex++;
      }
    },
    moveUp() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    selectItemFromKeyboard() {
      if (this.selectedIndex >= 0 && this.selectedIndex < this.options.length) {
        this.selectItem(this.options[this.selectedIndex]);
      }
    },
  },
};
</script>

<template>
  <div class="w-full">
    <label class="mb-1 font-semibold form-label text-s text-netral-100"
      >{{ label }} <span class="text-danger" v-if="required">*</span>
    </label>
    <div class="select-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down="moveDown"
        @keydown.up="moveUp"
        @keydown.enter="selectItemFromKeyboard"
        @keydown.esc="handleEsc"
        :placeholder="placeholder"
        class="border outline-none text-s disabled:bg-netral-30 disabled:border-netral-50 disabled:cursor-not-allowed focus:ring-0 focus:outline-none active:ring-0 active:outline-none border-netral-30 active:border-netral-30 focus:border-netral-30"
        :class="`${error ? 'base-input-error' : 'base-input'}`"
        :disabled="disabled"
      />
      <div class="arrow-container" :class="{ focused: isFocused && !isFilter }">
        <IconFilter :size="15" :color="'black'" v-if="isFilter" />
        <!-- <i class="arrow-icon"><i class="ri-arrow-up-s-line"></i></i> -->
        <IconChevronDown :size="15" :color="'black'" v-else />
      </div>
      <div v-if="showDropdown" class="dropdown rounded-[10px]">
        <ul v-if="!loading">
          <template v-if="options.length > 0 && filteredOptions.length > 0">
            <li
              v-for="(option, index) in customSearch
                ? options
                : filteredOptions"
              :key="option.id"
              :class="{
                selected: selectedIndex === index,
                hover: hoveredIndex === index,
              }"
              class="text-xs text-netral-100"
              @mousedown="selectItem(option)"
              @mouseenter="hoveredIndex = index"
            >
              {{ option[renderOption] }}
            </li>
          </template>
          <template v-else>
            <li
              class="flex items-center justify-center font-normal text-red-500 text-s"
            >
              Belum ada data
            </li>
          </template>
        </ul>
        <ul v-else>
          <li
            class="flex items-center justify-center gap-2 text-s text-netral-100"
          >
            <svg
              class="w-5 h-5 animate-spin text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                stroke="currentColor"
                stroke-width="4"
                cx="12"
                cy="12"
                r="10"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            <span class="text-s">Memuat data</span>
          </li>
        </ul>
      </div>
    </div>
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>

<style scoped>
.select-container {
  position: relative;
  width: 100%;
}

.arrow-container {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
}

.arrow-container.focused {
  transform: translateY(-50%) rotate(180deg);
}

.arrow-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  z-index: 10;
}

.dropdown ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
}

.dropdown li.selected {
  background-color: #e37dff;
  color: white;
}

.dropdown li:hover {
  background-color: #f1f1f1;
}

.dropdown li.hover {
  background-color: #f5cfff;
}
</style>
