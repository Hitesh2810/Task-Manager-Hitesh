from django.db.models import Q
from rest_framework import decorators, permissions, response, status, viewsets

from notifications.models import Notification

from .models import Workspace, WorkspaceMember
from .permissions import IsWorkspaceOwnerOrAdmin
from .serializers import WorkspaceMemberSerializer, WorkspaceSerializer


class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated, IsWorkspaceOwnerOrAdmin]
    filterset_fields = ('is_active', 'is_archived')
    search_fields = ('name', 'description')
    ordering_fields = ('name', 'created_at', 'updated_at')

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Workspace.objects.all().prefetch_related('members')
        return Workspace.objects.filter(Q(owner=user) | Q(members__user=user)).distinct().prefetch_related('members')

    def perform_create(self, serializer):
        workspace = serializer.save(owner=self.request.user)
        WorkspaceMember.objects.get_or_create(
            workspace=workspace,
            user=self.request.user,
            defaults={'role': WorkspaceMember.Role.OWNER},
        )

    @decorators.action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        workspace = self.get_object()
        workspace.is_archived = True
        workspace.save(update_fields=['is_archived'])
        return response.Response(self.get_serializer(workspace).data)

    @decorators.action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        workspace = self.get_object()
        workspace.is_archived = False
        workspace.save(update_fields=['is_archived'])
        return response.Response(self.get_serializer(workspace).data)


class WorkspaceMemberViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceMemberSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ('workspace', 'role')
    search_fields = ('user__email', 'user__full_name', 'workspace__name')
    ordering_fields = ('joined_at',)

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return WorkspaceMember.objects.select_related('workspace', 'user')
        return WorkspaceMember.objects.filter(
            Q(workspace__owner=user) | Q(workspace__members__user=user, workspace__members__role__in=['owner', 'admin', 'manager'])
        ).distinct().select_related('workspace', 'user')

    def perform_create(self, serializer):
        member = serializer.save()
        Notification.objects.create(
            user=member.user,
            title='Workspace invite',
            message=f'You were added to workspace: {member.workspace.name}',
            type=Notification.Type.WORKSPACE_INVITE,
            metadata={'workspace_id': str(member.workspace_id)},
        )

    def destroy(self, request, *args, **kwargs):
        member = self.get_object()
        if member.role == WorkspaceMember.Role.OWNER:
            return response.Response({'detail': 'Workspace owner membership cannot be removed.'}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)
