import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { requireAll } from "@/router/requireAll.js";

const moduleRoutes = requireAll();
export { moduleRoutes };

import { getMicroAppsMap } from "@/utils/microApp.js";

// 静态路由
//  meta 属性: hidden: true 隐藏左侧内具体内容, hiddenLayout: true 该页面是否需要隐藏左侧菜单
export const constantRoutes = [
  {
    meta: { hidden: true, hiddenLayout: true },
    path: "/redirect/:path(.*)",
    component: () => import("@/views/redirect/index.vue"),
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true, hiddenLayout: true },
  },

  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
    // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
    name: "Dashboard",
    meta: {
      title: "dashboard",
      icon: "homepage",
      affix: true,
      keepAlive: true,
    },
  },
  {
    path: "/401",
    component: () => import("@/views/error/401.vue"),
    meta: { hidden: true, hiddenLayout: true },
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: { hidden: true, hiddenLayout: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/profile/index.vue"),
    meta: { title: "个人中心", icon: "user", hidden: false },
  },
  {
    path: "/notice",
    name: "MyNotice",
    component: () => import("@/views/profile/components/MyNotice.vue"),
    meta: { title: "我的通知", icon: "user", hidden: true, hiddenLayout: false },
  },
  {
    path: "/micro-setting",
    name: "MicroAppSetting",
    component: () => import("@/views/micro-app/setting.vue"),
    meta: { title: "配置", icon: "config", hidden: true, hiddenLayout: false },
  },
  {
    path: "/link-jump",
    name: "LinkJump",
    component: () => import("@/views/micro-app/nested-iframe.vue"),
    meta: { title: "外链访问", icon: "config", hidden: true, hiddenLayout: false },
  },
];

const microApps = getMicroAppsMap();

for (const key in microApps) {
  constantRoutes.push({
    path: `/${key}/:params*`,
    component: () => import("@/views/micro-app/wrapper.vue"),
    props: true,
    name: `microApp-${key}`,
    meta: {
      title: key,
      microAppName: key,
      icon: "el-icon-s-grid",
      hidden: false,
      hiddenLayout: false,
      keepAlive: true,
    },
  });
}

/**
 * 创建路由
 */
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app) {
  app.use(router);
}

export default router;
