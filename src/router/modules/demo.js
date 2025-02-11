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
];
