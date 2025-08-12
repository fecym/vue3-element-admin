import { api as request } from "@/utils/request";

export function getMeridianList(params) {
  return request({
    url: "/meridian/list",
    method: "GET",
    params,
  });
}

export function getSelectMeridian(params) {
  return request({
    url: "/meridian/select",
    method: "GET",
    params,
  });
}

export function addMeridian(data) {
  return request({
    url: "/meridian",
    method: "POST",
    data,
  });
}

export function updateMeridianById(id, data) {
  return request({
    url: `/meridian/${id}`,
    method: "PUT",
    data,
  });
}

export function deleteMeridianById(id) {
  return request({
    url: `/meridian/${id}`,
    method: "DELETE",
  });
}
