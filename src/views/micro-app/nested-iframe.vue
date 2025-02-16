<template>
  <div class="app-container">
    <iframe :key="currentUrl" :src="currentUrl" frameborder="0" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentUrl = ref(route.query.url || "");

watch(
  () => route.query.url,
  newUrl => {
    if (newUrl) {
      currentUrl.value = newUrl;
    }
  }
);
</script>
<style lang="scss" scoped>
/** 关闭tag标签  */
.app-container {
  /* 50px = navbar = 50px */
  height: calc(100vh - 50px);
}

/** 开启tag标签  */
.hasTagsView {
  .app-container {
    /* 84px = navbar + tags-view = 50px + 34px */
    height: calc(100vh - 84px);
  }
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
