<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    :fullscreen="isFullscreen"
    width="50%"
    append-to-body
    @close="handleClose"
  >
    <template #header>
      <div class="flex-x-between">
        <span>通知公告详情</span>
        <div class="dialog-toolbar">
          <!-- 全屏/退出全屏按钮 -->
          <el-button circle @click="toggleFullscreen">
            <SvgIcon v-if="isFullscreen" icon-class="fullscreen-exit" />
            <SvgIcon v-else icon-class="fullscreen" />
          </el-button>
          <!-- 关闭按钮 -->
          <el-button circle @click="handleClose">
            <template #icon>
              <Close />
            </template>
          </el-button>
        </div>
      </div>
    </template>

    <el-descriptions :column="1">
      <el-descriptions-item label="标题：">
        {{ notice.title }}
      </el-descriptions-item>
      <el-descriptions-item label="发布状态：">
        <el-tag v-if="notice.publishStatus == 0" type="info">未发布</el-tag>
        <el-tag v-else-if="notice.publishStatus == 1" type="success">已发布</el-tag>
        <el-tag v-else-if="notice.publishStatus == -1" type="warning">已撤回</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="发布人：">
        {{ notice.publisherName }}
      </el-descriptions-item>
      <el-descriptions-item label="发布时间：">
        {{ notice.publishTime }}
      </el-descriptions-item>
      <el-descriptions-item label="公告内容：">
        <div class="notice-content" v-html="notice.content" />
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import NoticeAPI from "@/api/system/notice.js";
import SvgIcon from "@/auto-components/SvgIcon.vue";
import { Close } from "@element-plus/icons-vue";

const visible = ref(false);
const notice = ref({});
const isFullscreen = ref(false); // 控制全屏状态

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// 关闭弹窗
const handleClose = () => {
  visible.value = false;
};

// 接收公告详情
const openNotice = async id => {
  visible.value = true;
  notice.value = await NoticeAPI.getDetail(id);
};

defineExpose({
  openNotice,
});
</script>

<style scoped>
.notice-content {
  width: 100%;
  overflow-x: hidden;
}

/* 由于 v-html 内容不受 scoped 样式影响，需要使用 :deep() */
:deep(.notice-content img) {
  max-width: 100%;
  height: auto;
}
</style>
