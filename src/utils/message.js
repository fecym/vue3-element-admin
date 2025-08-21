import { ElMessage, ElMessageBox } from "element-plus";

/**
 * 删除、编辑、新增之后的操作提示
 * @param {boolean} assertVal 操作接口返回的状态
 * @param {*} message 操作展示的文案
 */
export const operateMessage = (assertVal = true, message = "删除") => {
  if (assertVal) {
    ElMessage.success(`${message}成功`);
  } else {
    ElMessage.warning(`${message}失败`);
  }
};

/**
 * 操作提示框，若不传递任何参数，默认 删除操作
 * 一般用法只传递 message 即可
 * @param options
 */
export const operateDialog = (
  options = {
    title: "操作提示",
    message: "删除后数据无法恢复，是否确认删除",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    dangerouslyUseHTMLString: false,
  }
) => {
  options.title = options.title || "操作提示";
  options.message = options.message || "删除后数据无法恢复，是否确认删除";
  options.type = options.type || "warning";
  options.showCancelButton = options.showCancelButton != null ? options.showCancelButton : true;
  return new Promise((resolve, reject) => {
    ElMessageBox({ closeOnClickModal: false, ...options })
      .then(resolve)
      .catch(reject);
  });
};
