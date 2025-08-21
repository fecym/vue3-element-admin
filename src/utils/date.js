// 一天的毫秒数
export const ONE_DAY_MS = 86400_000;

// 一周
export const ONE_WEEK_MS = ONE_DAY_MS * 7;

// 一个月
export const ONE_MONTH_MS = ONE_DAY_MS * 30;

// 三个月
export const THREE_MONTH_MS = ONE_MONTH_MS * 3;

// 日期选择起配置
export const datepickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - ONE_WEEK_MS);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - ONE_MONTH_MS);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - THREE_MONTH_MS);
        picker.$emit("pick", [start, end]);
      },
    },
  ],
};

export const dateFormatTemplate = "YYYY-MM-DD";
export const dateTimeFormatTemplate = "YYYY-MM-DD HH:mm:ss";
