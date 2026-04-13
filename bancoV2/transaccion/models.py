from django.db import models
from django.core.validators import MinValueValidator

class Transaccion(models.Model):
    class Estados(models.TextChoices):
        DEPOSITO = 'DE','deposito'  
        RETIRO = 'RE','retiro' 
        PRESTAMO = 'PR','prestamo' 
    sobre = models.ForeignKey("sobres.Sobres", on_delete=models.PROTECT, related_name='transaccion_sobre')
    estado = models.CharField(Estados.choices, max_length=2)
    fecha_creacion= models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0.01)])
    descripcion = models.CharField(max_length=255, blank=True)
    saldo_anterior = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    saldo_nuevo = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    class Meta:
        verbose_name='Transaccion'
        verbose_name_plural='Transacciones'
        indexes=[
            models.Index(fields=['sobre', '-fecha_creacion'])
        ]