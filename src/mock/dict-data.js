export default {
  "dict-data/page": {
    list: [
      {
        id: 1,
        dictCode: "gender",
        label: "男",
        value: "1",
        sort: 1,
        status: 1,
      },
      {
        id: 2,
        dictCode: "gender",
        label: "女",
        value: "2",
        sort: 2,
        status: 1,
      },
      // ... 其他数据
    ],
    total: 3,
  },

  "dict-data/:dictCode/options": [
    {
      value: "1",
      label: "男",
    },
    {
      value: "2",
      label: "女",
    },
    {
      value: "0",
      label: "保密",
    },
  ],
};
