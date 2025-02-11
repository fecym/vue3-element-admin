export default [
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
  // {
  //   path: "/function/other/:id",
  //   component: () => import("@/views/demo/other"),
  //   name: "Other/:id",
  //   meta: {
  //     title: "敬请期待...",
  //     icon: "",
  //     hidden: false,
  //     alwaysShow: false,
  //     params: null,
  //   },
  // },
];
