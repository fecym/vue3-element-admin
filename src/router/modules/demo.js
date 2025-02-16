export default [
  {
    path: "/demo/form",
    component: () => import("@/views/demo/form-demo.vue"),
    name: "FormDemo",
    meta: {
      title: "Form 表单",
      icon: "api",
      hidden: false,
      keepAlive: true,
      alwaysShow: true,
      params: null,
    },
  },
  {
    path: "/demo/icon-selector",
    component: () => import("@/views/demo/icon-selector"),
    name: "IconSelector",
    meta: {
      title: "图标选择器",
      icon: "",
      hidden: false,
      keepAlive: true,
      alwaysShow: false,
      params: null,
    },
  },
  {
    path: "/function/icon-demo",
    component: () => import("@/views/demo/icons"),
    name: "IconDemo",
    meta: {
      title: "Icons",
      icon: "el-icon-Notification",
      hidden: false,
      keepAlive: true,
      alwaysShow: false,
      params: null,
    },
  },
  {
    path: "/function/websocket",
    component: () => import("@/views/demo/websocket"),
    name: "/function/websocket",
    meta: {
      title: "Websocket",
      icon: "",
      hidden: false,
      keepAlive: true,
      alwaysShow: false,
      params: null,
    },
  },
];
