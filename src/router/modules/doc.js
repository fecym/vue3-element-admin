export default [
  {
    path: "/doc/internal-doc",
    component: () => import("@/views/demo/internal-doc"),
    name: "InternalDoc",
    meta: {
      title: "平台文档",
      icon: "document",
      hidden: false,
      alwaysShow: false,
      params: null,
    },
  },
  // {
  //   path: "https://juejin.cn/post/7228990409909108793",
  //   name: "Https://juejin.cn/post/7228990409909108793",
  //   meta: {
  //     title: "平台文档(外链)",
  //     icon: "link",
  //     hidden: false,
  //     alwaysShow: false,
  //     params: null,
  //   },
  // },
];
