<!-- 菜单组件 -->
<template>
  <el-menu
    ref="menuRef"
    :default-active="currentRoute.path"
    :collapse="!appStore.sidebar.opened"
    :background-color="variables['menu-background']"
    :text-color="variables['menu-text']"
    :active-text-color="variables['menu-active-text']"
    :unique-opened="false"
    :collapse-transition="false"
    :mode="menuMode"
    @open="onMenuOpen"
    @close="onMenuClose"
  >
    <!-- 菜单项 -->
    <SidebarMenuItem
      v-for="route in menuList"
      :key="route.router"
      :item="route"
      :base-path="resolveFullPath(route.router)"
    />
  </el-menu>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import path from "path-browserify";

import { LayoutEnum } from "@/enums/LayoutEnum";
import { useSettingsStore, useAppStore } from "@/store";
import { isExternal } from "@/utils/index";

import variables from "@/styles/variables.module.scss";
import SidebarMenuItem from "@/layout/components/Sidebar/components/SidebarMenuItem.vue";

/**
 * @typedef {Object} Props
 * @property {Array} menuList - 菜单列表
 * @property {string} basePath - 基础路径
 */

/**
 * @type {Props}
 */
const props = defineProps({
  menuList: {
    type: Array,
    required: true,
    default: () => [],
  },
  basePath: {
    type: String,
    required: true,
    example: "/system",
  },
});

const menuRef = ref(null);
const settingsStore = useSettingsStore();
const appStore = useAppStore();
const currentRoute = useRoute();

// 存储已展开的菜单项索引
const expandedMenuIndexes = ref([]);

// 根据布局模式设置菜单的显示方式：顶部布局使用水平模式，其他使用垂直模式
const menuMode = computed(() => {
  return settingsStore.layout === LayoutEnum.TOP ? "horizontal" : "vertical";
});

/**
 * 获取完整路径
 * @param {string} routePath 当前路由的相对路径  /user
 * @returns {string} 完整的绝对路径 D://vue3-element-admin/system/user
 */
function resolveFullPath(routePath) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  // 解析路径，生成完整的绝对路径
  return path.resolve(props.basePath, routePath);
}

/**
 * 打开菜单
 * @param {string} index 当前展开的菜单项索引
 */
const onMenuOpen = index => {
  expandedMenuIndexes.value.push(index);
};

/**
 * 关闭菜单
 * @param {string} index 当前收起的菜单项索引
 */
const onMenuClose = index => {
  expandedMenuIndexes.value = expandedMenuIndexes.value.filter(item => item !== index);
};

/**
 * 监听菜单模式变化：当菜单模式切换为水平模式时，关闭所有展开的菜单项，
 * 避免在水平模式下菜单项显示错位。
 * @see https://gitee.com/youlaiorg/vue3-element-admin/issues/IAJ1DR
 */
watch(
  () => menuMode.value,
  () => {
    if (menuMode.value === "horizontal") {
      expandedMenuIndexes.value.forEach(item => menuRef.value?.close(item));
    }
  }
);
</script>
