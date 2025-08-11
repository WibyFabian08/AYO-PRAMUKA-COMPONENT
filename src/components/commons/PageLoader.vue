<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "100",
  },
  text: {
    type: String,
    default: "Memuat Data",
  },
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-netral-100"
  >
    <img src="../../assets/images/loader.gif" :width="width" alt="" />
    <h5 class="-mt-5 font-medium text-white">{{ text }}</h5>
  </div>
</template>
