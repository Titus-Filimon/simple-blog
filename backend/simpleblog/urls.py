from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]