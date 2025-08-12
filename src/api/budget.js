import { api } from "@/utils/request";

export function getBudgetById(id) {
  return api.get(`/budget/${id}`);
}

export function createBudget(data) {
  return api.post(`/budget`, data);
}

export function getBudgetList(params) {
  return api.get("/budget", { params });
}

export function updateBudgetById(id, data) {
  return api.post(`/budget/${id}`, data);
}

export function deleteBudgetById(id) {
  return api.delete(`/budget/${id}`);
}
