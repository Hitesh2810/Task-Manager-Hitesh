from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'title', 'message', 'type', 'is_read', 'read_at', 'metadata', 'created_at')
        read_only_fields = ('id', 'read_at', 'created_at')
