from rest_framework import decorators, response, viewsets

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    filterset_fields = ('is_read', 'type')
    search_fields = ('title', 'message')
    ordering_fields = ('created_at', 'read_at')

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    @decorators.action(detail=True, methods=['post'], url_path='mark-read')
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.mark_as_read()
        return response.Response(self.get_serializer(notification).data)

    @decorators.action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        for notification in self.get_queryset().filter(is_read=False):
            notification.mark_as_read()
        return response.Response({'detail': 'Notifications marked as read.'})

    @decorators.action(detail=False, methods=['get'], url_path='unread-count')
    def unread_count(self, request):
        return response.Response({'unread_count': self.get_queryset().filter(is_read=False).count()})
