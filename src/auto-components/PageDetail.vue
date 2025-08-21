<template>
  <div class="page-detail">
    <!-- 页面头部 -->
    <div class="page-detail__header">
      <div class="page-detail__header-content">
        <div class="page-detail__header-left">
          <div class="page-detail__title-wrapper">
            <h1 class="page-detail__title">
              <slot name="title">{{ title }}</slot>
            </h1>
            <div class="page-detail__title-decoration" />
          </div>
          <div class="page-detail__subtitle">
            <slot name="subtitle" />
          </div>
        </div>
        <div class="page-detail__header-right">
          <slot name="function" />
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="page-detail__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.page-detail {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f7fa;

  &__header {
    //border: 1px solid rgb(226 232 240 / 0.6);
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
    box-shadow:
      0 2px 4px rgb(0 0 0 / 6%),
      0 1px 2px rgb(0 0 0 / 4%);
    transition: all 0.3s ease;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 1px;
      content: "";
      background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
    }

    &:hover {
      box-shadow:
        0 4px 6px rgb(0 0 0 / 8%),
        0 2px 4px rgb(0 0 0 / 4%);
      transform: translateY(-1px);
    }
  }

  &__header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px;
  }

  &__header-left {
    flex: 1;
  }

  &__header-right {
    display: flex;
    flex-shrink: 0;
    gap: 8px;
    align-items: center;
    margin-left: 20px;
  }

  &__title-wrapper {
    position: relative;
    margin-bottom: 6px;
  }

  &__title {
    position: relative;
    display: inline-block;
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.3;
    color: #1e293b;
    letter-spacing: -0.015em;
  }

  &__title-decoration {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    border-radius: 1px;
    animation: slideIn 0.5s ease-out;
  }

  &__subtitle {
    margin-top: 4px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    color: #64748b;

    &:empty {
      display: none;
    }
  }

  &__content {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    padding: 16px;
    overflow: auto;

    .el-date-editor.el-input__wrapper {
      width: 100% !important;
    }
  }
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 40px;
    opacity: 1;
  }
}

// 响应式设计
@media (width <= 768px) {
  .page-detail {
    padding: 12px;

    &__header-content {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
      padding: 16px 20px;
    }

    &__header-right {
      justify-content: flex-end;
      width: 100%;
      margin-left: 0;
    }

    &__title {
      font-size: 20px;
    }

    &__title-decoration {
      width: 35px;
    }
  }
}

// 暗黑模式适配
:deep(.dark) {
  .page-detail {
    background-color: #0f172a;

    &__header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border-color: rgb(51 65 85 / 60%);
      box-shadow:
        0 2px 4px rgb(0 0 0 / 20%),
        0 1px 2px rgb(0 0 0 / 15%);

      &::before {
        background: linear-gradient(90deg, #60a5fa, #3b82f6, #a855f7);
      }

      &:hover {
        box-shadow:
          0 4px 6px rgb(0 0 0 / 25%),
          0 2px 4px rgb(0 0 0 / 20%);
      }
    }

    &__title {
      color: #f1f5f9;
    }

    &__title-decoration {
      background: linear-gradient(90deg, #60a5fa, #3b82f6);
    }

    &__subtitle {
      color: #94a3b8;
    }
  }
}
</style>
