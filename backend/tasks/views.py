from django.utils import timezone
from django.db.models import Q
from rest_framework import decorators, permissions, response, viewsets

from notifications.models import Notification

from .models import Task, TaskAttachment, TaskChecklistItem, TaskComment, TaskLabel, TaskNote
from .permissions import IsTaskOwnerOrAdmin
from .serializers import (
    TaskAttachmentSerializer,
    TaskChecklistItemSerializer,
    TaskCommentSerializer,
    TaskLabelSerializer,
    TaskNoteSerializer,
    TaskSerializer,
)


def accessible_task_filter(user):
    return Q(user=user) | Q(created_by=user) | Q(assigned_to=user) | Q(workspace__members__user=user)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskOwnerOrAdmin]
    filterset_fields = ('status', 'priority', 'is_archived', 'workspace', 'assigned_to', 'due_date')
    search_fields = ('title', 'description', 'labels__name', 'notes')
    ordering_fields = ('created_at', 'updated_at', 'due_date', 'priority', 'status', 'start_date')

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.select_related('user', 'created_by', 'assigned_to', 'workspace').prefetch_related(
            'labels', 'comments', 'attachments', 'checklist_items', 'task_notes',
        ).filter(deleted_at__isnull=True)
        if user.role == 'admin':
            return queryset
        return queryset.filter(accessible_task_filter(user)).distinct()

    def perform_create(self, serializer):
        task = serializer.save(user=self.request.user, created_by=self.request.user)
        if task.assigned_to and task.assigned_to != self.request.user:
            Notification.objects.create(
                user=task.assigned_to,
                title='Task assigned',
                message=f'You were assigned: {task.title}',
                type=Notification.Type.TASK_ASSIGNED,
                metadata={'task_id': str(task.id)},
            )

    def perform_update(self, serializer):
        previous_status = serializer.instance.status
        task = serializer.save()
        if previous_status != Task.Status.COMPLETED and task.status == Task.Status.COMPLETED:
            recipients = {task.user, task.created_by, task.assigned_to} - {None, self.request.user}
            for user in recipients:
                Notification.objects.create(
                    user=user,
                    title='Task completed',
                    message=f'Task completed: {task.title}',
                    type=Notification.Type.TASK_COMPLETED,
                    metadata={'task_id': str(task.id)},
                )

    def perform_destroy(self, instance):
        instance.deleted_at = timezone.now()
        instance.save(update_fields=['deleted_at'])

    @decorators.action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        task = self.get_object()
        task.is_archived = True
        task.save(update_fields=['is_archived'])
        return response.Response(self.get_serializer(task).data)

    @decorators.action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        task = self.get_object()
        task.is_archived = False
        task.deleted_at = None
        task.save(update_fields=['is_archived', 'deleted_at'])
        return response.Response(self.get_serializer(task).data)

    @decorators.action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        task = self.get_object()
        serializer = self.get_serializer(task, data={'assigned_to': request.data.get('assigned_to')}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if task.assigned_to:
            Notification.objects.create(
                user=task.assigned_to,
                title='Task assigned',
                message=f'You were assigned: {task.title}',
                type=Notification.Type.TASK_ASSIGNED,
                metadata={'task_id': str(task.id)},
            )
        return response.Response(self.get_serializer(task).data)

    @decorators.action(detail=False, methods=['get'])
    def overdue(self, request):
        queryset = self.filter_queryset(self.get_queryset().filter(due_date__lt=timezone.now()).exclude(status=Task.Status.COMPLETED))
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page or queryset, many=True)
        return self.get_paginated_response(serializer.data) if page is not None else response.Response(serializer.data)

    @decorators.action(detail=False, methods=['get'])
    def completed(self, request):
        queryset = self.filter_queryset(self.get_queryset().filter(status=Task.Status.COMPLETED))
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page or queryset, many=True)
        return self.get_paginated_response(serializer.data) if page is not None else response.Response(serializer.data)

    @decorators.action(detail=False, methods=['get'])
    def upcoming(self, request):
        queryset = self.filter_queryset(self.get_queryset().filter(due_date__gte=timezone.now()).exclude(status=Task.Status.COMPLETED))
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page or queryset, many=True)
        return self.get_paginated_response(serializer.data) if page is not None else response.Response(serializer.data)


class TaskLabelViewSet(viewsets.ModelViewSet):
    serializer_class = TaskLabelSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ('workspace',)
    search_fields = ('name',)
    ordering_fields = ('name', 'created_at')

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return TaskLabel.objects.all()
        return TaskLabel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskCommentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskCommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskOwnerOrAdmin]
    search_fields = ('content',)
    ordering_fields = ('created_at', 'updated_at')

    def get_queryset(self):
        queryset = TaskComment.objects.select_related('task', 'user')
        if self.request.user.role == 'admin':
            return queryset
        return queryset.filter(task__in=Task.objects.filter(accessible_task_filter(self.request.user))).distinct()

    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        task = comment.task
        recipients = {task.user, task.created_by, task.assigned_to} - {None, self.request.user}
        for user in recipients:
            Notification.objects.create(
                user=user,
                title='Comment added',
                message=f'New comment on: {task.title}',
                type=Notification.Type.COMMENT_ADDED,
                metadata={'task_id': str(task.id), 'comment_id': str(comment.id)},
            )


class TaskAttachmentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskOwnerOrAdmin]
    ordering_fields = ('uploaded_at',)

    def get_queryset(self):
        queryset = TaskAttachment.objects.select_related('task', 'user')
        if self.request.user.role == 'admin':
            return queryset
        return queryset.filter(task__in=Task.objects.filter(accessible_task_filter(self.request.user))).distinct()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskChecklistItemViewSet(viewsets.ModelViewSet):
    serializer_class = TaskChecklistItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskOwnerOrAdmin]
    filterset_fields = ('task', 'is_completed')
    search_fields = ('title',)
    ordering_fields = ('created_at', 'updated_at', 'completed_at')

    def get_queryset(self):
        queryset = TaskChecklistItem.objects.select_related('task', 'created_by')
        if self.request.user.role == 'admin':
            return queryset
        return queryset.filter(task__in=Task.objects.filter(accessible_task_filter(self.request.user))).distinct()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @decorators.action(detail=True, methods=['post'], url_path='mark-complete')
    def mark_complete(self, request, pk=None):
        item = self.get_object()
        item.is_completed = True
        item.save(update_fields=['is_completed', 'completed_at', 'updated_at'])
        return response.Response(self.get_serializer(item).data)


class TaskNoteViewSet(viewsets.ModelViewSet):
    serializer_class = TaskNoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskOwnerOrAdmin]
    filterset_fields = ('task',)
    search_fields = ('content',)
    ordering_fields = ('created_at', 'updated_at')

    def get_queryset(self):
        queryset = TaskNote.objects.select_related('task', 'user')
        if self.request.user.role == 'admin':
            return queryset
        return queryset.filter(task__in=Task.objects.filter(accessible_task_filter(self.request.user))).distinct()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
