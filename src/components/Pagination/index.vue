<script setup>
import { ref, watch, computed } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

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
});

const emit = defineEmits(["pageTo"]);

const page = ref(props.defaultPage);
const limit = ref(props.defaultLimit);

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
  limit.value = data.limit;
  emit("pageTo", {
    page: page.value || 1,
    limit: limit.value || 5,
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
  <div class="flex items-center justify-between">
    <button
      @click="goToPrevious"
      class="flex items-center gap-1 px-4 font-semibold border rounded-lg h-9 text-m border-netral-40"
    >
      <IconChevronLeft :size="16" />
      <span>Kembali</span>
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
      @click="goToNext"
      class="flex items-center gap-1 px-4 font-semibold border rounded-lg h-9 text-m border-netral-40"
    >
      <span>Lanjut</span>
      <IconChevronRight :size="16" />
    </button>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
