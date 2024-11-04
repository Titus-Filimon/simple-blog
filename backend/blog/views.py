# views.py
from rest_framework import viewsets
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

