import user from "@/utils/user.js";

const initInterceptorsRequest = instance => {
  instance.interceptors?.request.use(
    config => {
      const accessToken = user.getToken();
      // 如果 Authorization 设置为 no-auth，则不携带 Token，用于登录、刷新 Token 等接口
      if (config.headers.Authorization !== "no-auth" && accessToken) {
        config.headers.Authorization = accessToken;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    error => {
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
