<template>
  <el-form-item :label="label" :error="errorMessage" :required="isRequired">
    <WangEditor
      v-if="editable"
      v-model="value"
      :height="height"
      v-bind="$attrs"
      @blur="handleBlur"
    />
    <div v-else class="editor-readonly" v-html="modelValue" />
  </el-form-item>
</template>

<script setup>
import { useField } from "vee-validate";
import { useLabel, useRequired } from "@/composables/useForm.js";
import WangEditor from "@/components/WangEditor.vue";

const props = defineProps({
  vid: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  editable: {
    type: Boolean,
    default: true,
  },
  rules: {
    type: [String, Object, Array],
    default: "",
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "300px",
  },
});

const { value, errorMessage, handleBlur, setError } = useField(
  props.vid || props.label,
  props.rules,
  {
    initialValue: props.modelValue,
    label: props.label,
    validateOnValueUpdate: true,
    syncVModel: true,
  }
);

const isRequired = useRequired(props.rules);
const label = useLabel(props);

// 直接暴露 setError 方法，方便外部调用来主动设置错误
defineExpose({
  setError,
});
</script>

<style scoped lang="scss">
.editor-readonly {
  min-height: 100px;
  padding: 12px;
  line-height: 1.6;
  color: #606266;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  // 富文本内容样式
  :deep(p) {
    margin: 0 0 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(h1, h2, h3, h4, h5, h6) {
    margin: 16px 0 8px;

    &:first-child {
      margin-top: 0;
    }
  }

  :deep(ul, ol) {
    padding-left: 20px;
    margin: 8px 0;
  }

  :deep(blockquote) {
    padding: 8px 16px;
    margin: 8px 0;
    background-color: #f9fafc;
    border-left: 4px solid #e4e7ed;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  :deep(table) {
    width: 100%;
    margin: 8px 0;
    border-collapse: collapse;

    th,
    td {
      padding: 8px 12px;
      text-align: left;
      border: 1px solid #e4e7ed;
    }

    th {
      font-weight: 600;
      background-color: #f5f7fa;
    }
  }

  :deep(code) {
    padding: 2px 4px;
    font-family: Monaco, Menlo, "Ubuntu Mono", monospace;
    font-size: 0.9em;
    background-color: #f1f2f3;
    border-radius: 3px;
  }

  :deep(pre) {
    padding: 12px;
    margin: 8px 0;
    overflow-x: auto;
    background-color: #f1f2f3;
    border-radius: 4px;

    code {
      padding: 0;
      background: none;
    }
  }
}

// 暗黑模式适配
:deep(.dark) {
  .editor-readonly {
    color: #e2e8f0;
    background-color: #2d3748;
    border-color: #4a5568;

    :deep(blockquote) {
      background-color: #1a202c;
      border-left-color: #4a5568;
    }

    :deep(table) {
      th,
      td {
        border-color: #4a5568;
      }

      th {
        background-color: #2d3748;
      }
    }

    :deep(code) {
      color: #e2e8f0;
      background-color: #4a5568;
    }

    :deep(pre) {
      background-color: #4a5568;

      code {
        color: #e2e8f0;
      }
    }
  }
}
</style>
