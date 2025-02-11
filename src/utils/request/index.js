import axios from "axios";
import { setInterceptorsRequest } from "./interceptorsRequest";
import { setInterceptorsResponse } from "./interceptorsResponse";
import * as gateways from "./gateway";
import user from "@/utils/user";
import { ElMessage } from "element-plus";

setInterceptorsRequest(gateways);
setInterceptorsResponse(gateways);

export default axios;
export * from "./gateway";

export const downLoadAxios = (url, params) => {
  return gateways
    .normalAxios({
      method: "get",
      url,
      params,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${user.getToken()}`,
      },
    })
    .then(res => {
      if (res && res.data instanceof Blob && res.type !== "application/json") {
        return res;
      }
      ElMessage.warning(res.msg || "无数据");
    })
    .catch(Promise.reject);
};
