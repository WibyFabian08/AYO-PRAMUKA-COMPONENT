<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
  colCount: {
    type: Number,
    default: 2,
  },
});
</script>

<template>
  <div class="w-full" v-if="type === 'default'">
    <div class="flex items-start gap-4 animate-pulse">
      <div class="w-full h-5 bg-gray-400 rounded"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>

  <tbody v-else-if="type === 'table'">
    <tr v-for="(_, idx) in 10" :key="idx">
      <td
        v-for="(_, index) in colCount"
        :key="index"
        class="text-center align-middle border border-neutral-300"
      >
        <div class="flex items-start gap-4 p-1 animate-pulse">
          <div class="w-full h-5 bg-gray-400 rounded"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </td>
    </tr>
  </tbody>
</template>
