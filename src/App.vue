<template>
  <el-config-provider :locale="locale" :size="size">
    <!-- 开启水印 -->
    <el-watermark
      :font="{ color: fontColor }"
      :content="watermarkEnabled ? defaultSettings.watermarkContent : ''"
      :z-index="9999"
      class="wh-full"
    >
      <Layout v-if="hasLayout" />
      <router-view v-else />
    </el-watermark>
  </el-config-provider>
</template>

<script setup>
import { useAppStore, useSettingsStore } from "@/store";
import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import Layout from "@/layout/index.vue";
import { useRoute } from "vue-router";

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const locale = computed(() => appStore.locale);
const size = computed(() => appStore.size);
const watermarkEnabled = computed(() => settingsStore.watermarkEnabled);

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
  return settingsStore.theme === ThemeEnum.DARK ? "rgba(255, 255, 255, .15)" : "rgba(0, 0, 0, .15)";
});

const route = useRoute();
const hasLayout = computed(() => !route.meta?.hiddenLayout);
</script>
