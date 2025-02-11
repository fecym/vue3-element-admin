import axios from "axios";
import qs from "qs";

// 方便外部拓展
export const createAxios = baseURL => {
  return axios.create({
    baseURL,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    paramsSerializer: params => qs.stringify(params),
    // extra: {
    //   showMessage: true, // 是否展示错误提示，默认true
    //   customCode: false, // 不处理返回值，返回所有
    // },
  });
};

const env = import.meta.env;

export const normalAxios = createAxios(env.VITE_APP_BASE_PATH);
export const api = createAxios(env.VITE_APP_API_PATH);
export const psm = createAxios(env.VITE_APP_API_PSM_PATH);
