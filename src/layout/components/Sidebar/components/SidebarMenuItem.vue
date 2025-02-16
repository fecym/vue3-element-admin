<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!--【叶子节点】显示叶子节点或唯一子节点且父节点未配置始终显示 -->
    <template v-if="!item.children?.length">
      <!--        :to="{-->
      <!--          path: resolvePath(item.router),-->
      <!--          query: item.meta?.params,-->
      <!--        }"-->
      <AppLink>
        <el-menu-item
          :index="resolvePath(item.router)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          @click="onLinkJump(item)"
        >
          <SidebarMenuItemTitle
            :icon="item.icon || item.meta?.icon"
            :title="item.title || item.meta?.title || item.name"
          />
        </el-menu-item>
      </AppLink>
    </template>

    <!--【非叶子节点】显示含多个子节点的父菜单，或始终显示的单子节点 -->
    <el-sub-menu v-else :index="resolvePath(item.router)" teleported>
      <template #title>
        <SidebarMenuItemTitle
          :icon="item.icon || item.meta?.icon"
          :title="item.title || item.meta?.title"
        />
      </template>

      <SidebarMenuItem
        v-for="child in item.children"
        :key="child.router"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.router)"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import path from "path-browserify";
import { isExternal } from "@/utils";
import AppLink from "@/auto-components/AppLink.vue";
import SidebarMenuItemTitle from "@/layout/components/Sidebar/components/SidebarMenuItemTitle.vue";
import { useLinkJump } from "@/composables/useLinkJump.js";

defineOptions({
  name: "SidebarMenuItem",
  inheritAttrs: false,
});

/**
 * @typedef {Object} Props
 * @property {Object} item - 当前路由对象
 * @property {string} basePath - 父级完整路径
 * @property {boolean} [isNest] - 是否为嵌套路由
 */

/**
 * @type {Props}
 */
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
});

/**
 * 获取完整路径，适配外部链接
 * @param {string} routePath - 路由路径
 * @returns {string} 绝对路径
 */
function resolvePath(routePath) {
  if (isExternal(routePath)) return routePath;
  if (isExternal(props.basePath)) return props.basePath;

  // 拼接父路径和当前路径
  return path.resolve(props.basePath, routePath);
}

function onLinkJump(row) {
  const url = resolvePath(row.router);
  const { handleLinkJump } = useLinkJump();
  handleLinkJump(url);
}
</script>

<style lang="scss">
.hideSidebar {
  .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }
    }

    & > span {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }

  .el-sub-menu {
    overflow: hidden;

    & > .el-sub-menu__title {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    width: $sidebar-width-collapsed;

    .el-sub-menu {
      & > .el-sub-menu__title > span {
        display: inline-block;
        width: 0;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
}

.el-menu-item:hover {
  background-color: $menu-hover;
}
</style>
