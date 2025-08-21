<template>
  <div
    v-if="domRender()"
    ref="chartRef"
    style="height: 100%; min-height: 300px"
    class="render-chart"
  />
  <el-empty v-else style="height: 100%; min-height: 300px" />
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

// Props定义
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

// Emits定义
const emit = defineEmits(["ready"]);

// 响应式数据
const chartRef = ref(null);
const chart = ref(null);
const isInitialized = ref(false);
const resizeTimer = ref(null);

// 方法
const domRender = () => {
  return !!props.options.series?.length || !!props.options.series?.data;
};

// 检查DOM是否准备好
const isDomReady = () => {
  const el = chartRef.value;
  if (!el) return false;

  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

// 安全的resize处理
const handleResize = () => {
  if (resizeTimer.value) {
    clearTimeout(resizeTimer.value);
  }

  resizeTimer.value = setTimeout(() => {
    if (chart.value && isInitialized.value && !chart.value.isDisposed()) {
      try {
        // 关键修复：先清空再resize
        chart.value.clear();
        chart.value.resize();
        // 重新设置配置
        if (props.options) {
          chart.value.setOption(props.options, true);
        }
      } catch (error) {
        // 忽略resize错误，避免控制台报错
        console.debug("Chart resize skipped:", error.message);
      }
    }
  }, 100);
};

// 延迟初始化图表
const initChart = async () => {
  const el = chartRef.value;
  if (!el || chart.value) return;

  await nextTick();

  let retryCount = 0;
  const maxRetries = 5;

  const tryInit = () => {
    if (!isDomReady()) {
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(tryInit, 100);
        return;
      } else {
        console.warn("ECharts容器初始化失败：DOM尺寸为0");
        return;
      }
    }

    try {
      chart.value = echarts.init(el);
      isInitialized.value = true;
      setOptions();
      window.addEventListener("resize", handleResize);
      emit("ready", chart.value);
    } catch (error) {
      console.error("ECharts初始化失败:", error);
    }
  };

  tryInit();
};

const setOptions = options => {
  if (!chart.value || !isInitialized.value) return;

  try {
    if (chart.value.isDisposed()) {
      return;
    }

    chart.value.clear();
    chart.value.setOption(props.options || options, true);
  } catch (error) {
    console.debug("Chart setOption skipped:", error.message);
  }
};

// 监听器
watch(
  () => props.options,
  val => {
    if (!val) return;

    nextTick(() => {
      if (!isInitialized.value) {
        initChart();
      } else {
        setOptions();
      }
    });
  },
  { deep: true, immediate: true }
);

// 生命周期钩子
onMounted(() => {
  setTimeout(() => {
    initChart();
  }, 50);
});

onBeforeUnmount(() => {
  if (resizeTimer.value) {
    clearTimeout(resizeTimer.value);
  }

  window.removeEventListener("resize", handleResize);

  if (chart.value && !chart.value.isDisposed()) {
    chart.value.dispose();
  }
  chart.value = null;
  isInitialized.value = false;
});
</script>

<style scoped>
.render-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
