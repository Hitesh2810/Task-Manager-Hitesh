from rest_framework.permissions import BasePermission

from .models import WorkspaceMember


class IsWorkspaceOwnerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin' or obj.owner_id == request.user.id:
            return True
        return WorkspaceMember.objects.filter(
            workspace=obj,
            user=request.user,
            role__in=[WorkspaceMember.Role.ADMIN, WorkspaceMember.Role.MANAGER],
        ).exists()
