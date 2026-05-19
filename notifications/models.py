import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone


class Notification(models.Model):
    class Type(models.TextChoices):
        INFO = 'info', 'Info'
        TASK = 'task', 'Task'
        WORKSPACE = 'workspace', 'Workspace'
        SECURITY = 'security', 'Security'
        TASK_ASSIGNED = 'task_assigned', 'Task assigned'
        DUE_REMINDER = 'due_reminder', 'Due reminder'
        COMMENT_ADDED = 'comment_added', 'Comment added'
        WORKSPACE_INVITE = 'workspace_invite', 'Workspace invite'
        TASK_COMPLETED = 'task_completed', 'Task completed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField(blank=True)
    type = models.CharField(max_length=30, choices=Type.choices, default=Type.INFO)
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(blank=True, null=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['user', 'is_read'])]

    def mark_as_read(self):
        if not self.is_read:
            self.is_read = True
            self.read_at = timezone.now()
            self.save(update_fields=['is_read', 'read_at'])

    def __str__(self):
        return self.title
