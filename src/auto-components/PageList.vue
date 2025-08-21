<template>
  <div class="page-list">
    <div v-if="$slots.tabs" class="page-list__tabs">
      <slot name="tabs" />
    </div>
    <div v-if="$slots.search" class="page-list__search">
      <box-search>
        <slot name="search" />
      </box-search>
    </div>
    <div class="page-list__container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import BoxSearch from "@/auto-components/BoxSearch.vue";
</script>

<style lang="scss">
.page-list {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%; // 占满整个视口高度
  padding: 20px;
  background-color: #f5f7fa;

  &__tabs {
    flex-shrink: 0;
    padding: 0 20px;
    margin: -20px -20px 16px;
    background: #fff;
    //border-radius: 8px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 6%);

    // 美化tabs样式
    .el-tabs {
      .el-tabs__header {
        margin: 0;
        //border-bottom: 1px solid #e4e7ed;
      }

      .el-tabs__nav-wrap {
        &::after {
          display: none; // 隐藏默认底部边框
        }
      }

      .el-tabs__item {
        position: relative;
        height: 60px;
        padding: 0 24px;
        font-size: 15px;
        font-weight: 500;
        line-height: 60px;
        color: #606266;
        border: none;
        transition: all 0.3s ease;

        // 添加分隔线
        &:not(:last-child)::after {
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 20px;
          content: "";
          background-color: #e4e7ed;
          transition: opacity 0.3s ease;
          transform: translateY(-50%);
        }

        &:hover::after,
        &.is-active::after {
          opacity: 0;
        }
      }

      // 添加整体圆角和阴影效果
      .el-tabs__nav {
        overflow: hidden;
      }
    }
  }

  &__search {
    flex-shrink: 0; // 防止搜索区域被压缩，保持固定高度
    margin-bottom: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  }

  &__container {
    display: flex;
    flex: 1; // 占据剩余空间（总高度 - 搜索区域 - padding）
    flex-direction: column;
    min-height: 0; // 重要：允许flex子元素收缩
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  }
}

// 响应式设计
@media (width <= 768px) {
  .page-list {
    padding: 12px;

    &__search {
      .el-input {
        width: calc(50% - 6px);
        min-width: 160px;
      }

      .el-button {
        width: auto;
        min-width: 80px;
      }
    }
  }
}

@media (width <= 480px) {
  .page-list {
    &__search {
      .el-input {
        width: 100%;
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
