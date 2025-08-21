// import request from "@/utils/request/demo";

// const AUTH_BASE_URL = "/api/v1/auth";
import authMock from "@/mock/auth.js";
const AuthAPI = {
  /** 登录接口*/
  login(data) {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("captchaKey", data.captchaKey);
    formData.append("captchaCode", data.captchaCode);
    return Promise.resolve(authMock["auth/login"]);
  },

  /** 刷新 token 接口*/
  refreshToken(refreshToken) {
    // return request({
    //   url: `${AUTH_BASE_URL}/refresh-token`,
    //   method: "post",
    //   params: { refreshToken: refreshToken },
    //   headers: {
    //     Authorization: "no-auth",
    //   },
    // });
    return Promise.resolve(authMock["auth/refresh-token"]);
  },

  /** 注销登录接口 */
  logout() {
    // return request({
    //   url: `${AUTH_BASE_URL}/logout`,
    //   method: "delete",
    // });
    return Promise.resolve(authMock["auth/logout"]);
  },

  /** 获取验证码接口*/
  getCaptcha() {
    // return request({
    //   url: `${AUTH_BASE_URL}/captcha`,
    //   method: "get",
    // });
    return Promise.resolve(authMock["auth/captcha"]);
  },
};

export default AuthAPI;
