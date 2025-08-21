import { api as request } from "@/utils/request";

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
};

export default UserAPI;

export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function getUser() {
  return request({
    url: "/user/profile",
    method: "get",
  });
}

export function getUserById(id) {
  return request({
    url: `/user/${id}`,
    method: "get",
  });
}

export function getUserList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params,
  });
}

export function createUser(data) {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
}

export function updateUserById(id, data) {
  return request({
    url: `/user/${id}`,
    method: "PUT",
    data,
  });
}

export function deleteUserById(id) {
  return request({
    url: `/user/${id}`,
    method: "DELETE",
  });
}

export function updatePassword(data) {
  return request({
    url: `/user`,
    method: "PUT",
    data,
  });
}
