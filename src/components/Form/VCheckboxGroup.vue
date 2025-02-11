<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <el-checkbox-group v-if="editable" v-model="value" v-bind="$attrs" @blur="handleBlur">
      <el-checkbox v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
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
    type: Array,
    default: () => [],
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
  if (!props.options?.length || !props.modelValue?.length) return "";

  return props.options
    .filter(opt => props.modelValue.includes(opt[props.valueKey]))
    .map(opt => opt[props.labelKey])
    .join(", ");
});

defineExpose({
  setError,
});
</script>
