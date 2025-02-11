export const getVisitTrendOption = () => ({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "PV",
      type: "line",
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      areaStyle: {
        opacity: 0.1,
      },
      lineStyle: {
        width: 3,
      },
    },
    {
      name: "UV",
      type: "line",
      smooth: true,
      data: [420, 532, 501, 534, 690, 730, 620],
      areaStyle: {
        opacity: 0.1,
      },
      lineStyle: {
        width: 3,
      },
    },
  ],
});

export const getUserDistOptions = () => ({
  gender: {
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "男性" },
          { value: 935, name: "女性" },
        ],
      },
    ],
  },
  age: {
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: "18岁以下" },
          { value: 1048, name: "18-25岁" },
          { value: 580, name: "26-35岁" },
          { value: 484, name: "36-45岁" },
          { value: 300, name: "45岁以上" },
        ],
      },
    ],
  },
});
