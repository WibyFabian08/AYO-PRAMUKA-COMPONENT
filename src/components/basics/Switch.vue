<script setup>
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits(["update:isActive", "handleChange"]);
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
const check = ref(props.isActive);

watch(props.isActive, (val) => {
  check.value = val;
  emit("update:isActive");
});

const handleChange = () => {
  emit("update:isActive", check.value);
  emit("handleChange");
};
</script>

<template>
  <label :style="`background: #EDEDED`" class="cursor-pointer switch">
    <input
      :disabled="isDisabled"
      @change="handleChange"
      v-model="check"
      type="checkbox"
      class="cursor-pointer"
    />
    <div class="cursor-pointer"></div>
  </label>
</template>

<style>
.switch input {
  position: absolute;
  opacity: 0;
  /* background: red; */
}

.switch {
  display: inline-block;
  font-size: 20px; /* 1 */
  height: 1em;
  width: 2em;
  /* background: #c1c1c1; */
  /* background: #c1c1c1; */
  border-radius: 1em;
}

.switch div {
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: #767676;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
  -webkit-transition: all 300ms;
  -moz-transition: all 300ms;
  transition: all 300ms;
}

.switch input:checked + div {
  -webkit-transform: translate3d(100%, 0, 0);
  -moz-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  background: #9550ED;
}
</style>
