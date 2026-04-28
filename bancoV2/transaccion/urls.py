from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransaccionViewSet

router = DefaultRouter()
router.register(r'Transacciones', TransaccionViewSet, basename='transaccion')

urlpatterns= [
    path('',include(router.urls))
]