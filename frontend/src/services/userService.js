import apiClient from "@/lib/apiClient";

export const userService = {
  list: (params) => apiClient.get("/auth/users/", { params }),
  retrieve: (id) => apiClient.get(`/auth/users/${id}/`),
  update: (id, payload) => apiClient.patch(`/auth/users/${id}/`, payload),
  remove: (id) => apiClient.delete(`/auth/users/${id}/`),
  block: (id) => apiClient.post(`/auth/users/${id}/block/`),
  unblock: (id) => apiClient.post(`/auth/users/${id}/unblock/`),
  setRole: (id, role) => apiClient.post(`/auth/users/${id}/set_role/`, { role }),
};
