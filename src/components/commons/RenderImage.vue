<script setup>
const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  objectFit: {
    type: String,
    default: 'cover'
  }
});

import imageError from "../../assets/images/default-img.png";

const onImageError = (event) => {
  event.target.src = imageError;
};
</script>

<template>
  <div :class="className">
    <img
      @error="onImageError"
      :src="src"
      :style="`object-fit: ${objectFit}`"
      alt="berita"
      class="object-cover w-full h-full"
    />
  </div>
</template>
