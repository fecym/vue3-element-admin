<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svg_icons" :key="item">
            <copy-button :text="generateIconCode(item)">
              <el-tooltip effect="dark" :content="generateIconCode(item)" placement="top">
                <div class="icon-item">
                  <svg-icon :icon-class="item" />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </copy-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="(icon, name) of icons" :key="name">
            <copy-button :text="generateElementIconCode(name)">
              <el-tooltip effect="dark" :content="generateElementIconCode(name)" placement="top">
                <div class="icon-item">
                  <el-icon :size="20">
                    <component :is="icon" />
                  </el-icon>
                  <span>{{ name }}</span>
                </div>
              </el-tooltip>
            </copy-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SvgIcon from "@/auto-components/SvgIcon.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import CopyButton from "@/components/CopyButton.vue";
import svg_icons from "@/utils/svg_icons.js";

defineOptions({
  name: "Icons",
  inheritAttrs: false,
});

const icons = ref(ElementPlusIconsVue);

/**
 * 生成图标代码
 * @param {string} symbol - 图标标识
 * @returns {string} 图标代码
 */
function generateIconCode(symbol) {
  return `<svg-icon icon-class="${symbol}" />`;
}

/**
 * 生成 Element 图标代码
 * @param {string} symbol - 图标标识
 * @returns {string} 图标代码
 */
function generateElementIconCode(symbol) {
  return `<el-icon><${symbol} /></el-icon>`;
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    float: left;
    width: 100px;
    height: 85px;
    margin: 20px;
    font-size: 30px;
    color: var(--el-text-color-regular);
    text-align: center;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
