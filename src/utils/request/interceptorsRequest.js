import user from "@/utils/user.js";
import { closeLoading, createLoading } from "@/utils/request/loading.js";

const initInterceptorsRequest = instance => {
  instance.interceptors?.request.use(
    config => {
      const accessToken = user.getToken();
      // 如果 Authorization 设置为 no-auth，则不携带 Token，用于登录、刷新 Token 等接口
      if (config.headers.Authorization !== "no-auth" && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        delete config.headers.Authorization;
      }
      createLoading();
      return config;
    },
    error => {
      closeLoading();
      return Promise.reject(error);
    }
  );
};

const setInterceptorsRequest = instances => {
  Object.keys(instances).map(instance => {
    initInterceptorsRequest(instances[instance]);
  });
};

export { setInterceptorsRequest };

export default initInterceptorsRequest;
