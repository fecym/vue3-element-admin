import { api as request } from "@/utils/request";

export function getFriendById(id) {
  return request({
    url: `/friend/${id}`,
    method: "get",
  });
}

export function createFriend(data) {
  return request.post(`/friend`, data);
}

export function getFriendList(params) {
  return request({
    url: "/friend",
    method: "get",
    params,
  });
}

export function updateFriendById(id, data) {
  return request({
    url: `/friend/${id}`,
    method: "POST",
    data,
  });
}

export function deleteFriendById(id) {
  return request({
    url: `/friend/${id}`,
    method: "DELETE",
  });
}
