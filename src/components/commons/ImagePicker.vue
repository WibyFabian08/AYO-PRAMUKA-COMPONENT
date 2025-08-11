<script setup>
import { ref, useSlots } from "vue";
import { IconPhoto } from "@tabler/icons-vue";

const uploadRef = ref(null);
const slots = useSlots();

const contentSlot = !!slots.content;

const emit = defineEmits(["update:images", "update:defaultImage"]);
const props = defineProps({
  maxxFile: {
    type: Number,
    default: 4,
  },
  images: {
    type: Array,
    default: [],
  },
  defaultImage: {
    type: Array,
    default: [],
  },
  className: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "#454545",
  },
   error: {
    type: String,
    default: null,
  },
});

const handleClick = () => {
  uploadRef.value.click();
};

const handleChange = (e) => {
  if (
    props.defaultImage.length + props.images.length + e.target.files.length <=
    props.maxxFile
  ) {
    emit("update:images", [...props.images, ...e.target.files]);
  } else {
    alert("TOO MUCH");
  }
};
</script>

<template>
  <div class="cursor-pointer" @click="handleClick">
    <div class="flex items-center justify-center" :class="className">
      <button  class="cursor-pointer">
        <IconPhoto v-if="!contentSlot" :size="16" :color="iconColor" />
        <slot v-else name="content"></slot>
      </button>
    </div>
    <input
      ref="uploadRef"
      class="hidden"
      type="file"
      name="uploadFile"
      id="uploadFile"
      accept="image/png, image/jpeg, image/jpg"
      multiple
      @change="handleChange"
    />
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>
