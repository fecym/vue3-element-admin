export default {
  "dict/page": {
    list: [
      {
        id: 1,
        name: "性别",
        dictCode: "gender",
        status: 1,
      },
    ],
    total: 1,
  },

  "dict/:id/form": {
    id: 1,
    name: "性别",
    dictCode: "gender",
    status: 1,
  },

  "dict/list": [
    {
      name: "通知级别",
      dictCode: "notice_level",
      dictDataList: [
        {
          value: "L",
          label: "低",
          tagType: "info",
        },
        {
          value: "M",
          label: "中",
          tagType: "warning",
        },
        {
          value: "H",
          label: "高",
          tagType: "danger",
        },
      ],
    },
    // ... 其他字典数据
  ],
};
