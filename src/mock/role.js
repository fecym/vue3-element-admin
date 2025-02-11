export default {
  "roles/options": [
    {
      value: 2,
      label: "系统管理员",
    },
    {
      value: 4,
      label: "系统管理员1",
    },
    // ... 其他角色选项
  ],

  "roles/page": {
    list: [
      {
        id: 2,
        name: "系统管理员",
        code: "ADMIN",
        status: 1,
        sort: 2,
        createTime: "2021-03-25 12:39:54",
        updateTime: null,
      },
      // ... 其他角色数据
    ],
    total: 10,
  },

  "roles/:id/menuIds": [1, 2, 31, 32, 33, 88, 3, 70, 71, 72],

  "roles/:id/form": {
    id: 2,
    name: "系统管理员",
    code: "ADMIN",
    status: 1,
    sort: 2,
    createTime: "2021-03-25 12:39:54",
    updateTime: null,
  },
};
