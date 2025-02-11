<template>
  <div class="mt-8">
    <div class="text-lg fw-600 mb-4 flex items-center gap-2">
      <el-icon class="text-primary"><Timer /></el-icon>
      最近活动
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.time"
        :type="activity.type"
      >
        {{ activity.content }}
      </el-timeline-item>
      <el-timeline-item v-if="!activities?.length">
        <el-empty description="暂无活动记录" />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { Timer } from "@element-plus/icons-vue";

defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
});
</script>
