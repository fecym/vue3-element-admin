import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useDictStoreHook } from "@/store/modules/dict";
import { getUser, login as loginFn } from "@/api/user.js";
import AuthAPI from "@/api/auth";

import user from "@/utils/user";

export const useUserStore = defineStore("user", () => {
  const userInfo = useStorage("userInfo", {});

  /**
   * 登录
   * @param {object} loginFormData 登录表单数据
   * @returns {Promise} Promise对象
   */
  function login(loginFormData) {
    const { promise, resolve, reject } = Promise.withResolvers();
    const { username, password } = loginFormData;
    loginFn({ username, password })
      .then(data => {
        console.log(data, "????");
        if (!data) return reject();
        user.setToken(data.token);
        user.setRefreshToken(data.token);
        resolve();
      })
      .catch(reject);
    return promise;
  }

  /**
   * 获取用户信息
   * @returns {Promise} Promise对象
   */
  function getUserInfo() {
    const { promise, resolve, reject } = Promise.withResolvers();
    getUser()
      .then(data => {
        if (!data) {
          return reject("Verification failed, please Login again.");
        }
        const info = Object.assign(userInfo.value, { ...data });
        user.setUserInfo(info);
        resolve(info);
      })
      .catch(reject);
    return promise;
  }

  /**
   * 登出
   * @returns {Promise} Promise对象
   */
  function logout() {
    const { promise, resolve, reject } = Promise.withResolvers();
    AuthAPI.logout()
      .then(() => {
        clearUserData();
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    return promise;
  }

  /**
   * 刷新令牌
   * @returns {Promise} Promise对象
   */
  function refreshToken() {
    const refreshToken = user.getRefreshToken();
    const { promise, resolve, reject } = Promise.withResolvers();
    AuthAPI.refreshToken(refreshToken)
      .then(data => {
        const { tokenType, accessToken, refreshToken } = data;
        user.setToken(tokenType + " " + accessToken);
        user.setRefreshToken(refreshToken);
        resolve();
      })
      .catch(error => {
        console.log(" refreshToken  刷新失败", error);
        reject(error);
      });
    return promise;
  }

  /**
   * 清理用户数据
   * @returns {Promise} Promise对象
   */
  function clearUserData() {
    const { promise, resolve } = Promise.withResolvers();
    user.clearToken();
    usePermissionStoreHook().resetRouter();
    useDictStoreHook().clearDictionaryCache();
    resolve();
    return promise;
  }

  return {
    userInfo,
    getUserInfo,
    login,
    logout,
    clearUserData,
    refreshToken,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
