import request from "@/utils/request/demo";

import dictMock from "@/mock/dict.js";

const DICT_BASE_URL = "/api/v1/dict";

const DictAPI = {
  /**
   * 获取字典分页列表
   *
   * @param {object} queryParams 查询参数
   * @returns 字典分页结果
   */
  getPage(queryParams) {
    // return request({
    //   url: `${DICT_BASE_URL}/page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(dictMock["dict/page"]);
  },

  /**
   * 获取字典表单数据
   *
   * @param {number} id 字典ID
   * @returns 字典表单数据
   */
  getFormData(id) {
    // return request({
    //   url: `${DICT_BASE_URL}/${id}/form`,
    //   method: "get",
    // });
    return Promise.resolve(dictMock["dict/:id/form"]);
  },

  /**
   * 新增字典
   *
   * @param {object} data 字典表单数据
   */
  add(data) {
    return request({
      url: `${DICT_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改字典
   *
   * @param {number} id 字典ID
   * @param {object} data 字典表单数据
   */
  update(id, data) {
    return request({
      url: `${DICT_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除字典
   *
   * @param {string} ids 字典ID，多个以英文逗号(,)分隔
   */
  deleteByIds(ids) {
    return request({
      url: `${DICT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   * 获取字典列表
   *
   * @returns 字典列表
   */
  getList() {
    // return request({
    //   url: `${DICT_BASE_URL}/list`,
    //   method: "get",
    // });
    return Promise.resolve(dictMock["dict/list"]);
  },
};

export default DictAPI;
