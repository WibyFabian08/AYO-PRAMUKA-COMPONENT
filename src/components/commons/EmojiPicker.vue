<script setup>
import EmojiPicker from "vue3-emoji-picker";
import { IconMoodSmileBeam } from "@tabler/icons-vue";
import { useClickOutside } from "../../extends/hooks/useClickOutside";

const { elementRef, isVisible, toggleVisibility } = useClickOutside();

const onSelectEmoji = (emoji) => {
  emit("handleSelect", emoji?.i);
};

const emit = defineEmits(["handleSelect"]);

const props = defineProps({
  className: {
    type: String,
    default: "-top-80",
  },
  buttonClass: {
    type: String,
    default: "-top-80",
  },
  iconColor: {
    type: String,
    default: "#454545",
  },
});
</script>

<template>
  <div class="relative">
    <div
      @click="toggleVisibility"
      class="flex items-center justify-center cursor-pointer"
      :class="buttonClass"
    >
      <button class="cursor-pointer">
        <IconMoodSmileBeam :size="16" :color="iconColor" />
      </button>
    </div>
    <div
      :class="className"
      class="absolute z-10"
      v-if="isVisible"
      ref="elementRef"
    >
      <EmojiPicker :native="true" @select="onSelectEmoji" />
    </div>
  </div>
</template>
