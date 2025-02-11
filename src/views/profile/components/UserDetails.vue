<template>
  <el-descriptions :column="1" class="mt-6 info-list" border>
    <el-descriptions-item>
      <template #label>
        <el-icon class="align-middle text-primary"><User /></el-icon>
        用户名
      </template>
      {{ userInfo.username }}
      <el-icon v-if="userInfo.gender === 1" class="align-middle text-blue ml-2">
        <Male />
      </el-icon>
      <el-icon v-else class="align-middle text-pink ml-2">
        <Female />
      </el-icon>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <el-icon class="align-middle text-primary"><Phone /></el-icon>
        手机号码
      </template>
      {{ userInfo.mobile }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <el-icon class="align-middle text-primary"><Message /></el-icon>
        邮箱
      </template>
      {{ userInfo.email }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <SvgIcon icon-class="tree" class="text-primary" />
        部门
      </template>
      {{ userInfo.deptName }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <SvgIcon icon-class="role" class="text-primary" />
        角色
      </template>
      {{ userInfo.roleNames }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <el-icon class="align-middle text-primary"><Timer /></el-icon>
        创建日期
      </template>
      {{ userInfo.createTime }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { User, Phone, Message, Timer, Male, Female } from "@element-plus/icons-vue";
import SvgIcon from "@/auto-components/SvgIcon.vue";

defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.info-list {
  :deep(.el-descriptions__cell) {
    transition: background-color 0.3s;
  }

  :deep(.el-descriptions__row:hover) {
    background-color: var(--el-fill-color-light);
  }
}
</style>
