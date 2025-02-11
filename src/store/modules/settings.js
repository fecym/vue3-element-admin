import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useStorage } from "@vueuse/core";
import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { generateThemeColors, applyTheme, toggleDarkMode } from "@/utils/theme";

export const useSettingsStore = defineStore("setting", () => {
  // 基本设置
  const settingsVisible = ref(false);
  // 标签
  const tagsView = useStorage("tagsView", defaultSettings.tagsView);
  // 侧边栏 Logo
  const sidebarLogo = useStorage("sidebarLogo", defaultSettings.sidebarLogo);
  // 布局
  const layout = useStorage("layout", defaultSettings.layout);
  // 水印
  const watermarkEnabled = useStorage("watermarkEnabled", defaultSettings.watermarkEnabled);

  // 主题
  const themeColor = useStorage("themeColor", defaultSettings.themeColor);
  const theme = useStorage("theme", defaultSettings.theme);

  //  监听主题变化
  watch(
    [theme, themeColor],
    ([newTheme, newThemeColor]) => {
      toggleDarkMode(newTheme === ThemeEnum.DARK);
      const colors = generateThemeColors(newThemeColor);
      applyTheme(colors);
    },
    { immediate: true }
  );

  // 设置映射
  const settingsMap = {
    tagsView,
    sidebarLogo,
    layout,
    watermarkEnabled,
  };

  /**
   * 修改设置
   * @param {object} param0 设置参数
   * @param {string} param0.key 设置键
   * @param {boolean|string} param0.value 设置值
   */
  function changeSetting({ key, value }) {
    const setting = settingsMap[key];
    if (setting) setting.value = value;
  }

  /**
   * 修改主题
   * @param {string} val 主题值
   */
  function changeTheme(val) {
    theme.value = val;
  }

  /**
   * 修改主题颜色
   * @param {string} color 颜色值
   */
  function changeThemeColor(color) {
    themeColor.value = color;
  }

  /**
   * 修改布局
   * @param {string} val 布局值
   */
  function changeLayout(val) {
    layout.value = val;
  }

  return {
    settingsVisible,
    tagsView,
    sidebarLogo,
    layout,
    themeColor,
    theme,
    watermarkEnabled,
    changeSetting,
    changeTheme,
    changeThemeColor,
    changeLayout,
  };
});
