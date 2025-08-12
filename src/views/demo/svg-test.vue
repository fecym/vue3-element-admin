<template>
  <div class="svg-test">
    <h2>SVG 图标测试 - 支持子目录</h2>

    <div class="test-section">
      <h3>根目录图标</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <svg-icon icon-class="github" size="2em" />
          <span>github (根目录)</span>
        </div>
        <div class="icon-item">
          <svg-icon icon-class="api" size="2em" />
          <span>api (根目录)</span>
        </div>
      </div>
    </div>

    <div v-if="hasSubdirIcons" class="test-section">
      <h3>子目录图标</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <svg-icon icon-class="social-github" size="2em" />
          <span>social-github (子目录)</span>
        </div>
        <div class="icon-item">
          <svg-icon icon-class="social-bilibili" size="2em" />
          <span>social-bilibili (子目录)</span>
        </div>
      </div>
    </div>

    <div class="test-section">
      <h3>所有图标列表</h3>
      <div class="icon-list">
        <div v-for="iconName in svg_icons" :key="iconName" class="icon-item-small">
          <svg-icon :icon-class="iconName" />
          <span>{{ iconName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/auto-components/SvgIcon.vue";
import svg_icons from "@/utils/svg_icons.js";

defineOptions({
  name: "SvgTest",
});

// 检查是否有子目录图标
const hasSubdirIcons = computed(() => {
  return svg_icons.some(icon => icon.includes("-") && !icon.includes("_"));
});
</script>

<style lang="scss" scoped>
.svg-test {
  padding: 20px;

  .test-section {
    margin-bottom: 30px;

    h3 {
      margin-bottom: 15px;
      color: var(--el-text-color-primary);
    }
  }

  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
    padding: 15px;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;

    span {
      margin-top: 8px;
      font-size: 12px;
      color: var(--el-text-color-regular);
      text-align: center;
    }
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    max-height: 400px;
    padding: 15px;
    overflow-y: auto;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
  }

  .icon-item-small {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 5px;

    span {
      font-size: 12px;
      color: var(--el-text-color-regular);
    }
  }
}
</style>
