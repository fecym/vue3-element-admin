import { ElMessage, ElNotification } from "element-plus";
import { ResultEnum } from "@/enums/ResultEnum.js";

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

const handleError = (response, code) => {
  let msg;
  try {
    msg = JSON.parse(response.data.msg);
    return msg[Object.keys(msg)[0]];
  } catch (e) {
    return response.data.msg;
  }
};

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
    async response => {
      const url = response.config.url;
      if (isWhiteListedUrl(url)) {
        return response;
      }

      const code = response.data.code;
      if (response.data instanceof Blob) {
        return response;
      }

      if (code === ResultEnum.SUCCESS) {
        return response.data.data;
      } else if (["20004", "20005", "20006"].includes(code)) {
        showMessage(`${response.config.url} ${response.data.msg}`);
      } else {
        const msg = handleError(response, code);
        showMessage(msg);
        logErrorDetails(response, code);
        return Promise.reject(response);
      }
    },
    error => {
      const status = error.response.status;
      const msg = "请求出错";
      const type = status === 400 ? "warning" : "error";

      const code = error.response.code;

      if (code === ResultEnum.ACCESS_TOKEN_INVALID) {
        // Token 过期，刷新 Token
        // return handleTokenRefresh(config);
      } else if (code === ResultEnum.REFRESH_TOKEN_INVALID) {
        return Promise.reject(new Error(msg || "Error"));
      } else {
        ElMessage.error(msg || "系统出错");
      }

      const map = {
        400: "请求参数错误，请检查请求参数！",
        401: "未授权",
        403: "请求被屏蔽",
        404: "请求未找到",
        405: "请求不被允许",
        500: "服务器错误",
      };
      showMessage(map[status] || msg, type);
      return Promise.reject(error);
    }
  );
};

const setInterceptorsResponse = instances => {
  Object.values(instances).forEach(initInterceptorsResponse);
};

export { setInterceptorsResponse };
export default initInterceptorsResponse;
