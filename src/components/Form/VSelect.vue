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
  type: [String, Number, Array],
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
  if (!props.options?.length) return "";

  // 处理多选
  if (Array.isArray(modelValue.value)) {
    return props.options
      .filter(opt => modelValue.value.includes(opt[props.valueKey]))
      .map(opt => opt[props.labelKey])
      .join(", ");
  }

  // 处理单选
  const option = props.options.find(opt => opt[props.valueKey] === modelValue.value);
  return option ? option[props.labelKey] : "";
});

defineExpose({
  setError,
});
</script>
