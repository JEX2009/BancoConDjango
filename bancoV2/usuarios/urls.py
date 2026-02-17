from django.urls import path
from .views import LoginView, LogoutView,RegistroView,UserMeView

urlpatterns = [
    path('me/', UserMeView.as_view(), name='user_me'),
    path('registro/', RegistroView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]