import apiClient from "@/lib/apiClient";

export const taskService = {
  list: (params) => apiClient.get("/tasks/", { params }),
  create: (payload) => apiClient.post("/tasks/", payload),
  retrieve: (id) => apiClient.get(`/tasks/${id}/`),
  update: (id, payload) => apiClient.patch(`/tasks/${id}/`, payload),
  remove: (id) => apiClient.delete(`/tasks/${id}/`),
  archive: (id) => apiClient.post(`/tasks/${id}/archive/`),
  restore: (id) => apiClient.post(`/tasks/${id}/restore/`),
  assign: (id, assigned_to) => apiClient.post(`/tasks/${id}/assign/`, { assigned_to }),
  overdue: () => apiClient.get("/tasks/overdue/"),
  completed: () => apiClient.get("/tasks/completed/"),
  upcoming: () => apiClient.get("/tasks/upcoming/"),
  labels: () => apiClient.get("/tasks/labels/"),
  createLabel: (payload) => apiClient.post("/tasks/labels/", payload),
  comments: (params) => apiClient.get("/tasks/comments/", { params }),
  addComment: (payload) => apiClient.post("/tasks/comments/", payload),
  checklist: (payload) => apiClient.post("/tasks/checklists/", payload),
  completeChecklist: (id) => apiClient.post(`/tasks/checklists/${id}/mark-complete/`),
  note: (payload) => apiClient.post("/tasks/notes/", payload),
  attachment: (payload) =>
    apiClient.post("/tasks/attachments/", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
