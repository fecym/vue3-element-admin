<template>
  <!-- 根据 icon 类型决定使用的不同类型的图标组件 -->
  <el-icon v-if="icon && icon.startsWith('el-icon')" class="sub-el-icon">
    <component :is="icon.replace('el-icon-', '')" />
  </el-icon>
  <svg-icon v-else-if="icon" :icon-class="icon" />
  <svg-icon v-else icon-class="menu" />
  <!-- 菜单标题 -->
  <span v-if="title" class="ml-1">{{ translateRouteTitle(title) }}</span>
</template>

<script setup>
import { translateRouteTitle } from "@/utils/i18n";
import SvgIcon from "@/auto-components/SvgIcon.vue";

/**
 * @typedef {Object} Props
 * @property {string} [icon] - 图标类名
 * @property {string} [title] - 菜单标题
 */

/**
 * @type {Props}
 */
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.sub-el-icon {
  width: 14px !important;
  margin-right: 0 !important;
  color: currentcolor;
}

.hideSidebar {
  .el-sub-menu,
  .el-menu-item {
    .svg-icon,
    .sub-el-icon {
      margin-left: 20px;
    }
  }
}
</style>
