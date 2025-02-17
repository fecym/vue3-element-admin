<template>
  <div class="micro-app-config">
    <div class="page-header">
      <h2 class="title">微前端子应用配置</h2>
      <el-button type="primary" @click="handleAdd">添加配置</el-button>
    </div>
    <el-form @submit.prevent="handleSave">
      <el-table :data="microApps" border>
        <el-table-column label="应用名称" min-width="200">
          <template #default="{ row, $index }">
            <v-input
              v-model="row.name"
              :vid="'应用名称' + $index"
              label="应用名称"
              hide-label
              rules="required"
              :disabled="row.default"
            />
          </template>
        </el-table-column>
        <el-table-column label="应用地址" min-width="300">
          <template #default="{ row, $index }">
            <v-input
              v-model="row.url"
              :vid="'应用地址' + $index"
              label="应用地址"
              hide-label
              rules="required|url"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row, $index }">
            <el-button
              :disabled="row.default"
              type="danger"
              link
              @click="handleDelete($index, row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="action-bar">
        <el-button type="primary" native-type="submit">保存配置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getMicroAppsConf, setMicroAppsConf } from "@/utils/microApp.js";
import VInput from "@/components/Form/VInput.vue";
import { useForm } from "vee-validate";
const { handleSubmit } = useForm();

const microApps = ref([]);

const loadData = () => {
  const data = getMicroAppsConf();
  microApps.value = Array.isArray(data) ? data : [];
};

const handleAdd = () => {
  const newApp = { name: "", url: "", id: Date.now() };
  microApps.value = [...microApps.value, newApp];
};

const handleDelete = (index, row) => {
  if (row.default) return;
  microApps.value = microApps.value.filter((_, i) => i !== index);
};

const handleSave = handleSubmit(values => {
  if (microApps.value.some(app => !app.name || !app.url)) {
    return ElMessage.error("应用名称和URL都不能为空");
  }
  setMicroAppsConf(microApps.value);
  ElMessage.success("保存成功");
});

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.micro-app-config {
  max-width: 1000px;
  padding: 24px;
  margin: 48px auto 0;
  background-color: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.action-bar {
  margin-top: 24px;
  text-align: right;
}

/* 表格相关样式 */
:deep(.el-input__wrapper) {
  border-radius: 0;
}

:deep(.el-table) {
  --el-table-border-color: var(--el-border-color-lighter);
}

:deep(.el-table .el-table__cell) {
  padding: 8px 0;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__error) {
  position: absolute;
  top: 100%;
  margin-top: 2px;
}

:deep(.el-table .cell) {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>

<style scoped>
.micro-app-config {
  max-width: 1000px;
  padding: 32px;
  background-color: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.title {
  font-size: 20px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.app-item {
  position: relative;
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.app-item:hover {
  border-color: var(--el-border-color);
}

.app-content {
  display: grid;
  grid-template-columns: 280px 1fr 80px;
  gap: 24px;
  align-items: flex-start;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.action-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.action-bar {
  margin-top: 24px;
  text-align: right;
}
</style>
