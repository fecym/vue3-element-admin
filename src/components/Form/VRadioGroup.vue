<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <el-radio-group v-if="editable" v-model="value" v-bind="$attrs" @blur="handleBlur">
      <el-radio v-for="option in options" :key="option[valueKey]" :value="option[valueKey]">
        {{ option[labelKey] }}
      </el-radio>
    </el-radio-group>
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
    type: [String, Number],
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
  if (!props.options?.length || !props.modelValue) return "";

  const option = props.options.find(opt => opt[props.valueKey] === props.modelValue);
  return option ? option[props.labelKey] : "";
});

defineExpose({
  setError,
});
</script>
