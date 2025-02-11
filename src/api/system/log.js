import request from "@/utils/request/demo";

import logMock from "@/mock/log.js";

const LOG_BASE_URL = "/api/v1/logs";

const LogAPI = {
  /**
   * 获取日志分页列表
   *
   * @param {object} queryParams 查询参数
   */
  getPage(queryParams) {
    // return request({
    //   url: `${LOG_BASE_URL}/page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(logMock["logs/page"]);
  },

  /**
   * 获取访问趋势
   *
   * @param {object} queryParams
   * @returns
   */
  getVisitTrend(queryParams) {
    // return request({
    //   url: `${LOG_BASE_URL}/visit-trend`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(logMock["logs/visit-trend"]);
  },

  /**
   * 获取访问统计
   *
   * @returns
   */
  getVisitStats() {
    // return request({
    //   url: `${LOG_BASE_URL}/visit-stats`,
    //   method: "get",
    // });
    return Promise.resolve(logMock["logs/visit-stats"]);
  },
};

export default LogAPI;
