<template>
  <el-form-item :label="label" :error="errorMessage" :required="isRequired">
    <el-input
      v-if="editable"
      v-model="value"
      :placeholder="`请输入${label.slice(0, -1)}`"
      v-bind="$attrs"
      @blur="handleBlur"
    />
    <span v-else>{{ modelValue }}</span>
  </el-form-item>
</template>

<script setup>
import { useField } from "vee-validate";
import { useLabel, useRequired } from "@/composables/useForm.js";
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
  hideLabel: {
    type: Boolean,
    default: false,
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

// 监听modelValue变化，确保外部数据变化时能更新到组件内部
// watch(
//   () => props.modelValue,
//   newVal => {
//     if (newVal !== value.value) {
//       value.value = newVal;
//     }
//   }
// );

// 监听内部value变化，向外部发送更新事件
// const emit = defineEmits(["update:modelValue"]);
// watch(value, newVal => {
//   emit("update:modelValue", newVal);
// });

const isRequired = useRequired(props.rules);
const label = useLabel(props);

// 直接暴露 setError 方法，方便外部调用来主动设置错误
defineExpose({
  setError,
});
</script>
