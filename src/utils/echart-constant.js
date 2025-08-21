export const loopColors = [
  // 原有颜色保持不变
  "#666BED",
  "#A68AE2",
  "#EC92A1",
  "#FFB089",
  "#FFD18C",
  "#EDE780",
  "#B8E67D",
  "#74E3AD",
  "#67BDF8",
  "#3968EC",
  "#B87FEC",
  "#F58FA8",
  "#FFA87D",
  "#F3C756",
  "#DBDE5E",
  "#AAE461",
  "#74E3AD",
  "#62BBF9",

  // 新增配色 - 暖色系
  "#FF6B6B", // 珊瑚红
  "#FF8E53", // 橙红
  "#FF9F43", // 橙黄
  "#FFA726", // 琥珀
  "#FFCA28", // 金黄
  "#FFEE58", // 柠檬黄
  "#D4E157", // 青柠
  "#9CCC65", // 浅绿

  // 新增配色 - 冷色系
  "#26C6DA", // 青色
  "#42A5F5", // 天蓝
  "#5C6BC0", // 靛蓝
  "#7E57C2", // 深紫
  "#AB47BC", // 紫红
  "#EC407A", // 粉红
  "#EF5350", // 红色
  "#FF7043", // 深橙

  // 新增配色 - 中性色系
  "#78909C", // 蓝灰
  "#8D6E63", // 棕色
  "#A1887F", // 浅棕
  "#90A4AE", // 灰蓝
  "#BCAAA4", // 米色
  "#B39DDB", // 淡紫
  "#81C784", // 薄荷绿
  "#FFB74D", // 浅橙

  // 新增配色 - 渐变色系
  "#667eea", // 渐变蓝
  "#764ba2", // 渐变紫
  "#f093fb", // 渐变粉
  "#f5576c", // 渐变红
  "#4facfe", // 渐变天蓝
  "#43e97b", // 渐变绿
  "#fa709a", // 渐变玫瑰
  "#fee140", // 渐变黄

  // 新增配色 - 深色系
  "#2C3E50", // 深蓝灰
  "#34495E", // 深灰蓝
  "#8E44AD", // 深紫
  "#9B59B6", // 紫罗兰
  "#E74C3C", // 深红
  "#C0392B", // 暗红
  "#D35400", // 深橙
  "#E67E22", // 胡萝卜橙

  // 新增配色 - 浅色系
  "#ECF0F1", // 浅灰
  "#BDC3C7", // 银色
  "#F39C12", // 橙色
  "#F1C40F", // 黄色
  "#2ECC71", // 翠绿
  "#1ABC9C", // 青绿
  "#3498DB", // 蓝色
  "#9B59B6", // 紫色
];
// ["#A5D6A7", "#FFF9C4", "#81D4FA", "#FFAB91", "#CE93D8", "#BCAAA4", "#FFCC80", "#E6EE9C", "#80CBC4", "#FFCCBC", "#D7CCC8",]

export const pieOptions = {
  tooltip: {
    trigger: "item",
    formatter: "{b}<br/>{c}元 ({d}%)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e4e7ed",
    borderWidth: 1,
    textStyle: {
      color: "#303133",
      fontSize: 13,
    },
    extraCssText: "border-radius: 6px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);",
  },
  color: loopColors,
  legend: {
    top: "5%",
    left: "center",
    orient: "horizontal",
    itemGap: 15,
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 12,
      color: "#606266",
      padding: [0, 0, 0, 3],
    },
    icon: "circle",
    // 优化后的分页配置
    type: "scroll",
    pageButtonItemGap: 8,
    pageButtonGap: 15,
    pageButtonPosition: "end",
    pageFormatter: "{current}/{total}",
    // 自定义更美观的分页按钮图标
    pageIcons: {
      horizontal: [
        // 右箭头 - 更圆润的设计
        "M0,0L8,-6L8,-2L16,-2L16,2L8,2L8,6z",
        // 左箭头 - 更圆润的设计
        "M0,0L-8,-6L-8,-2L-16,-2L-16,2L-8,2L-8,6z",
      ],
    },
    pageIconColor: "#409EFF", // 使用主题蓝色
    pageIconInactiveColor: "#C0C4CC", // 浅灰色
    pageIconSize: 12, // 适中的大小
    pageTextStyle: {
      color: "#606266",
      fontSize: 12,
      fontWeight: "normal",
    },
    animation: true,
    animationDurationUpdate: 300, // 更快的动画
  },
  series: {
    name: "消费类型",
    type: "pie",
    radius: ["25%", "65%"], // 调整内外半径
    center: ["50%", "60%"], // 真正居中
    avoidLabelOverlap: true,
    label: {
      show: true,
      position: "outside",
      fontSize: 11,
      color: "#666",
      formatter: function (params) {
        // if (params.percent < 5) {
        //   return '';
        // }
        return params.name + "\n" + params.percent + "%";
      },
      lineHeight: 14,
    },
    labelLine: {
      show: true,
      length: 12,
      length2: 8,
      smooth: 0.2,
      lineStyle: {
        color: "#ddd",
        width: 1,
      },
    },
    data: [],
    itemStyle: {
      borderWidth: 1, // 大幅减少边框宽度
      borderColor: "#fff",
      shadowBlur: 4, // 减少阴影
      shadowColor: "rgba(0, 0, 0, 0.08)",
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 8,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        borderWidth: 2, // 悬停时边框也不要太粗
        scale: true,
        scaleSize: 5,
      },
      label: {
        fontSize: 12,
        fontWeight: "bold",
      },
    },
    animationType: "scale",
    animationEasing: "cubicOut",
    animationDelay: function (idx) {
      return idx * 80;
    },
  },
};

const shadowConf = {
  color: "#B8E67D",
  shadowColor: "rgba(0, 0, 0, 0.2)",
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
};

export const lineSeriesItem = {
  type: "line",
  symbolSize: 8,
  data: [],
  // smooth: true,
  // name: "",
  lineStyle: {
    width: 3,
    ...shadowConf,
  },
  itemStyle: {
    borderWidth: 3,
    ...shadowConf,
  },
};

export const lineOptions = {
  // title: {
  //   text: "本周消费趋势"
  // },
  tooltip: {
    trigger: "axis",
    padding: 14,
    // formatter: "{b} <br/> {c}% "
    // formatter: (params, ticket, callback) => {
    //   console.log(params, "params");
    //   let str;
    //   params.forEach(item => {
    //
    //   })
    //   return str
    // }
  },
  legend: {
    itemGap: 40,
    top: 0,
    icon: "rect",
    show: true,
    textStyle: {
      color: "#AEB0BD",
    },
  },
  grid: {
    left: "3%",
    right: "40",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      dataView: { readOnly: false },
      magicType: { type: ["line", "bar"] },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
    axisLine: {
      show: true,
      lineStyle: {
        color: "#C0C4CC",
        width: 1,
      },
    },
    axisLabel: {
      color: "#595F66",
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#C0C4CC",
        width: 1,
      },
    },
    axisLabel: {
      color: "#595F66",
    },
    splitLine: {
      lineStyle: {
        color: ["#E8E9EB"],
        type: "dashed",
      },
    },
  },
  series: [],
};
