from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import PostViewSet
from blog.views import LoginView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
]