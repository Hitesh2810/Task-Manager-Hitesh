from django.contrib import admin

from .models import Workspace, WorkspaceMember


class WorkspaceMemberInline(admin.TabularInline):
    model = WorkspaceMember
    extra = 0


@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'color', 'is_active', 'is_archived', 'created_at')
    list_filter = ('is_active', 'is_archived', 'created_at')
    search_fields = ('name', 'description', 'owner__email')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [WorkspaceMemberInline]


@admin.register(WorkspaceMember)
class WorkspaceMemberAdmin(admin.ModelAdmin):
    list_display = ('workspace', 'user', 'role', 'joined_at')
    list_filter = ('role', 'joined_at')
    search_fields = ('workspace__name', 'user__email', 'user__full_name')
