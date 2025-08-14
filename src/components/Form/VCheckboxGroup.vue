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
import { computed, watch } from "vue";

const props = defineProps({
  vid: {
    type: String,
    default: "",
  },
  label: {
    type: String,
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

const modelValue = defineModel({
  type: Array,
  default: () => [],
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
  if (!props.options?.length || !modelValue.value?.length) return "";

  return props.options
    .filter(opt => modelValue.value.includes(opt[props.valueKey]))
    .map(opt => opt[props.labelKey])
    .join(", ");
});

defineExpose({
  setError,
});
</script>
