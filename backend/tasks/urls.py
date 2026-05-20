from rest_framework.routers import DefaultRouter

from .views import (
    TaskAttachmentViewSet,
    TaskChecklistItemViewSet,
    TaskCommentViewSet,
    TaskLabelViewSet,
    TaskNoteViewSet,
    TaskViewSet,
)

router = DefaultRouter()
router.register('labels', TaskLabelViewSet, basename='task-label')
router.register('comments', TaskCommentViewSet, basename='task-comment')
router.register('checklists', TaskChecklistItemViewSet, basename='task-checklist')
router.register('notes', TaskNoteViewSet, basename='task-note')
router.register('attachments', TaskAttachmentViewSet, basename='task-attachment')
router.register('', TaskViewSet, basename='task')

urlpatterns = router.urls
