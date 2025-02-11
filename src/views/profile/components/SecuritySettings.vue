<template>
  <el-card class="backdrop-blur-sm bg-white/80 dark:bg-dark/20">
    <!-- 账户密码 -->
    <el-row class="security-item hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rd-lg transition-300">
      <el-col :span="16">
        <div class="fw-600 text-lg mb-2 flex items-center gap-2">
          <el-icon class="text-yellow"><Lock /></el-icon>
          账户密码
        </div>
        <div class="text-14px mt-2">
          定期修改密码有助于保护账户安全
          <el-button
            type="primary"
            plain
            size="small"
            class="ml-5 transform hover:scale-105 transition-300"
            @click="$emit('change-password')"
          >
            修改
          </el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 绑定手机 -->
    <div
      class="security-item hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rd-lg transition-300 mt-4"
    >
      <div class="fw-600 text-lg mb-2 flex items-center gap-2">
        <el-icon class="text-primary"><Phone /></el-icon>
        绑定手机
      </div>
      <div class="text-14px mt-2">
        <span v-if="userInfo.mobile">已绑定手机号：{{ userInfo.mobile }}</span>
        <span v-else>未绑定手机</span>
        <el-button
          type="primary"
          plain
          size="small"
          class="ml-5 transform hover:scale-105 transition-300"
          @click="$emit('change-mobile')"
        >
          {{ userInfo.mobile ? "更换" : "绑定" }}
        </el-button>
      </div>
    </div>

    <!-- 绑定邮箱 -->
    <div
      class="security-item hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rd-lg transition-300 mt-4"
    >
      <div class="fw-600 text-lg mb-2 flex items-center gap-2">
        <el-icon class="text-success"><Message /></el-icon>
        绑定邮箱
      </div>
      <div class="text-14px mt-2">
        <span v-if="userInfo.email">已绑定邮箱：{{ userInfo.email }}</span>
        <span v-else>未绑定邮箱</span>
        <el-button
          type="primary"
          plain
          size="small"
          class="ml-5 transform hover:scale-105 transition-300"
          @click="$emit('change-email')"
        >
          {{ userInfo.email ? "更换" : "绑定" }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Lock, Phone, Message } from "@element-plus/icons-vue";

defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

defineEmits(["change-password", "change-mobile", "change-email"]);
</script>

<style lang="scss" scoped>
.security-item {
  margin-bottom: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
}
</style>
