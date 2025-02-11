<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <el-select
      v-if="editable"
      v-model="value"
      :placeholder="`请选择${label}`"
      v-bind="$attrs"
      @blur="handleBlur"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
    <span v-else>{{ displayValue }}</span>
  </el-form-item>
</template>

<script setup>
import { useField } from "vee-validate";
import { useRequired } from "@/composables/useForm.js";
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  editable: {
    type: Boolean,
    default: true,
  },
  labelKey: {
    type: String,
    default: "label",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  rules: {
    type: [String, Object, Array],
    default: "",
  },
});

const { value, errorMessage, handleBlur, setError } = useField(props.label, props.rules, {
  initialValue: props.modelValue,
});

const isRequired = useRequired(props.rules);

// 计算显示值
const displayValue = computed(() => {
  if (!props.options?.length) return "";

  // 处理多选
  if (Array.isArray(props.modelValue)) {
    return props.options
      .filter(opt => props.modelValue.includes(opt[props.valueKey]))
      .map(opt => opt[props.labelKey])
      .join(", ");
  }

  // 处理单选
  const option = props.options.find(opt => opt[props.valueKey] === props.modelValue);
  return option ? option[props.labelKey] : "";
});

defineExpose({
  setError,
});
</script>
