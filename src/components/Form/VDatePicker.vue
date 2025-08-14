<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <el-date-picker
      v-if="editable"
      v-model="value"
      :placeholder="`请选择${label}`"
      v-bind="$attrs"
      start-placeholder="请选择"
      end-placeholder="请选择"
      @blur="handleBlur"
    />
    <span v-else>{{ displayValue }}</span>
  </el-form-item>
</template>

<script setup>
import { useField } from "vee-validate";
import { useRequired } from "@/composables/useForm.js";
import { computed, watch } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  vid: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  editable: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: "YYYY-MM-DD",
  },
  rules: {
    type: [String, Object, Array],
    default: "",
  },
});

const modelValue = defineModel({
  type: [String, Array, Date],
  default: "",
});

const { value, errorMessage, handleBlur, setError } = useField(
  props.vid || props.label,
  props.rules,
  {
    initialValue: modelValue.value,
    label: props.label,
  }
);

// 双向同步 modelValue 和 useField 的 value
watch(modelValue, newVal => {
  if (newVal !== value.value) {
    value.value = newVal;
  }
});

watch(value, newVal => {
  if (newVal !== modelValue.value) {
    modelValue.value = newVal;
  }
});

const isRequired = useRequired(props.rules);

// 计算显示值
const displayValue = computed(() => {
  if (!modelValue.value) return "";

  // 处理日期范围
  if (Array.isArray(modelValue.value)) {
    return modelValue.value.map(date => dayjs(date).format(props.format)).join(" 至 ");
  }

  // 处理单个日期
  return dayjs(modelValue.value).format(props.format);
});

defineExpose({
  setError,
});
</script>
