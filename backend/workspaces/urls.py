from rest_framework.routers import DefaultRouter

from .views import WorkspaceMemberViewSet, WorkspaceViewSet

router = DefaultRouter()
router.register('members', WorkspaceMemberViewSet, basename='workspace-member')
router.register('', WorkspaceViewSet, basename='workspace')

urlpatterns = router.urls
