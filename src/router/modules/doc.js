export default [
  {
    path: "/doc/internal-doc",
    component: () => import("@/views/demo/nested-iframe.vue"),
    name: "InternalDoc",
    meta: {
      title: "平台文档",
      icon: "document",
      hidden: false,
      alwaysShow: false,
      params: null,
    },
  },
];
