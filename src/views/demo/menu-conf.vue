<template>
  <div class="menu-config">
    <div class="page-header">
      <h2 class="title">菜单配置</h2>
      <el-button type="primary" @click="handleSave">保存配置</el-button>
    </div>
    <el-table :data="menuList" border row-key="id">
      <el-table-column label="菜单名称" min-width="200">
        <template #default="{ row }">
          <el-input v-model="row.title" placeholder="请输入菜单名称" />
        </template>
      </el-table-column>
      <el-table-column label="菜单地址" min-width="300">
        <template #default="{ row }">
          <el-input
            v-model="row.router"
            placeholder="请输入菜单地址"
            :disabled="!isExternalLink(row.router)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import user from "@/utils/user";

const menuList = ref([]);

const loadData = () => {
  const data = user.getMenu();
  menuList.value = Array.isArray(data) ? data : [];
};

const handleSave = () => {
  if (menuList.value.some(menu => !menu.title || !menu.router)) {
    return ElMessage.error("菜单名称和地址不能为空");
  }
  user.setMenu(menuList.value);
  ElMessage.success("保存成功");
  location.reload();
};

const isExternalLink = url => {
  return /^(https?:)?\/\//.test(url);
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.menu-config {
  max-width: 1000px;
  padding: 32px;
  margin: 48px auto 0;
  background-color: #fff;
  border-radius: 4px;
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

:deep(.el-table) {
  --el-table-border-color: var(--el-border-color-lighter);
}

:deep(.el-table__row--level-1) {
  background-color: var(--el-fill-color-light);
}
</style>
