<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <el-rate
      v-model="value"
      :placeholder="`请选择${label}`"
      v-bind="$attrs"
      @change="handleChange"
      @blur="handleBlur"
    />
  </el-form-item>
</template>

<script setup>
import { useField } from "vee-validate";
import { useRequired } from "@/composables/useForm.js";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  rules: {
    type: [String, Object, Array],
    default: "",
  },
});

// 自定义验证规则
const validateRate = value => {
  if (props.rules === "required" && (!value || value === 0)) {
    return `请选择${props.label}`;
  }
  return true;
};

const { value, errorMessage, handleBlur, setErrors } = useField(props.label, validateRate, {
  validateOnValueUpdate: false,
  validateOnMount: false,
  validateOnChange: true,
  validateOnBlur: true,
});

const isRequired = useRequired(props.rules);

// 处理评分变化
const handleChange = newValue => {
  if (!newValue || newValue === 0) {
    setErrors(`请选择${props.label}`);
  }
};

defineExpose({
  setErrors,
});
</script>
