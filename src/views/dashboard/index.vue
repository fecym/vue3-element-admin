<template>
  <div class="dashboard-container p-4">
    <!-- 数据概览卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <el-card
        v-for="(item, index) in statistics"
        :key="index"
        class="stat-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center">
          <el-icon :class="['text-3xl mr-4 stat-icon', item.iconClass]">
            <component :is="item.icon" />
          </el-icon>
          <div class="flex-1">
            <div class="text-gray-500 text-sm mb-1">{{ item.title }}</div>
            <div class="flex items-end">
              <span class="text-2xl font-bold mr-2 stat-value">{{ item.value }}</span>
              <span class="text-sm" :class="item.trend > 0 ? 'text-green-500' : 'text-red-500'">
                {{ item.trend > 0 ? "+" : "" }}{{ item.trend }}%
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <!-- 访问趋势图 -->
      <el-card class="h-80 chart-card">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="font-medium">访问趋势</span>
            <el-radio-group v-model="visitTrendType" size="small">
              <el-radio-button value="week">本周</el-radio-button>
              <el-radio-button value="month">本月</el-radio-button>
              <el-radio-button value="year">全年</el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <div ref="visitTrendRef" class="w-full h-60" />
      </el-card>

      <!-- 用户分布图 -->
      <el-card class="h-80 chart-card">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="font-medium">用户分布</span>
            <el-button-group>
              <el-button
                size="small"
                :type="userDistType === 'gender' ? 'primary' : ''"
                class="hover:scale-105 transition-transform"
                @click="userDistType = 'gender'"
              >
                性别分布
              </el-button>
              <el-button
                size="small"
                :type="userDistType === 'age' ? 'primary' : ''"
                class="hover:scale-105 transition-transform"
                @click="userDistType = 'age'"
              >
                年龄分布
              </el-button>
            </el-button-group>
          </div>
        </template>
        <div ref="userDistRef" class="w-full h-60" />
      </el-card>
    </div>

    <!-- 最近动态 -->
    <el-card class="timeline-card">
      <template #header>
        <div class="font-medium">最近动态</div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in recentActivities"
          :key="index"
          :type="activity.type"
          :timestamp="activity.timestamp"
          class="timeline-item hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { useAppStore } from "@/store/modules/app";
import { statistics, recentActivities } from "./utils/constants.js";
import { getVisitTrendOption, getUserDistOptions } from "./utils/echarts-options.js";

// 访问趋势图
const visitTrendRef = ref(null);
const visitTrendType = ref("week");
let visitTrendChart = null;

// 用户分布图
const userDistRef = ref(null);
const userDistType = ref("gender");
let userDistChart = null;

// 初始化访问趋势图
const initVisitTrendChart = () => {
  if (visitTrendChart) {
    visitTrendChart.dispose();
  }

  visitTrendChart = echarts.init(visitTrendRef.value);
  visitTrendChart.setOption(getVisitTrendOption());
};

// 初始化用户分布图
const initUserDistChart = () => {
  if (userDistChart) {
    userDistChart.dispose();
  }

  userDistChart = echarts.init(userDistRef.value);
  const options = getUserDistOptions();
  userDistChart.setOption(options[userDistType.value]);
};

// 监听窗口大小变化
const handleResize = () => {
  visitTrendChart?.resize();
  userDistChart?.resize();
};

// 监听主题变化
const appStore = useAppStore();
watch(
  () => appStore.theme,
  () => {
    nextTick(() => {
      initVisitTrendChart();
      initUserDistChart();
    });
  }
);

// 监听图表类型变化
watch([visitTrendType, userDistType], () => {
  nextTick(() => {
    if (visitTrendType.value) initVisitTrendChart();
    if (userDistType.value) initUserDistChart();
  });
});

onMounted(() => {
  initVisitTrendChart();
  initUserDistChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  visitTrendChart?.dispose();
  userDistChart?.dispose();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  :deep(.el-card) {
    background: rgb(255 255 255 / 90%);
    backdrop-filter: blur(10px);
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 5%);
    transition: all 0.3s;

    .el-card__header {
      padding: 12px 20px;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
  }

  .stat-card {
    .stat-icon {
      animation: bounce 2s infinite;
    }

    .stat-value {
      background: linear-gradient(120deg, var(--el-color-primary), var(--el-color-primary-light-5));
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .chart-card {
    &:hover {
      box-shadow: 0 8px 24px rgb(0 0 0 / 12%);
      transform: translateY(-5px);
    }
  }

  .timeline-card {
    .timeline-item {
      cursor: pointer;

      &:hover {
        .el-timeline-item__timestamp {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

// 暗黑模式适配
:deep(.dark) {
  .el-card {
    background: rgb(30 30 30 / 90%);
  }

  .stat-value {
    background: linear-gradient(
      120deg,
      var(--el-color-primary-light-3),
      var(--el-color-primary-light-8)
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
