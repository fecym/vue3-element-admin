import { api as request } from "@/utils/request";

export function getHerbList(params) {
  return request({
    url: "/herbs/page",
    method: "GET",
    params,
  });
}

export function createHerb(data) {
  return request({
    url: "/herbs",
    method: "POST",
    data,
  });
}

export function updateHerbById(id, data) {
  return request({
    url: `/herbs/${id}`,
    method: "PUT",
    data,
  });
}

export function deleteHerbById(id) {
  return request({
    url: `/herbs/${id}`,
    method: "DELETE",
  });
}
