<template>
  <div @click="toggle">
    <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
  </div>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import SvgIcon from "@/auto-components/SvgIcon.vue";

const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="scss" scoped></style>
