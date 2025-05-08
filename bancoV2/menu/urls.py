from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.start, name="start"),
    path('ingresar/', views.ingresarTodos, name="ingresarTodos"),
    path('ingresarU/', views.ingresarUno, name="ingresarUno"),
    path('retirar/', views.retirar, name="retirar"),
    path('balance/', views.balance, name="balance"),
    path('sobres/', views.sobres, name="sobres"),
]
