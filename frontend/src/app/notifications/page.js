"use client";

import { useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { NotificationItem } from "@/components/notifications/notification-item";
import { useNotificationStore } from "@/store/notificationStore";

export default function NotificationsPage() {
  const { notifications, unreadCount, fetchNotifications, fetchUnreadCount, markRead, markAllRead } = useNotificationStore();
  useEffect(() => {
    fetchNotifications().catch(() => {});
    fetchUnreadCount().catch(() => {});
  }, [fetchNotifications, fetchUnreadCount]);

  return (
    <AppShell
      title="Notifications"
      subtitle={`${unreadCount} unread signals from tasks, comments, workspaces, and reminders.`}
      actions={<Button variant="outline" onClick={markAllRead}><CheckCheck size={17} />Mark all read</Button>}
    >
      <div className="space-y-3">
        {notifications.length ? notifications.map((item) => <NotificationItem key={item.id} notification={item} onRead={markRead} />) : <EmptyState title="Notification center is clear" description="New assignments, comments, and invites will appear here." />}
      </div>
    </AppShell>
  );
}
