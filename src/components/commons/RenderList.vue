<script setup>
import { useSlots } from "vue";
import NoData from "./NoData.vue";
import Spinner from '../basics/Spinner.vue'

const slots = useSlots();
const loadingSlot = !!slots.loading;
const emptySlot = !!slots.empty;

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <template v-if="loading">
    <div v-if="!loadingSlot" class="flex items-center justify-center w-full h-28">
      <Spinner />
    </div>
    <slot v-else name="loading"></slot>
  </template>
  <template v-else>
    <template v-if="data && data.length > 0">
      <slot name="content" />
    </template>
    <template v-else>
      <NoData v-if="!emptySlot" />
      <slot v-else name="empty"></slot>
    </template>
  </template>
</template>
