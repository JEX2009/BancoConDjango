from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SobreViewSet

router = DefaultRouter()
router.register(r'Sobres', SobreViewSet, basename='sobre')

urlpatterns = [
    path('', include(router.urls)),
]