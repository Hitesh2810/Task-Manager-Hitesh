from rest_framework.permissions import BasePermission


class IsTaskOwnerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        task = getattr(obj, 'task', obj)
        return (
            task.user_id == request.user.id
            or task.created_by_id == request.user.id
            or task.assigned_to_id == request.user.id
            or (task.workspace_id and task.workspace.members.filter(user=request.user).exists())
        )
