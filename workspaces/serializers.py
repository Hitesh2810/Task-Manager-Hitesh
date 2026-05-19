from rest_framework import serializers

from accounts.serializers import UserSerializer
from .models import Workspace, WorkspaceMember


class WorkspaceMemberSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)

    class Meta:
        model = WorkspaceMember
        fields = ('id', 'workspace', 'user', 'user_detail', 'role', 'joined_at')
        read_only_fields = ('id', 'joined_at')

    def validate_workspace(self, value):
        request = self.context.get('request')
        if request and request.user.is_authenticated and request.user.role != 'admin':
            can_manage = value.owner_id == request.user.id or value.members.filter(
                user=request.user,
                role__in=[WorkspaceMember.Role.OWNER, WorkspaceMember.Role.ADMIN, WorkspaceMember.Role.MANAGER],
            ).exists()
            if not can_manage:
                raise serializers.ValidationError('You do not have permission to manage members in this workspace.')
        return value

    def validate_role(self, value):
        if value == WorkspaceMember.Role.OWNER:
            raise serializers.ValidationError('Owner role is managed automatically.')
        return value


class WorkspaceSerializer(serializers.ModelSerializer):
    members = WorkspaceMemberSerializer(many=True, read_only=True)
    owner_detail = UserSerializer(source='owner', read_only=True)

    class Meta:
        model = Workspace
        fields = (
            'id', 'owner', 'owner_detail', 'name', 'slug', 'description',
            'color', 'is_active', 'is_archived', 'members', 'created_at', 'updated_at',
        )
        read_only_fields = ('id', 'owner', 'slug', 'created_at', 'updated_at')
