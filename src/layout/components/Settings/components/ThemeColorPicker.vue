<template>
  <el-color-picker
    v-model="currentColor"
    :predefine="colorPresets"
    popper-class="theme-picker-dropdown"
  />
</template>

<script setup>
import { ref, watch } from "vue";

/**
 * @typedef {Object} Props
 * @property {string} modelValue - 当前主题颜色值
 */

/**
 * @type {Props}
 */
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

/** @type {string[]} 预定义的颜色列表 */
const colorPresets = [
  "#4080FF",
  "#ff4500",
  "#ff8c00",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsva(120, 40, 94)",
];

const currentColor = ref(props.modelValue);

watch(currentColor, newValue => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped>
:deep(.theme-picker-dropdown) {
  z-index: 99999 !important;
}
</style>
