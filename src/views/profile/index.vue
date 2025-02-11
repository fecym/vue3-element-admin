<template>
  <div
    class="app-container bg-gradient-from-#f0f7ff-to-#f5f3ff dark:bg-gradient-from-#1a1a1a-to-#2d2d2d"
  >
    <el-tabs tab-position="left">
      <!-- 基本设置 Tab -->
      <el-tab-pane label="账号信息">
        <div class="w-full">
          <el-card class="backdrop-blur-sm bg-white/80 dark:bg-dark/20">
            <!-- 用户基本信息 -->
            <UserInfo
              :user-info="userProfile"
              @update-avatar="handleUpdateAvatar"
              @edit-profile="handleOpenDialog(DialogType.ACCOUNT)"
            />

            <!-- 用户详细信息 -->
            <UserDetails :user-info="userProfile" />

            <!-- 最近活动 -->
            <RecentActivities :activities="recentActivities" />
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 安全设置 Tab -->
      <el-tab-pane label="安全设置">
        <SecuritySettings
          :user-info="userProfile"
          @change-password="handleOpenDialog(DialogType.PASSWORD)"
          @change-mobile="handleOpenDialog(DialogType.MOBILE)"
          @change-email="handleOpenDialog(DialogType.EMAIL)"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 弹窗组件 -->
    <AccountDialog
      v-if="dialog.type === DialogType.ACCOUNT"
      v-model="dialog.visible"
      :user-info="userProfile"
      @success="handleDialogSuccess"
    />
    <PasswordDialog
      v-if="dialog.type === DialogType.PASSWORD"
      v-model="dialog.visible"
      @success="handleDialogSuccess"
    />
    <MobileDialog
      v-if="dialog.type === DialogType.MOBILE"
      v-model="dialog.visible"
      @success="handleDialogSuccess"
    />
    <EmailDialog
      v-if="dialog.type === DialogType.EMAIL"
      v-model="dialog.visible"
      @success="handleDialogSuccess"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import UserAPI from "@/api/system/user";
import UserInfo from "./components/UserInfo.vue";
import UserDetails from "./components/UserDetails.vue";
import RecentActivities from "./components/RecentActivities.vue";
import SecuritySettings from "./components/SecuritySettings.vue";
import AccountDialog from "./components/dialogs/AccountDialog.vue";
import PasswordDialog from "./components/dialogs/PasswordDialog.vue";
import MobileDialog from "./components/dialogs/MobileDialog.vue";
import EmailDialog from "./components/dialogs/EmailDialog.vue";
import { ElMessage } from "element-plus";

const userProfile = ref({});
const recentActivities = ref([
  {
    content: "登录系统",
    time: "2024-03-20 10:30:00",
    type: "primary",
  },
  {
    content: "修改密码",
    time: "2024-03-19 15:20:00",
    type: "warning",
  },
  {
    content: "更新头像",
    time: "2024-03-18 09:15:00",
    type: "success",
  },
]);

const dialog = reactive({
  visible: false,
  type: "",
});

const DialogType = {
  ACCOUNT: "account",
  PASSWORD: "password",
  MOBILE: "mobile",
  EMAIL: "email",
};

// 打开弹窗
const handleOpenDialog = type => {
  dialog.type = type;
  dialog.visible = true;
};

// 弹窗成功回调
const handleDialogSuccess = () => {
  dialog.visible = false;
  loadUserProfile();
};

// 更新头像
const handleUpdateAvatar = async avatarUrl => {
  try {
    await UserAPI.updateProfile({ avatar: avatarUrl });
    userProfile.value.avatar = avatarUrl;
  } catch (error) {
    ElMessage.error("头像更新失败");
  }
};

// 加载用户信息
const loadUserProfile = async () => {
  const data = await UserAPI.getProfile();
  userProfile.value = data;
};

onMounted(() => {
  loadUserProfile();
});
</script>

<style lang="scss" scoped>
.app-container {
  height: calc(100vh - 50px);
  background: var(--el-fill-color-blank);
}

.hasTagsView {
  .app-container {
    height: calc(100vh - 84px);
  }
}
</style>
