import { api } from "@/utils/request";

export function getListTransfer(params) {
  return api.get(`/transfers`, { params });
}
export function getPageTransfer(params) {
  return api.get(`/transfers/page`, { params });
}

export function createTransfer(data) {
  return api.post(`/transfers`, data);
}

export function updateTransferById(id, data) {
  return api.post(`/transfers/${id}`, data);
}

export function deleteTransfer(id) {
  return api.delete(`/transfers/${id}`);
}
