<template>
  <div class="page-list">
    <div class="page-list__search">
      <div class="search-content">
        <slot name="search" />
      </div>
    </div>
    <div class="page-list__container">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.page-list {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%; // 占满整个视口高度
  padding: 20px;
  background-color: #f5f7fa;

  &__search {
    flex-shrink: 0; // 防止搜索区域被压缩，保持固定高度
    margin-bottom: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 6%);

    .search-content {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      min-height: 52px;
      padding: 20px;

      .el-button + .el-button {
        margin: 0;
      }

      .el-input {
        flex-shrink: 0;
        width: 200px;
      }

      .el-button {
        flex-shrink: 0;

        &:hover {
          box-shadow: 0 2px 6px rgb(64 158 255 / 30%);
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
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
