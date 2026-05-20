import apiClient from "@/lib/apiClient";

export const workspaceService = {
  list: (params) => apiClient.get("/workspaces/", { params }),
  create: (payload) => apiClient.post("/workspaces/", payload),
  retrieve: (id) => apiClient.get(`/workspaces/${id}/`),
  update: (id, payload) => apiClient.patch(`/workspaces/${id}/`, payload),
  remove: (id) => apiClient.delete(`/workspaces/${id}/`),
  archive: (id) => apiClient.post(`/workspaces/${id}/archive/`),
  restore: (id) => apiClient.post(`/workspaces/${id}/restore/`),
  members: (params) => apiClient.get("/workspaces/members/", { params }),
  invite: (payload) => apiClient.post("/workspaces/members/", payload),
  removeMember: (id) => apiClient.delete(`/workspaces/members/${id}/`),
};
