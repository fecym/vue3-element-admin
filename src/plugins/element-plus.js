import { ElTable, ElTableColumn, ElSelect, ElInput, ElCascader } from "element-plus";

ElTable.props.showOverflowTooltip = {
  ...ElTable.props.showOverflowTooltip,
  default: true,
};

ElTableColumn.props = {
  ...ElTableColumn.props,
  formatter: {
    type: Function,
    default: (row, column, cellValue) => {
      return [null, undefined, ""].includes(cellValue) ? "--" : String(cellValue);
    },
  },
};

ElInput.props = {
  ...ElInput.props,
  clearable: {
    type: Boolean,
    default: true,
  },
};

ElSelect.props = {
  ...ElSelect.props,
  collapseTags: {
    type: Boolean,
    default: true,
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
};

ElCascader.props = {
  ...ElCascader.props,
  collapseTags: {
    type: Boolean,
    default: true,
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  // 看情况要不要去掉这个
  filterable: {
    type: Boolean,
    default: true,
  },
};
