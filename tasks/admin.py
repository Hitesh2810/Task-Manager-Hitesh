from django.contrib import admin

from .models import Task, TaskAttachment, TaskChecklistItem, TaskComment, TaskLabel, TaskNote


class TaskCommentInline(admin.TabularInline):
    model = TaskComment
    extra = 0


class TaskAttachmentInline(admin.TabularInline):
    model = TaskAttachment
    extra = 0


class TaskChecklistItemInline(admin.TabularInline):
    model = TaskChecklistItem
    extra = 0


class TaskNoteInline(admin.TabularInline):
    model = TaskNote
    extra = 0


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'assigned_to', 'status', 'priority', 'due_date', 'is_archived', 'deleted_at', 'created_at')
    list_filter = ('status', 'priority', 'is_archived', 'is_recurring', 'created_at', 'due_date')
    search_fields = ('title', 'description', 'notes', 'user__email', 'assigned_to__email', 'labels__name')
    filter_horizontal = ('labels',)
    inlines = [TaskChecklistItemInline, TaskCommentInline, TaskNoteInline, TaskAttachmentInline]


@admin.register(TaskLabel)
class TaskLabelAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'workspace', 'color', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'user__email', 'workspace__name')


@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ('task', 'user', 'created_at')
    search_fields = ('content', 'task__title', 'user__email')


@admin.register(TaskAttachment)
class TaskAttachmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'task', 'user', 'uploaded_at')
    search_fields = ('name', 'task__title', 'user__email')


@admin.register(TaskChecklistItem)
class TaskChecklistItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'task', 'created_by', 'is_completed', 'created_at')
    list_filter = ('is_completed', 'created_at')
    search_fields = ('title', 'task__title', 'created_by__email')


@admin.register(TaskNote)
class TaskNoteAdmin(admin.ModelAdmin):
    list_display = ('task', 'user', 'created_at')
    search_fields = ('content', 'task__title', 'user__email')
