<!--
 * wangEditor 富文本编辑器组件
 * Copyright © 2021-present 有来开源组织
 * 
 * 本组件基于 wangEditor-next 进行二次封装，支持 Vue 3.x
 * 作者：有来开源-Ray 
 *
 * 使用请保留本段注释，感谢支持开源！
 * 参考官方示例：https://stackblitz.com/edit/vue3-wangeditor-demo-8emmc7?file=src%2Fcomponents%2FBasicEditor.vue
 * 
 * 开源协议：MIT License
 * 详情参见：https://opensource.org/licenses/MIT
 -->

<template>
  <div style="z-index: 999; border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      mode="simple"
      :default-config="toolbarConfig"
      style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
      v-model="modelValue"
      :style="{ height: height, overflowY: 'hidden' }"
      :default-config="editorConfig"
      mode="simple"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup>
import "@wangeditor-next/editor/dist/css/style.css";
import { Toolbar, Editor } from "@wangeditor-next/editor-for-vue";

// 文件上传 API
import FileAPI from "@/api/file.js";

defineProps({
  height: {
    type: String,
    default: "500px",
  },
});

const emit = defineEmits(["update:modelValue"]);

// 双向绑定
const modelValue = defineModel("modelValue", {
  type: String,
  required: false,
});

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 工具栏配置
const toolbarConfig = ref({});

// 编辑器配置
const editorConfig = ref({
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      customUpload(file, insertFn) {
        // 上传图片
        FileAPI.upload(file).then(res => {
          // 插入图片
          insertFn(res.url, res.name, res.url);
        });
      },
    },
  },
});

// 记录 editor 实例，重要！
const handleCreated = editor => {
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
