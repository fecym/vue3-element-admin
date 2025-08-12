import { ElNotification, ElMessageBox } from "element-plus";
import { closeLoading } from "@/utils/request/loading.js";
import user from "@/utils/user.js";

let isShowing = false;

const whiteList = [];

const showMessage = (message, type = "error") => {
  // 仅显示第一条错误
  if (isShowing) return;
  ElNotification({
    title: "错误",
    message,
    type,
    onClose() {
      isShowing = false;
    },
  });
  isShowing = true;
};

function layoutMessageBox() {
  ElMessageBox.confirm("登录已过期，请点击此处重新登录。", {
    confirmButtonText: "重新登陆",
    showCancelButton: false,
    type: "warning",
  }).then(() => {
    user.clearAll();
    location.reload();
  });
}

const logErrorDetails = (response, code) => {
  console.group("业务逻辑错误");
  console.warn(`请求接口：${response.config.url}`);
  if (response.config.params) {
    console.warn(`请求参数：${JSON.stringify(response.config.params)}`);
  }
  console.warn(`错误描述：${response.data.msg}`);
  console.warn(`错误码：${code}`);
  console.groupEnd();
};

const isWhiteListedUrl = url => whiteList.some(x => url.includes(x));

const initInterceptorsResponse = instance => {
  instance.interceptors?.response.use(
    response => {
      closeLoading();
      const url = response.config.url;
      if (isWhiteListedUrl(url)) {
        return response;
      }

      if (response.data instanceof Blob) {
        return response;
      }

      const res = response.data;
      const code = res.code;
      if (code !== 0) {
        logErrorDetails(response, code);
        if (code === -1 && res.message.includes("Unauthorized")) {
          // to re-login
          return layoutMessageBox();
        }
        showMessage(res.message || "Error");
        return Promise.reject(response);
      }
      return res.data;
    },
    error => {
      closeLoading();
      const response = error.response;
      const status = response.status;
      const msg = "请求出错";
      const type = status === 400 ? "warning" : "error";

      if (!response) {
        showMessage("网络异常，请检查网络后重试！");
        return Promise.reject(error);
      }

      if (response.status === 401) {
        return layoutMessageBox();
      }

      if (response.data?.message) {
        return showMessage(response.data?.message, "error");
      }

      const map = {
        400: "请求参数错误，请检查请求参数！",
        401: "未授权",
        403: "请求被屏蔽",
        404: "请求未找到",
        405: "请求不被允许",
        500: "服务器错误",
      };
      showMessage(map[status] || msg);
      return Promise.reject(error);
    }
  );
};

const setInterceptorsResponse = instances => {
  Object.values(instances).forEach(initInterceptorsResponse);
};

export { setInterceptorsResponse };
export default initInterceptorsResponse;
