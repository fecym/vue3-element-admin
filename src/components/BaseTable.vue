<template>
  <div class="base-table">
    <el-table
      ref="tableRef"
      :row-key="rowKey"
      size="small"
      stripe
      :border="$attrs.border == null"
      v-bind="$attrs"
    >
      <el-table-column
        v-if="showSelection || $attrs.selection"
        key="selection"
        label="选择"
        type="selection"
        width="40"
        :reserve-selection="true"
        :selectable="selectable"
      />

      <slot name="start" />
      <el-table-column
        v-if="showIndex"
        key="index"
        :fixed="$attrs.indexFixed"
        :index="$attrs['indexMethod'] || $attrs['index-method'] || innerIndexMethod"
        :label="indexLabel"
        type="index"
        align="center"
        :width="indexWidth"
      />
      <el-table-column
        v-for="(item, index) in tableConf"
        :key="index"
        :align="item.align || 'center'"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        :width="item.width"
        :show-overflow-tooltip="
          item.showOverflowTooltip !== false ||
          !!$attrs.showOverflowTooltip ||
          !!$attrs['show-overflow-tooltip']
        "
      >
        <template #default="{ row }">
          <span v-if="item.func">{{ item.func(row) || "--" }}</span>
          <span v-else>{{ formatValue(row, item.prop) }}</span>
        </template>
      </el-table-column>
      <slot />
    </el-table>
    <el-pagination
      v-if="page"
      :small="pageSizeSmall"
      :current-page="+queryInfo.page"
      hide-on-single-page
      :page-size="+queryInfo.size"
      :total="+total"
      :layout="
        $attrs['size-change']
          ? `total, sizes, prev, pager, next, jumper`
          : `total, prev, pager, next, jumper`
      "
      @current-change="val => $emit('page-change', val)"
      @size-change="val => $emit('size-change', val)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  tableConf: {
    type: Array,
    default: () => [],
  },
  // 序号相关
  showIndex: {
    type: Boolean,
    default: true,
  },
  indexFixed: {
    type: [Boolean, String],
    default: true,
  },
  indexLabel: {
    type: String,
    default: "序号",
  },
  indexWidth: {
    type: [String, Number],
    default: "50",
  },
  page: {
    type: Boolean,
    default: true,
  },
  total: [String, Number],
  pageSizeSmall: {
    type: Boolean,
    default: false,
  },
  // 查询信息，分页必传，尤其是分页参数
  queryInfo: {
    type: Object,
    default: () => ({}),
  },
  // 选择相关
  selectable: {
    type: Function,
    default: function () {
      return true;
    },
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: String,
    default: "id",
  },
});

function innerIndexMethod(idx) {
  if (props.queryInfo.page && props.queryInfo.size) {
    return idx + 1 + (props.queryInfo.page - 1) * props.queryInfo.size;
  } else {
    return idx + 1;
  }
}

const tableRef = ref(null);

function getIns() {
  return tableRef.value;
}

function formatValue(row, prop) {
  if (!prop) return "--";
  if (prop.includes(".")) {
    const args = prop.split(".");
    let value = row;
    for (let i = 0; i < args.length; i++) {
      if (value?.[args[i]] !== undefined) {
        value = value[args[i]];
      } else {
        return "--";
      }
    }
    return getValue(value);
  }
  return getValue(row?.[prop]);
}

function getValue(val) {
  return isEmpty(val) ? "--" : val;
}

function isEmpty(val) {
  return val === null || val === undefined || val === "";
}
</script>

<style lang="scss" scoped>
.base-table {
  display: flex;
  // flex: 1; // 移除这行，让容器根据内容自适应
  flex-direction: column;
  height: 100%;
  min-height: 0;

  :deep(.el-table) {
    height: 100%;
    // flex: 1; // 移除这行，让表格根据内容自适应
    border-radius: 8px;

    &::before {
      display: none;
    }

    .el-table__inner-wrapper {
      height: 100%;
    }

    .el-table__header-wrapper {
      flex-shrink: 0;
    }

    .el-table__body-wrapper {
      // 添加最大高度限制，防止数据过多时撑破布局
      //max-height: 60vh;
      max-height: calc(100% - 52px);
      // flex: 1; // 移除这行
      overflow-y: auto;
    }

    th.el-table__cell {
      height: 50px;
      padding: 14px 0;
      font-weight: 600;
      color: #303133;
      background-color: #fafbfc;
      border-bottom: 1px solid #e4e7ed;
    }

    td.el-table__cell {
      height: 48px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f2f5;
    }

    .el-table__row {
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f8f9fa;
      }

      &:last-child td {
        //border-bottom: none;
      }
    }

    .el-button--link {
      padding: 4px 8px;
      margin: 0 2px;
      font-size: 13px;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        color: #409eff;
        background-color: #ecf5ff;
      }

      &:last-child:hover {
        color: #f56c6c;
        background-color: #fef0f0;
      }
    }
  }
}

:deep(.el-pagination) {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: auto; // 添加这行，让分页组件贴近表格
}
</style>
