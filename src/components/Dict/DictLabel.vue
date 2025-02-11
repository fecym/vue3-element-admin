<template>
  <template v-if="tagType">
    <el-tag :type="tagType" :size="tagSize">{{ label }}</el-tag>
  </template>
  <template v-else>
    <span>{{ label }}</span>
  </template>
</template>

<script setup>
import { useDictStore } from "@/store";

const dictStore = useDictStore();

const props = defineProps({
  code: String,
  modelValue: [String, Number],
  size: {
    type: String,
    default: "default",
  },
});

const label = ref("");
const tagType = ref();

const tagSize = ref(props.size);

const getLabelAndTagByValue = async (dictCode, value) => {
  // 先从本地缓存中获取字典数据
  const dictData = dictStore.getDictionary(dictCode);

  // 查找对应的字典项
  const dictEntry = dictData.find(item => item.value == value);
  return {
    label: dictEntry ? dictEntry.label : "",
    tag: dictEntry ? dictEntry.tagType : undefined,
  };
};

// 监听 props 的变化，获取并更新 label 和 tag
const fetchLabelAndTag = async () => {
  const result = await getLabelAndTagByValue(props.code, props.modelValue);
  label.value = result.label;
  tagType.value = result.tag;
};

// 首次挂载时获取字典数据
onMounted(fetchLabelAndTag);

// 当 modelValue 发生变化时重新获取
watch(() => props.modelValue, fetchLabelAndTag);
</script>
