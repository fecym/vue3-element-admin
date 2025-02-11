import request from "@/utils/request/demo";

import userMock from "@/mock/user.js";
const USER_BASE_URL = "/api/v1/users";

const UserAPI = {
  /**
   * 获取当前登录用户信息
   *
   * @returns 登录用户昵称、头像信息，包括角色和权限
   */
  getInfo() {
    // return request({
    //   url: `${USER_BASE_URL}/me`,
    //   method: "get",
    // });
    return Promise.resolve(userMock["users/me"]);
  },

  /**
   * 获取用户分页列表
   *
   * @param {object} queryParams 查询参数
   */
  getPage(queryParams) {
    // return request({
    //   url: `${USER_BASE_URL}/page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(userMock["users/page"]);
  },

  /**
   * 获取用户表单详情
   *
   * @param {number} userId 用户ID
   * @returns 用户表单详情
   */
  getFormData(userId) {
    // return request({
    //   url: `${USER_BASE_URL}/${userId}/form`,
    //   method: "get",
    // });
    return Promise.resolve(userMock["users/:userId/form"]);
  },

  /**
   * 添加用户
   *
   * @param {object} data 用户表单数据
   */
  add(data) {
    return request({
      url: `${USER_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改用户
   *
   * @param {number} id 用户ID
   * @param {object} data 用户表单数据
   */
  update(id, data) {
    return request({
      url: `${USER_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 修改用户密码
   *
   * @param {number} id 用户ID
   * @param {string} password 新密码
   */
  resetPassword(id, password) {
    return request({
      url: `${USER_BASE_URL}/${id}/password/reset`,
      method: "put",
      params: { password: password },
    });
  },

  /**
   * 批量删除用户，多个以英文逗号(,)分割
   *
   * @param {string} ids 用户ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids) {
    return request({
      url: `${USER_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /** 下载用户导入模板 */
  downloadTemplate() {
    return request({
      url: `${USER_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },

  /**
   * 导出用户
   *
   * @param {object} queryParams 查询参数
   */
  export(queryParams) {
    return request({
      url: `${USER_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },

  /**
   * 导入用户
   *
   * @param {number} deptId 部门ID
   * @param {File} file 导入文件
   */
  import(deptId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return request({
      url: `${USER_BASE_URL}/import`,
      method: "post",
      params: { deptId: deptId },
      data: formData,
      headers: {
        "Content-Type": "multipart/Form-data",
      },
    });
  },

  /** 获取个人中心用户信息 */
  getProfile() {
    // return request({
    //   url: `${USER_BASE_URL}/profile`,
    //   method: "get",
    // });
    return Promise.resolve(userMock["users/profile"]);
  },

  /** 修改个人中心用户信息 */
  updateProfile(data) {
    return request({
      url: `${USER_BASE_URL}/profile`,
      method: "put",
      data: data,
    });
  },

  /** 修改个人中心用户密码 */
  changePassword(data) {
    return request({
      url: `${USER_BASE_URL}/password`,
      method: "put",
      data: data,
    });
  },

  /** 发送短信验证码（绑定或更换手机号）*/
  sendMobileCode(mobile) {
    return request({
      url: `${USER_BASE_URL}/mobile/code`,
      method: "post",
      params: { mobile: mobile },
    });
  },

  /** 绑定或更换手机号 */
  bindOrChangeMobile(data) {
    return request({
      url: `${USER_BASE_URL}/mobile`,
      method: "put",
      data: data,
    });
  },

  /** 发送邮箱验证码（绑定或更换邮箱）*/
  sendEmailCode(email) {
    return request({
      url: `${USER_BASE_URL}/email/code`,
      method: "post",
      params: { email: email },
    });
  },

  /** 绑定或更换邮箱 */
  bindOrChangeEmail(data) {
    return request({
      url: `${USER_BASE_URL}/email`,
      method: "put",
      data: data,
    });
  },

  /**
   *  获取用户下拉列表
   */
  getOptions() {
    return request({
      url: `${USER_BASE_URL}/options`,
      method: "get",
    });
  },
};

export default UserAPI;
