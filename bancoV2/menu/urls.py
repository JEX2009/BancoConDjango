from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.start, name="start"),
    path('ingresar/', views.ingresarTodos, name="ingresarTodos"),
    path('retirar/', views.retirar, name="retirar"),
    path('rConfirmacion/', views.retirarConfirmacion, name="retirarConfirmacion"),
    path('sobres/', views.sobres, name="sobres"),
    path('obtencionId/<int:id>', views.obtencionId, name="obtencionId"),
    path('sobresModificar/<int:id>', views.formModificar, name="sobresModificar"),
    path('sobresGuardar/<int:id>', views.guardarSobre, name="sobresGuardar"),
    path('sobresEliminar/<int:id>', views.sobresEliminar, name="sobresEliminar"),
    path('crearSobre/', views.formCrearSobre, name="crearSobre"),
    path('sobreCreado/', views.guardarNuevo, name="sobreCreado"),
]
