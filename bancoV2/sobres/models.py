from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings

class Sobres(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='sobres', blank=True, null=True)
    nombre = models.CharField(max_length=100,unique=True)
    saldo = models.DecimalField(max_digits=12,decimal_places=2,default=0,validators=[MinValueValidator(0)])
    limite = models.DecimalField(max_digits=12, decimal_places=2, default=0,validators=[MinValueValidator(0)])
    activo = models.BooleanField(default=True)
    porcentaje = models.IntegerField(default=0,validators=[MinValueValidator(0), MaxValueValidator(100)])
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)
    class Meta:
        verbose_name = "Sobre"
        verbose_name_plural = "Sobres"
        ordering = ['-fecha_creacion']

    def __str__(self):
        nombre_usuario = self.usuario.username if self.usuario else "Sin asignar"
        return f"{self.nombre} - {nombre_usuario}"
