<template>
  <div class="flex items-start gap-8 mb-8 relative overflow-hidden">
    <!-- 头像背景装饰 -->
    <div
      class="absolute -top-60px -left-60px w-120px h-120px rounded-full bg-gradient-to-r from-primary-light-3 to-primary op-10 blur-md"
    />
    <div
      class="absolute -bottom-40px -right-40px w-80px h-80px rounded-full bg-gradient-to-l from-success-light-3 to-success op-10 blur-md"
    />
    <div
      class="absolute top-20px right-20px w-30px h-30px rounded-full bg-warning op-10 animate-pulse"
    />

    <div class="relative group">
      <el-avatar
        :src="userInfo.avatar"
        :size="120"
        class="ring-4 ring-white/80 transition-300 group-hover:scale-105 group-hover:rotate-6"
      />
      <!-- 在线状态标记 -->
      <div
        class="absolute -bottom-2px -right-2px w-4 h-4 rounded-full bg-success border-2 border-white animate-pulse"
      />
      <div
        class="absolute bottom-0 right-0 cursor-pointer op-0 group-hover:op-100 transition-300"
        @click="handleUpload"
      >
        <el-button
          type="primary"
          circle
          :icon="Camera"
          size="small"
          class="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all-300"
        />
      </div>
      <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
    </div>

    <!-- 用户信息 -->
    <div class="flex-1 pt-2">
      <div class="text-xl fw-600 flex items-center gap-2">
        {{ userInfo.nickname }}
        <el-icon
          class="cursor-pointer text-gray-400 hover:text-primary transition-300"
          @click="$emit('edit-profile')"
        >
          <Edit />
        </el-icon>
      </div>
      <!-- 角色标签 -->
      <div class="mt-2 flex items-center gap-2">
        <el-tag
          v-for="role in userInfo.roleNames?.split(',')"
          :key="role"
          type="success"
          class="transform hover:scale-105 transition-300"
          effect="light"
        >
          {{ role }}
        </el-tag>
      </div>
      <!-- 登录时间 -->
      <div class="mt-3 text-gray-400 text-14px flex items-center gap-1">
        <el-icon>
          <Timer />
        </el-icon>
        最后登录: {{ userInfo.lastLoginTime || "暂无记录" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Camera, Edit, Timer } from "@element-plus/icons-vue";
import FileAPI from "@/api/file";
import { ElMessage } from "element-plus";

defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-avatar", "edit-profile"]);
const fileInput = ref(null);

const handleUpload = () => {
  fileInput.value?.click();
};

const handleFileChange = async event => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const { url } = await FileAPI.upload(file);
      emit("update-avatar", url);
    } catch (error) {
      ElMessage.error("头像上传失败");
    }
  }
};
</script>
