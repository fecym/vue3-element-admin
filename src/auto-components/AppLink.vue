<template>
  <component :is="linkType" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
defineOptions({
  name: "AppLink",
  inheritAttrs: false,
});

import { isExternal } from "@/utils/index.js";

const props = defineProps({
  to: {
    type: Object,
    required: false,
  },
});

const isExternalLink = computed(() => {
  return isExternal(props.to.path || "");
});

// const linkType = computed(() => (isExternalLink.value ? "a" : "router-link"));
const linkType = "div";

const linkProps = to => {
  // if (isExternalLink.value) {
  //   return {
  //     href: to.path,
  //     target: "_blank",
  //     rel: "noopener noreferrer",
  //   };
  // }
  // return { to: to };
  {
  }
};
</script>
