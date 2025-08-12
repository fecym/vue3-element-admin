import { api as request } from "@/utils/request";

export function getPageVehicle(params) {
  return request({
    url: "/vehicle/page",
    method: "get",
    params,
  });
}

export function getListVehicle(params) {
  return request({
    url: "/vehicle",
    method: "get",
    params,
  });
}

export function createVehicle(data) {
  return request({
    url: "/vehicle",
    method: "post",
    data,
  });
}

export function updateVehicleById(id, data) {
  return request({
    url: `/vehicle/${id}`,
    method: "put",
    data,
  });
}

export function deleteVehicleById(id) {
  return request({
    url: `/vehicle/${id}`,
    method: "delete",
  });
}

export function getInfoVehicleById(id) {
  return request({
    url: `/vehicle/${id}`,
    method: "get",
  });
}

export function getPageVehicleMaintain(params) {
  return request({
    url: "/vehicle-maintain/page",
    method: "get",
    params,
  });
}

export function createVehicleMaintain(data) {
  return request({
    url: "/vehicle-maintain",
    method: "post",
    data,
  });
}

export function updateVehicleMaintainById(id, data) {
  return request({
    url: `/vehicle-maintain/${id}`,
    method: "put",
    data,
  });
}

export function deleteVehicleMaintainById(id) {
  return request({
    url: `/vehicle-maintain/${id}`,
    method: "delete",
  });
}

export function getInfoVehicleMaintainById(id) {
  return request({
    url: `/vehicle-maintain/${id}`,
    method: "get",
  });
}
