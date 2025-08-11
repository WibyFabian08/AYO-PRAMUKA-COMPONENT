<script setup>
import { ref, watch } from "vue";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-vue";

const props = defineProps({
  pagenation: Object,
  defaultLimit: {
    type: Number,
    default: 10,
  },
  showLimit: {
    type: Boolean,
    default: true,
  },
  isLeft: {
    type: Boolean,
    default: false,
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

const goToFirst = () => pageTo({ page: 1, limit: limit.value });

const goToLast = () =>
  pageTo({
    page: pageNum(props.pagenation?.last_page_url),
    limit: limit.value,
  });

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
  <div class="flex items-center">
    <div v-if="showLimit" class="w-1/2">
      <p class="font-medium text-netral-100 text-s">
        Tampilkan &nbsp;
        <select
          @change="pageTo({ page: 1, limit })"
          v-model="limit"
          class="w-16 px-2 py-1 border rounded text-s min-w-16 max-w-16 border-primary-200"
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option value="1000000">Semua</option>
        </select>
        Data Per halaman
      </p>
    </div>
    <div v-if="!showLimit && !isLeft" class="w-1/2"></div>
    <div
      :class="{ 'w-full': isLeft, 'w-1/2': !isLeft }"
      class="flex justify-end"
    >
      <p class="flex items-center gap-1" v-if="pagenation">
        <button
          @click="goToFirst"
          :disabled="!pagenation?.prev_page_url"
          class="relative flex items-center font-semibold cursor-pointer text-netral-100 disabled:opacity-50"
        >
          <IconCaretLeftFilled :size="16" class="text-sm text-netral-100" />
          <div
            class="h-3.5 w-[1px] absolute bg-neutral-600 right-[17px] transform -translate-x-1/2"
          ></div>
        </button>
        <button
          @click="goToPrevious"
          :disabled="!pagenation?.prev_page_url"
          class="flex items-center font-semibold cursor-pointer text-netral-100 text-s disabled:opacity-50"
        >
          <IconCaretLeftFilled :size="16" class="text-netral-100" />
          Kembali
        </button>
        <input
          v-model="page"
          @change="pageTo({ page, limit })"
          type="number"
          class="w-12 px-2 py-1 text-center border rounded text-s min-w-12 max-w-20 border-primary-200"
        />
        <span class="font-medium text-netral-100 text-s">
          Dari
          <span class="text-netral-100 text-s">
            {{ pageNum(pagenation?.last_page_url) }}
          </span>
        </span>
        <button
          @click="goToNext"
          :disabled="!pagenation?.next_page_url"
          class="flex items-center font-semibold cursor-pointer text-s text-netral-100 disabled:opacity-50"
        >
          Lanjut
          <IconCaretRightFilled :size="16" class="text-netral-100" />
        </button>
        <button
          @click="goToLast"
          :disabled="!pagenation?.next_page_url"
          class="relative flex items-center font-semibold cursor-pointer text-netral-100 disabled:opacity-50"
        >
          <IconCaretRightFilled :size="16" class="text-netral-100" />
          <div
            class="h-3.5 w-[1px] absolute bg-neutral-600 left-[18px] transform -translate-x-1/2"
          ></div>
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
