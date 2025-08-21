<template>
  <div
    class="box-wrap"
    :class="{
      'box-wrap--form': form,
      'box-wrap--custom': custom,
      'box-wrap--compact': compact,
      'box-wrap--small': small,
    }"
  >
    <!-- 标题栏 -->
    <div v-if="$slots.title || title" class="box-wrap__header">
      <div class="box-wrap__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="box-wrap__function">
        <slot name="function" />
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="box-wrap__content">
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
  form: {
    type: Boolean,
    default: false,
  },
  custom: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.box-wrap {
  margin-bottom: 16px;
  overflow: hidden;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  transition: all 0.3s ease;

  :deep(.box-search) {
    min-height: 0;
    padding: 0;
  }

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
  }

  // 当在网格容器中时，调整样式
  .grid-container & {
    height: 100%; // 确保同行的组件高度一致
    margin-bottom: 0;
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background: #fafbfc; // 使用更简洁的背景色
    border-bottom: 1px solid #e2e8f0; // 使用更柔和的边框色

    // 移除左侧的蓝色条纹
    // &::before {
    //   content: "";
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width: 4px;
    //   height: 100%;
    //   background: linear-gradient(180deg, #3b82f6, #1d4ed8);
    // }
  }

  &__title {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 0;
    font-size: 18px; // 增大字体
    font-weight: 600;
    color: #1a202c; // 使用更深的颜色

    // 移除标题前的小圆点
    // &::before {
    //   content: "";
    //   width: 6px;
    //   height: 6px;
    //   background: #3b82f6;
    //   border-radius: 50%;
    //   display: inline-block;
    // }
  }

  &__function {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__content {
    padding: 24px;
  }

  // 表单样式
  &--form {
    .box-wrap__content {
      //padding: 32px 24px;
    }

    .el-form {
      .el-form-item {
        margin-bottom: 24px;

        .el-form-item__label {
          font-weight: 500;
          color: #374151;
        }
      }

      .el-input,
      .el-textarea,
      .el-select {
        .el-input__wrapper,
        .el-textarea__inner {
          border-radius: 8px;
          transition: all 0.3s ease;

          &:hover {
            box-shadow: 0 0 0 1px #3b82f6;
          }

          &:focus-within {
            box-shadow: 0 0 0 2px rgb(59 130 246 / 20%);
          }
        }
      }
    }
  }

  // 自定义内容样式
  &--custom {
    .box-wrap__content {
      padding: 0;
    }
  }

  // 紧凑模式 - 适合多列布局
  &--compact {
    .box-wrap__header {
      padding: 16px 20px;
    }

    .box-wrap__content {
      padding: 20px;
    }

    .box-wrap__title {
      font-size: 15px;
      font-weight: 500;
    }

    &.box-wrap--form .box-wrap__content {
      padding: 24px 20px;
    }
  }

  // 小尺寸模式 - 适合多个并排
  &--small {
    border-radius: 8px;
    box-shadow: 0 1px 4px rgb(0 0 0 / 4%);

    &:hover {
      box-shadow: 0 2px 6px rgb(0 0 0 / 6%);
    }

    .box-wrap__header {
      padding: 12px 16px;

      &::before {
        width: 3px;
      }
    }

    .box-wrap__content {
      padding: 16px;
    }

    .box-wrap__title {
      font-size: 14px;
      font-weight: 500;

      &::before {
        width: 4px;
        height: 4px;
      }
    }

    &.box-wrap--form .box-wrap__content {
      padding: 20px 16px;
    }
  }
}

// 阴影容器（用于内部卡片）
.box-shadow {
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 4%);
  transition: all 0.3s ease;

  &:hover {
    border-color: #e5e7eb;
    box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  }
}

// 响应式设计
@media (width <= 768px) {
  .box-wrap {
    border-radius: 8px;

    &__header {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
      padding: 16px 20px;
    }

    &__function {
      justify-content: flex-end;
      width: 100%;
    }

    &__content {
      padding: 20px;
    }

    &--form .box-wrap__content {
      padding: 24px 20px;
    }

    // 移动端下紧凑和小尺寸模式的调整
    &--compact,
    &--small {
      .box-wrap__header {
        padding: 12px 16px;
      }

      .box-wrap__content {
        padding: 16px;
      }
    }
  }
}

// 暗黑模式适配
:deep(.dark) {
  .box-wrap {
    background: #1f2937;
    border: 1px solid #374151;

    &__header {
      background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
      border-bottom-color: #4b5563;

      &::before {
        background: linear-gradient(180deg, #60a5fa, #3b82f6);
      }
    }

    &__title {
      color: #f9fafb;

      &::before {
        background: #60a5fa;
      }
    }
  }

  .box-shadow {
    background: #374151;
    border-color: #4b5563;

    &:hover {
      border-color: #6b7280;
    }
  }
}
</style>
