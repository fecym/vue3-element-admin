import request from "@/utils/request/demo";

import noticeMock from "@/mock/notice.js";

const NOTICE_BASE_URL = "/api/v1/notices";

const NoticeAPI = {
  /** 获取通知公告分页数据 */
  getPage(queryParams) {
    // return request({
    //   url: `${NOTICE_BASE_URL}/page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(noticeMock["notices/page"]);
  },

  /**
   * 获取通知公告表单数据
   *
   * @param {number} id NoticeID
   * @returns Notice表单数据
   */
  getFormData(id) {
    // return request({
    //   url: `${NOTICE_BASE_URL}/${id}/form`,
    //   method: "get",
    // });
    return Promise.resolve(noticeMock["notices/:id/form"]);
  },

  /**
   * 添加通知公告
   *
   * @param {object} data Notice表单数据
   * @returns
   */
  add(data) {
    return request({
      url: `${NOTICE_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 更新通知公告
   *
   * @param {number} id NoticeID
   * @param {object} data Notice表单数据
   */
  update(id, data) {
    return request({
      url: `${NOTICE_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 批量删除通知公告，多个以英文逗号(,)分割
   *
   * @param {string} ids 通知公告ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids) {
    return request({
      url: `${NOTICE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   * 发布通知
   *
   * @param {number} id 被发布的通知公告id
   * @returns
   */
  publish(id) {
    return request({
      url: `${NOTICE_BASE_URL}/${id}/publish`,
      method: "put",
    });
  },

  /**
   * 撤回通知
   *
   * @param {number} id 撤回的通知id
   * @returns
   */
  revoke(id) {
    return request({
      url: `${NOTICE_BASE_URL}/${id}/revoke`,
      method: "put",
    });
  },

  /**
   * 查看通知
   *
   * @param {string} id
   */
  getDetail(id) {
    return request({
      url: `${NOTICE_BASE_URL}/${id}/detail`,
      method: "get",
    });
  },

  /* 全部已读 */
  readAll() {
    return request({
      url: `${NOTICE_BASE_URL}/read-all`,
      method: "put",
    });
  },

  /** 获取我的通知分页列表 */
  getMyNoticePage(queryParams) {
    // return request({
    //   url: `${NOTICE_BASE_URL}/my-page`,
    //   method: "get",
    //   params: queryParams,
    // });
    return Promise.resolve(noticeMock["notices/my-page"]);
  },
};

export default NoticeAPI;
