import { api } from "@/utils/request";

export function getGroupedByDay(params) {
  return api.get(`/expense/list/date`, { params });
}

export function getPageExpense(params) {
  return api.get(`/expense/page`, { params });
}

export function createExpense(data) {
  return api.post(`/expense`, data);
}

export function updateExpenseById(id, data) {
  return api.post(`/expense/${id}`, data);
}

export function deleteExpense(id) {
  return api.delete(`/expense/${id}`);
}

export function getExpenseAnalyzeTrend(params) {
  return api.get(`/expense/analyze/trend`, { params });
}

export function getExpenseAnalyzeType(params) {
  return api.get(`/expense/analyze/type`, { params });
}

export function getExpenseAnalyzeTotalAmount(params) {
  return api.get(`/expense/analyze/total/amount`, { params });
}
