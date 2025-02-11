import request from "@/utils/request/demo";

import deptMock from "@/mock/dept.js";

const DEPT_BASE_URL = "/api/v1/dept";

const DeptAPI = {
  /**
   * 获取部门列表
   *
   * @param {object} queryParams 查询参数（可选）
   * @returns 部门树形表格数据
   */
  getList(queryParams) {
    return request({
      url: `${DEPT_BASE_URL}`,
      method: "get",
      params: queryParams,
    });
  },

  /** 获取部门下拉列表 */
  getOptions() {
    // return request({
    //   url: `${DEPT_BASE_URL}/options`,
    //   method: "get",
    // });
    return Promise.resolve(deptMock["dept/options"]);
  },

  /**
   * 获取部门表单数据
   *
   * @param {number} id 部门ID
   * @returns 部门表单数据
   */
  getFormData(id) {
    // return request({
    //   url: `${DEPT_BASE_URL}/${id}/form`,
    //   method: "get",
    // });
    return Promise.resolve(deptMock["dept/:id/form"]);
  },

  /**
   * 新增部门
   *
   * @param {object} data 部门表单数据
   * @returns 请求结果
   */
  add(data) {
    // return request({
    //   url: `${DEPT_BASE_URL}`,
    //   method: "post",
    //   data: data,
    // });
    return Promise.resolve(deptMock["dept"]);
  },

  /**
   * 修改部门
   *
   * @param {string} id 部门ID
   * @param {object} data 部门表单数据
   * @returns 请求结果
   */
  update(id, data) {
    return request({
      url: `${DEPT_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除部门
   *
   * @param {string} ids 部门ID，多个以英文逗号(,)分隔
   * @returns 请求结果
   */
  deleteByIds(ids) {
    return request({
      url: `${DEPT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default DeptAPI;
