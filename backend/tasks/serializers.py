from rest_framework import serializers

from .models import Task, TaskAttachment, TaskChecklistItem, TaskComment, TaskLabel, TaskNote


def user_can_access_workspace(user, workspace):
    if not workspace:
        return True
    return user.role == 'admin' or workspace.owner_id == user.id or workspace.members.filter(user=user).exists()


def user_can_access_task(user, task):
    if user.role == 'admin':
        return True
    return (
        task.user_id == user.id
        or task.created_by_id == user.id
        or task.assigned_to_id == user.id
        or (task.workspace_id and task.workspace.members.filter(user=user).exists())
    )


class TaskLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLabel
        fields = ('id', 'workspace', 'name', 'color', 'created_at')
        read_only_fields = ('id', 'created_at')

    def validate_workspace(self, value):
        request = self.context.get('request')
        if value and request and request.user.role != 'admin':
            is_member = value.owner_id == request.user.id or value.members.filter(user=request.user).exists()
            if not is_member:
                raise serializers.ValidationError('You do not have access to this workspace.')
        return value


class TaskCommentSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = TaskComment
        fields = ('id', 'task', 'user', 'user_email', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'user_email', 'created_at', 'updated_at')

    def validate_task(self, value):
        request = self.context.get('request')
        if request and not user_can_access_task(request.user, value):
            raise serializers.ValidationError('You do not have access to this task.')
        return value


class TaskAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAttachment
        fields = ('id', 'task', 'user', 'file', 'name', 'uploaded_at')
        read_only_fields = ('id', 'user', 'uploaded_at')

    def validate_task(self, value):
        request = self.context.get('request')
        if request and not user_can_access_task(request.user, value):
            raise serializers.ValidationError('You do not have access to this task.')
        return value


class TaskChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskChecklistItem
        fields = ('id', 'task', 'created_by', 'title', 'is_completed', 'completed_at', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_by', 'completed_at', 'created_at', 'updated_at')

    def validate_task(self, value):
        request = self.context.get('request')
        if request and not user_can_access_task(request.user, value):
            raise serializers.ValidationError('You do not have access to this task.')
        return value


class TaskNoteSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = TaskNote
        fields = ('id', 'task', 'user', 'user_email', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'user_email', 'created_at', 'updated_at')

    def validate_task(self, value):
        request = self.context.get('request')
        if request and not user_can_access_task(request.user, value):
            raise serializers.ValidationError('You do not have access to this task.')
        return value


class TaskSerializer(serializers.ModelSerializer):
    comments = TaskCommentSerializer(many=True, read_only=True)
    attachments = TaskAttachmentSerializer(many=True, read_only=True)
    checklist_items = TaskChecklistItemSerializer(many=True, read_only=True)
    task_notes = TaskNoteSerializer(many=True, read_only=True)
    label_details = TaskLabelSerializer(source='labels', many=True, read_only=True)

    class Meta:
        model = Task
        fields = (
            'id', 'user', 'created_by', 'assigned_to', 'workspace', 'labels', 'label_details',
            'title', 'description', 'status', 'priority', 'due_date', 'start_date',
            'reminder_time', 'is_recurring', 'recurring_rule', 'notes', 'completed_at',
            'is_archived', 'deleted_at', 'comments', 'attachments', 'checklist_items',
            'task_notes', 'created_at', 'updated_at',
        )
        read_only_fields = ('id', 'user', 'created_by', 'completed_at', 'deleted_at', 'created_at', 'updated_at')

    def validate_workspace(self, value):
        request = self.context.get('request')
        if value and request and not user_can_access_workspace(request.user, value):
            raise serializers.ValidationError('You do not have access to this workspace.')
        return value

    def validate_assigned_to(self, value):
        workspace = self.initial_data.get('workspace')
        workspace_obj = getattr(self.instance, 'workspace', None)
        if value and workspace and not workspace_obj:
            from workspaces.models import Workspace
            try:
                workspace_obj = Workspace.objects.get(id=workspace)
            except Workspace.DoesNotExist as exc:
                raise serializers.ValidationError('Invalid workspace.') from exc
        if value and workspace_obj:
            is_member = workspace_obj.owner_id == value.id or workspace_obj.members.filter(user=value).exists()
            if not is_member:
                raise serializers.ValidationError('Assigned user must be a workspace member.')
        return value

    def validate_labels(self, value):
        request = self.context.get('request')
        workspace_id = self.initial_data.get('workspace')
        if request and request.user.role != 'admin':
            for label in value:
                if label.user_id != request.user.id and str(label.workspace_id) != str(workspace_id):
                    raise serializers.ValidationError('One or more labels are not available to this user.')
        return value
