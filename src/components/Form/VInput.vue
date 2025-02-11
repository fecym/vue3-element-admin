<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <el-input
      v-if="editable"
      v-model="value"
      :placeholder="`请输入${label}`"
      v-bind="$attrs"
      @blur="handleBlur"
    />
    <span v-else>{{ modelValue }}</span>
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
  modelValue: {
    type: [String, Number],
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
});

const { value, errorMessage, handleBlur, setError } = useField(props.label, props.rules, {
  initialValue: props.modelValue,
});

const isRequired = useRequired(props.rules);

// 直接暴露 setError 方法，方便外部调用来主动设置错误
defineExpose({
  setError,
});
</script>
