import apiClient from "@/lib/apiClient";

export const notificationService = {
  list: (params) => apiClient.get("/notifications/", { params }),
  unreadCount: () => apiClient.get("/notifications/unread-count/"),
  markRead: (id) => apiClient.post(`/notifications/${id}/mark-read/`),
  markAllRead: () => apiClient.post("/notifications/mark-all-read/"),
};
