import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useDictStoreHook } from "@/store/modules/dict";

import AuthAPI from "@/api/auth";
import UserAPI from "@/api/system/user";

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
    AuthAPI.login(loginFormData)
      .then(data => {
        const { tokenType, accessToken, refreshToken } = data;
        user.setToken(tokenType + " " + accessToken);
        user.setRefreshToken(refreshToken);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    return promise;
  }

  /**
   * 获取用户信息
   * @returns {Promise} Promise对象
   */
  function getUserInfo() {
    const { promise, resolve, reject } = Promise.withResolvers();
    UserAPI.getInfo()
      .then(data => {
        if (!data) {
          reject("Verification failed, please Login again.");
          return;
        }
        const info = Object.assign(userInfo.value, { ...data });
        user.setUserInfo(info);
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
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
