from django.db import models
from django.core.validators import MinValueValidator

class Prestamo(models.Model):
    sobre_origen= models.ForeignKey("sobres.Sobres", on_delete=models.PROTECT, related_name='prestamo_dados')
    sobre_destino= models.ForeignKey("sobres.Sobres", on_delete=models.PROTECT, related_name='prestamo_recibidos')
    monto_total = models.DecimalField(max_digits=12,decimal_places=2, validators=[MinValueValidator(0.01)])
    monto_pagado = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    completado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    @property
    def saldo_pendiente(self):
        return self.monto_total - self.monto_pagado
    class Meta:
        verbose_name="Prestamo"
        verbose_name_plural='Prestamos'
        indexes=[
            models.Index(fields=['sobre_origen', 'completado']),
            models.Index(fields=['sobre_destino','completado']),
            
        ]