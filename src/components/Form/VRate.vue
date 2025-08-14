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
import { watch } from "vue";

const props = defineProps({
  vid: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  rules: {
    type: [String, Object, Array],
    default: "",
  },
});

const modelValue = defineModel({
  type: Number,
  default: 0,
});

// 自定义验证规则
const validateRate = value => {
  if (props.rules === "required" && (!value || value === 0)) {
    return `请选择${props.label}`;
  }
  return true;
};

const { value, errorMessage, handleBlur, setErrors } = useField(
  props.vid || props.label,
  validateRate,
  {
    initialValue: modelValue.value,
    validateOnValueUpdate: false,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
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
