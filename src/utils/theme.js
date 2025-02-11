/**
 * 将十六进制颜色转换为 RGB
 * @param {string} hex 十六进制颜色值
 * @returns {[number, number, number]} RGB颜色值数组
 */
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

/**
 * 将 RGB 转换为十六进制颜色
 * @param {number} r 红色值
 * @param {number} g 绿色值
 * @param {number} b 蓝色值
 * @returns {string} 十六进制颜色值
 */
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * 调整颜色亮度
 * @param {string} hex 十六进制颜色值
 * @param {number} factor 亮度调整因子
 * @returns {string} 调整后的十六进制颜色值
 */
function adjustBrightness(hex, factor) {
  const rgb = hexToRgb(hex);
  const newRgb = rgb.map(val => Math.max(0, Math.min(255, Math.round(val + (255 - val) * factor))));
  return rgbToHex(...newRgb);
}

/**
 * 生成主题颜色
 * @param {string} primary 主色
 * @returns {object} 主题颜色对象
 */
export function generateThemeColors(primary) {
  const colors = {
    primary,
  };

  // 生成浅色变体
  for (let i = 1; i <= 9; i++) {
    const factor = i * 0.1;
    colors[`primary-light-${i}`] = adjustBrightness(primary, factor);
  }

  // 生成深色变体
  colors["primary-dark-2"] = adjustBrightness(primary, -0.2);

  return colors;
}

/**
 * 应用主题颜色
 * @param {object} colors 主题颜色对象
 */
export function applyTheme(colors) {
  const el = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    el.style.setProperty(`--el-color-${key}`, value);
  });
}

/**
 * 切换暗黑模式
 * @param {boolean} isDark 是否为暗黑模式
 */
export function toggleDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
