"use client";

import { create } from "zustand";
import { unwrapList } from "@/lib/utils";
import { notificationService } from "@/services/notificationService";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  fetchNotifications: async (params = {}) => {
    set({ loading: true });
    const { data } = await notificationService.list(params);
    const notifications = unwrapList(data);
    set({ notifications, loading: false });
    return notifications;
  },
  fetchUnreadCount: async () => {
    const { data } = await notificationService.unreadCount();
    set({ unreadCount: data.unread_count || 0 });
    return data.unread_count || 0;
  },
  markRead: async (id) => {
    const { data } = await notificationService.markRead(id);
    set({ notifications: get().notifications.map((item) => (item.id === id ? data : item)) });
    get().fetchUnreadCount();
    return data;
  },
  markAllRead: async () => {
    await notificationService.markAllRead();
    set({ notifications: get().notifications.map((item) => ({ ...item, is_read: true })), unreadCount: 0 });
  },
}));
