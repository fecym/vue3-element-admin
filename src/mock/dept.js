export default {
  "dept/options": [
    {
      value: 1,
      label: "有来技术",
      children: [
        {
          value: 2,
          label: "研发部门",
        },
        {
          value: 3,
          label: "测试部门",
        },
      ],
    },
  ],

  dept: [
    {
      id: 1,
      parentId: 0,
      name: "有来技术",
      code: "YOULAI",
      sort: 1,
      status: 1,
      children: [
        {
          id: 2,
          parentId: 1,
          name: "研发部门",
          code: "RD001",
          sort: 1,
          status: 1,
          children: [],
          createTime: null,
          updateTime: "2022-04-19 12:46",
        },
        {
          id: 3,
          parentId: 1,
          name: "测试部门",
          code: "QA001",
          sort: 1,
          status: 1,
          children: [],
          createTime: null,
          updateTime: "2022-04-19 12:46",
        },
      ],
      createTime: null,
      updateTime: null,
    },
  ],

  "dept/:id/form": {
    id: 1,
    name: "有来技术",
    code: "YOULAI",
    parentId: 0,
    status: 1,
    sort: 1,
  },
};
