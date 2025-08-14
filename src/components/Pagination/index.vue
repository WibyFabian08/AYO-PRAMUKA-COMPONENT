<script setup>
import { ref, watch, computed } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import InputSelect from "../InputSelect/index.vue";

const props = defineProps({
  pagenation: {
    type: Object,
    default: {},
  },
  defaultLimit: {
    type: Number,
    default: 10,
  },
  defaultPage: {
    type: Number,
    default: null,
  },
  showLimit: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["pageTo"]);

const page = ref(props.defaultPage);
const limit = ref(props.defaultLimit);

const handleLimit = (e) => {
  if (e) {
    limit.value = e.target.value;

    pageTo({
      page: props.defaultPage,
      limit: limit.value === "Semua" ? 1000000 : limit.value,
    });
  }
};

const pageNum = (data) => {
  if (!data) return null;
  return parseInt(data.split("page=")[1]);
};

const pageTo = (data) => {
  if (pageNum(props.pagenation?.last_page_url) < data.page) {
    page.value = 1;
  } else {
    page.value = data.page;
  }
  emit("pageTo", {
    page: page.value || 1,
    limit: limit.value === "Semua" ? 1000000 : limit.value || 5,
  });
};

const goToPrevious = () =>
  pageTo({
    page: pageNum(props.pagenation?.prev_page_url),
    limit: limit.value,
  });

const goToNext = () =>
  pageTo({
    page: pageNum(props.pagenation?.next_page_url),
    limit: limit.value,
  });

const paginationPages = computed(() => {
  const total = pageNum(props.pagenation.last_page_url) || 1;
  const current = props.defaultPage || 1;
  const delta = 2;

  let range = [];
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  let pages = [];
  let prev;
  for (let i of range) {
    if (prev) {
      if (i - prev === 2) {
        pages.push(prev + 1);
      } else if (i - prev > 2) {
        pages.push("...");
      }
    }
    pages.push(i);
    prev = i;
  }
  return pages;
});

const goToPage = (page) => {
  if (page === "...") return;
  pageTo({
    page: page,
    limit: limit.value,
  });
};

watch(
  () => props.pagenation,
  (val) => {
    if (props.defaultPage) {
      page.value = props.defaultPage;
    } else {
      page.value = pageNum(val?.prev_page_url) + 1;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex items-center justify-between gap-5">
    <div class="flex items-center justify-between gap-3">
      <button
        @click="goToPrevious"
        :disabled="defaultPage === 1"
        class="flex items-center gap-1 px-3 font-semibold border rounded-lg disabled:bg-netral-20 disabled:cursor-not-allowed h-9 text-m border-netral-40"
      >
        <IconChevronLeft :size="16" />
        <span>Back</span>
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="(page, index) in paginationPages"
          :key="index"
          class="flex items-center justify-center gap-1 font-semibold transition-all duration-150 border rounded-lg w-9 h-9 hover:bg-primary hover:text-white text-m border-netral-40"
          :class="defaultPage === page ? 'bg-primary text-white' : ''"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        :disabled="!props.pagenation?.next_page_url"
        @click="goToNext"
        class="flex items-center gap-1 px-3 font-semibold border rounded-lg h-9 disabled:bg-netral-20 disabled:cursor-not-allowed text-m border-netral-40"
      >
        <span>Next</span>
        <IconChevronRight :size="16" />
      </button>
    </div>

    <div v-if="showLimit" class="flex items-center justify-end gap-2">
      <h6 class="font-semibold text-m">Halaman</h6>
      <select
        class="flex items-center font-semibold border rounded-lg outline-none text-netral-100 text-m border-netral-40 h-9 focus:border-netral-40 focus:outline-none focus:ring-0 active:outline-none active:ring-0 active:border-netral-40"
        v-model="limit"
        @change="handleLimit($event)"
      >
        <option class="font-semibold text-m">5</option>
        <option class="font-semibold text-m">10</option>
        <option class="font-semibold text-m">20</option>
        <option class="font-semibold text-m">50</option>
        <option class="font-semibold text-m">Semua</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
