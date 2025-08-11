<script setup>
import { ref, onMounted, onUnmounted, computed, onBeforeUnmount } from "vue";

defineOptions({
  name: 'InfiniteScrollContainer'
})

const emit = defineEmits(["handleFetchMore", 'clearInterval']);
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
});

const handleFetchMore = () => {
  emit("handleFetchMore");
};

const clearInterval = () => {
  emit('clearInterval')
}

const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >=
    document.documentElement.offsetHeight - 10;
  if (bottomOfWindow && !props.loading && props.hasMore) {
    handleFetchMore();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);

  clearInterval()
});

const handlePosting = (e) => {
  feedStore.addFeed(e);
};
</script>
<template>
  <div>
    <slot name="content"></slot>
    <slot name="loading"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
