# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer

class IsSuperUser(permissions.BasePermission):
    """
    Custom permission to only allow superusers to edit or delete posts.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
     # Bulk deletion
    @action(detail=False, methods=['post'])
    def bulk_delete(self, request):
        ids = request.data.get('ids', [])
        if ids:
            # Deleting the posts with the given IDs
            deleted, _ = Post.objects.filter(id__in=ids).delete()
            return Response({'deleted_count': deleted}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'No IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

