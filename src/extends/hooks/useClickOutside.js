import { onMounted, onUnmounted, ref } from "vue";

export function useClickOutside() {
  const elementRef = ref(null);
  const isVisible = ref(false);

  const handleClickOutside = (event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      isVisible.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  const toggleVisibility = (event) => {
    event.stopPropagation(); // Mencegah event click langsung menutup div
    isVisible.value = !isVisible.value;
  };

  return { elementRef, isVisible, toggleVisibility };
}
