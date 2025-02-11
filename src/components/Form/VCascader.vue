<template>
  <el-form-item :label="label + ':'" :error="errorMessage" :required="isRequired">
    <div class="w-full" @click="emit('click')">
      <el-cascader
        v-if="editable"
        v-model="value"
        class="w-full"
        :placeholder="`请选择${label}`"
        :props="mergedProps"
        v-bind="$attrs"
        @blur="handleBlur"
      />
      <span v-else>{{ displayValue }}</span>
    </div>
  </el-form-item>
</template>

<script setup>
import { useField } from "vee-validate";
import { useRequired } from "@/composables/useForm.js";
import { computed } from "vue";

const emit = defineEmits(["click"]);

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
  editable: {
    type: Boolean,
    default: true,
  },
  props: {
    type: Object,
    default: () => ({}),
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

// 默认配置
const defaultProps = {
  expandTrigger: "hover", // 展开触发方式
  multiple: false, // 是否多选
  checkStrictly: true, // 是否严格的遵守父子节点不互相关联
  emitPath: false, // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组
  lazy: false, // 是否动态加载子节点
  value: "value", // 指定选项的值为选项对象的某个属性值
  label: "label", // 指定选项标签为选项对象的某个属性值
  children: "children", // 指定选项的子选项为选项对象的某个属性值
};

// 合并 props
const mergedProps = computed(() => ({
  ...defaultProps,
  ...props.props,
}));

// 获取实际使用的键名
const valueKey = computed(() => mergedProps.value.value);
const labelKey = computed(() => mergedProps.value.label);
const childrenKey = computed(() => mergedProps.value.children);

const attrs = useAttrs();
// 计算显示值
const displayValue = computed(() => {
  if (!props.modelValue) return "";

  // 从 $attrs 中获取 options
  const options = attrs.options || [];
  if (!options.length) return "";

  // 处理多选
  if (Array.isArray(props.modelValue)) {
    return props.modelValue
      .map(value => {
        const findLabel = items => {
          for (const item of items) {
            if (item[valueKey.value] === value) return item[labelKey.value];
            if (item[childrenKey.value]) {
              const label = findLabel(item[childrenKey.value]);
              if (label) return label;
            }
          }
          return null;
        };
        return findLabel(options);
      })
      .filter(Boolean)
      .join(", ");
  }

  // 处理单选
  const findLabel = items => {
    for (const item of items) {
      if (item[valueKey.value] === props.modelValue) return item[labelKey.value];
      if (item[childrenKey.value]) {
        const label = findLabel(item[childrenKey.value]);
        if (label) return label;
      }
    }
    return "";
  };

  return findLabel(options);
});

defineExpose({
  setError,
});
</script>
