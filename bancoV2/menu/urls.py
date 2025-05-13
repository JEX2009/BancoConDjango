from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.start, name="start"),# Barra lateral puesto 1
    path('ingresar/', views.ingresarTodos, name="ingresarTodos"),#Barra lateral puesto 2
    path('retirar/', views.retirar, name="retirar"),#Barra lateral puesto 3
    path('sobres/', views.sobres, name="sobres"),#Barra lateral puesto 4
    path('rConfirmacion/', views.retirarConfirmacion, name="retirarConfirmacion"),# Paso de de ingresar
    path('obtencionId/<int:id>', views.obtencionId, name="obtencionId"),# Se usa en modificar
    path('sobresModificar/<int:id>', views.formModificar, name="sobresModificar"),#Se usa en modificar para obtener
    path('sobresGuardar/<int:id>', views.guardarSobre, name="sobresGuardar"),#Se usa en modificar para guardar sus cambios
    path('sobresEliminar/<int:id>', views.sobresEliminar, name="sobresEliminar"),#Se usa en modificar para eliminar 
    path('crearSobre/', views.formCrearSobre, name="crearSobre"),#Se usa en modificar para crear sobre
    path('sobreCreado/', views.guardarNuevo, name="sobreCreado"),# Se usa en crear para guardar
    path('ingresarTodo/', views.ingresar, name="ingresarParaTodos")#Se usa para procesar los datos
]
