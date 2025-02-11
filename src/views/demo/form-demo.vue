<template>
  <div class="p-6 h-full">
    <el-card class="mb-4 h-full">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-medium">表单示例</span>
          <el-tag type="info" effect="plain">包含多种表单组件</el-tag>
        </div>
      </template>

      <el-scrollbar height="calc(100vh - 210px)">
        <el-form label-width="120px" class="p-6" @submit.prevent="onSubmit">
          <div class="mx-auto" style="max-width: 1000px">
            <div class="grid grid-cols-2 gap-6">
              <!-- 基础输入框 -->
              <VInput
                v-model="info.username"
                label="用户名"
                :editable="true"
                rules="required|min:3|max:20"
              />

              <!-- 下拉选择器 -->
              <VSelect
                v-model="info.role"
                :editable="true"
                label="角色"
                multiple
                :options="roles"
                rules="required"
              />

              <!-- 级联选择器 -->
              <VCascader
                v-model="info.area"
                label="地区"
                :options="areaOptions"
                :props="{
                  multiple: false,
                  checkStrictly: true,
                  emitPath: false,
                }"
                rules="required"
              />

              <!-- 单选按钮组 -->
              <VRadioGroup
                v-model="info.gender"
                label="性别"
                :options="genderOptions"
                rules="required"
              />

              <!-- 多选框组 -->
              <VCheckboxGroup
                v-model="info.hobbies"
                label="兴趣爱好"
                :options="hobbyOptions"
                rules="required"
              />

              <!-- 日期选择器 -->
              <VDatePicker v-model="info.birthday" label="生日" type="daterange" rules="required" />

              <!-- 评分组件 -->
              <VRate v-model="info.score" label="评分" :count="5" rules="required" />
            </div>

            <!-- 表单操作按钮 -->
            <div class="flex justify-center gap-4 mt-8">
              <el-button type="primary" native-type="submit" :icon="Check">提交</el-button>
              <el-button type="info" :icon="Refresh" @click="resetForm">重置</el-button>
            </div>

            <!-- 调试信息 -->
            <div class="mt-8 p-4 bg-gray-50 rounded">
              <el-descriptions title="表单数据" :column="1" border>
                <el-descriptions-item v-for="(value, key) in info" :key="key" :label="key">
                  {{ JSON.stringify(value) }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-form>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { Check, Refresh } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import VInput from "@/components/Form/VInput.vue";
import VSelect from "@/components/Form/VSelect.vue";
import VCascader from "@/components/Form/VCascader.vue";
import VRadioGroup from "@/components/Form/VRadioGroup.vue";
import VCheckboxGroup from "@/components/Form/VCheckboxGroup.vue";
import VDatePicker from "@/components/Form/VDatePicker.vue";
import VRate from "@/components/Form/VRate.vue";

const { handleSubmit, resetForm } = useForm();

// 角色选项
const roles = [
  { label: "管理员", value: "admin" },
  { label: "用户", value: "user" },
  { label: "其他", value: "other" },
];

// 地区选项
const areaOptions = [
  {
    value: "guangdong",
    label: "广东省",
    children: [
      {
        value: "guangzhou",
        label: "广州市",
        children: [
          { value: "tianhe", label: "天河区" },
          { value: "haizhu", label: "海珠区" },
        ],
      },
    ],
  },
];

// 性别选项
const genderOptions = [
  { label: "男", value: 1 },
  { label: "女", value: 2 },
];

// 兴趣爱好选项
const hobbyOptions = [
  { label: "阅读", value: "reading" },
  { label: "音乐", value: "music" },
  { label: "运动", value: "sports" },
];

// 表单数据
const info = reactive({
  username: "这是名称哦",
  role: ["admin", "user"],
  area: [],
  gender: "",
  hobbies: [],
  birthday: [],
  score: 0,
});

// 提交处理
const onSubmit = handleSubmit(values => {
  console.log("表单数据:", values, info);
  ElMessage.success("提交成功");
});
</script>

<style scoped>
.el-form :deep(.el-form-item) {
  @apply mb-4;
}

.el-card :deep(.el-card__header) {
  @apply p-4 bg-gray-50;
}
</style>
