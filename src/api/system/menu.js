import request from "@/utils/request/demo";

import menuMock from "@/mock/menu.js";

// 菜单基础URL
const MENU_BASE_URL = "/api/v1/menus";

const MenuAPI = {
  /**
   * 获取当前用户的路由列表
   * <p/>
   * 无需传入角色，后端解析token获取角色自行判断是否拥有路由的权限
   *
   * @returns 路由列表
   */
  getRoutes() {
    // return request({
    //   url: `${MENU_BASE_URL}/routes`,
    //   method: "get",
    // });
    return Promise.resolve(menuMock["menus/routes"]);
  },

  /**
   * 获取菜单树形列表
   *
   * @param {object} queryParams 查询参数
   * @returns 菜单树形列表
   */
  getList(queryParams) {
    // return request({
    //   url: `${MENU_BASE_URL}`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(menuMock["menus"]);
  },

  /**
   * 获取菜单下拉数据源
   *
   * @param {boolean} onlyParent
   * @returns 菜单下拉数据源
   */
  getOptions(onlyParent) {
    return request({
      url: `${MENU_BASE_URL}/options`,
      method: "get",
      params: { onlyParent: onlyParent },
    });
  },

  /**
   * 获取菜单表单数据
   *
   * @param {string} id 菜单ID
   */
  getFormData(id) {
    // return request({
    //   url: `${MENU_BASE_URL}/${id}/form`,
    //   method: "get",
    // });
    return Promise.resolve(menuMock["menus/:id/form"]);
  },

  /**
   * 添加菜单
   *
   * @param {object} data 菜单表单数据
   * @returns 请求结果
   */
  add(data) {
    return request({
      url: `${MENU_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改菜单
   *
   * @param {string} id 菜单ID
   * @param {object} data 菜单表单数据
   * @returns 请求结果
   */
  update(id, data) {
    return request({
      url: `${MENU_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除菜单
   *
   * @param {number} id 菜单ID
   * @returns 请求结果
   */
  deleteById(id) {
    return request({
      url: `${MENU_BASE_URL}/${id}`,
      method: "delete",
    });
  },
};

export default MenuAPI;
