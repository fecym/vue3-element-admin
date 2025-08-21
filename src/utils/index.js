import dayjs from "dayjs";

export * from "./message";
export * from "./base";
export * from "./file";
export * from "./date";

/**
 * 检查元素是否包含指定的类名
 * @param {HTMLElement} ele DOM元素
 * @param {string} cls 类名
 * @returns {boolean} 是否包含该类名
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * 为元素添加类名
 * @param {HTMLElement} ele DOM元素
 * @param {string} cls 类名
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * 移除元素的类名
 * @param {HTMLElement} ele DOM元素
 * @param {string} cls 类名
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * 判断是否是外部链接
 * @param {string} path 路径
 * @returns {boolean} 是否是外部链接
 */
export function isExternal(path) {
  return /^(https?:|http?:|mailto:|tel:)/.test(path);
}

/**
 * 格式化增长率，保留两位小数，并且去掉末尾的0，取绝对值
 * @param {number} growthRate 增长率
 * @returns {string} 格式化后的增长率
 */
export function formatGrowthRate(growthRate) {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
}

export const noop = () => {};

/**
 * 格式化日期
 * @param date
 * @param template
 * @returns {string}
 */
export function formatDate(date, template = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(date).format(template);
}
