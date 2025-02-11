import request from "@/utils/request/demo";

import roleMock from "@/mock/role.js";

const ROLE_BASE_URL = "/api/v1/roles";

const RoleAPI = {
  /** 获取角色分页数据 */
  getPage(queryParams) {
    // return request({
    //   url: `${ROLE_BASE_URL}/page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(roleMock["roles/page"]);
  },

  /** 获取角色下拉数据源 */
  getOptions() {
    // return request({
    //   url: `${ROLE_BASE_URL}/options`,
    //   method: "get",
    // });
    return Promise.resolve(roleMock["roles/options"]);
  },

  /**
   * 获取角色的菜单ID集合
   *
   * @param {number} roleId 角色ID
   * @returns 角色的菜单ID集合
   */
  getRoleMenuIds(roleId) {
    // return request({
    //   url: `${ROLE_BASE_URL}/${roleId}/menuIds`,
    //   method: "get",
    // });
    return Promise.resolve(roleMock["roles/:id/menuIds"]);
  },

  /**
   * 分配菜单权限
   *
   * @param {number} roleId 角色ID
   * @param {number[]} data 菜单ID集合
   */
  updateRoleMenus(roleId, data) {
    return request({
      url: `${ROLE_BASE_URL}/${roleId}/menus`,
      method: "put",
      data: data,
    });
  },

  /**
   * 获取角色表单数据
   *
   * @param {number} id 角色ID
   * @returns 角色表单数据
   */
  getFormData(id) {
    // return request({
    //   url: `${ROLE_BASE_URL}/${id}/form`,
    //   method: "get",
    // });
    return Promise.resolve(roleMock["roles/:id/form"]);
  },

  /** 添加角色 */
  add(data) {
    return request({
      url: `${ROLE_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 更新角色
   *
   * @param {number} id 角色ID
   * @param {object} data 角色表单数据
   */
  update(id, data) {
    return request({
      url: `${ROLE_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 批量删除角色，多个以英文逗号(,)分割
   *
   * @param {string} ids 角色ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids) {
    return request({
      url: `${ROLE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default RoleAPI;
