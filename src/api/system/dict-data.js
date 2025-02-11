import request from "@/utils/request/demo";

import dictMock from "@/mock/dict-data.js";

const DICT_DATA_BASE_URL = "/api/v1/dict-data";

const DictDataAPI = {
  /**
   * 获取字典分页列表
   *
   * @param {object} queryParams 查询参数
   * @returns 字典分页结果
   */
  getPage(queryParams) {
    // return request({
    //   url: `${DICT_DATA_BASE_URL}/page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(dictMock["dict-data/page"]);
  },

  /**
   * 获取字典数据表单
   *
   * @param {number} id 字典ID
   * @returns 字典数据表单
   */
  getFormData(id) {
    return request({
      url: `${DICT_DATA_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   * 新增字典数据
   *
   * @param {object} data 字典数据
   */
  add(data) {
    return request({
      url: `${DICT_DATA_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改字典数据
   *
   * @param {number} id 字典ID
   * @param {object} data 字典数据
   */
  update(id, data) {
    return request({
      url: `${DICT_DATA_BASE_URL}/${id}`,
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
      url: `${DICT_DATA_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   * 获取字典的数据项
   *
   * @param {string} dictCode 字典编码
   * @returns 字典数据项
   */
  getOptions(dictCode) {
    // return request({
    //   url: `${DICT_DATA_BASE_URL}/${dictCode}/options`,
    //   method: "get",
    // });
    return Promise.resolve(dictMock["dict-data/:dictCode/options"]);
  },
};

export default DictDataAPI;
