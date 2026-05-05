from decimal import Decimal
from django.db import models, transaction
from django.core.validators import MinValueValidator
from sobres.models import Sobres
from transaccion.models import Transaccion

class Prestamo(models.Model):
    sobre_origen = models.ForeignKey("sobres.Sobres", on_delete=models.PROTECT, related_name='prestamo_dados')
    sobre_destino = models.ForeignKey("sobres.Sobres", on_delete=models.PROTECT, related_name='prestamo_recibidos')
    monto_total = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0.01)])
    monto_pagado = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    completado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, related_name='prestamos')
    @property
    def saldo_pendiente(self):
        return self.monto_total - self.monto_pagado

    class Meta:
        verbose_name = "Préstamo"
        verbose_name_plural = 'Préstamos'
        indexes = [
            models.Index(fields=['sobre_origen', 'completado']),
            models.Index(fields=['sobre_destino', 'completado']),
        ]

    def hacer_prestamo(self, monto):
        if monto <= 0:
            raise ValueError("El monto del préstamo debe ser mayor a cero.")
        
        if self.completado:
            raise ValueError("El préstamo ya está completado.")

        if self.sobre_origen.saldo < monto:
            raise ValueError("El sobre de origen no tiene suficiente saldo para el préstamo.")
        
        with transaction.atomic():
            self._registrar_movimientos(monto)
            self.monto_total = Decimal(str(monto))
            self.save()

    def _registrar_movimientos(self, monto):
        Sobres.prestamo(
            origen=self.sobre_origen.id, 
            destino=self.sobre_destino.id, 
            monto_egresar=monto, 
            usuario=self.user,
        )

    def registrar_pago(self, monto):
        if monto <= 0:
            raise ValueError("El monto del pago debe ser mayor a cero.")
        
        if self.completado:
            raise ValueError("El préstamo ya está completado.")

        if self.sobre_origen.saldo < monto:
            raise ValueError("El sobre de origen no tiene suficiente saldo para el pago")
        
        if self.sobre_destino.limite > 0 and (self.sobre_destino.saldo + monto) > self.sobre_destino.limite:
            raise ValueError("El pago excede el límite del sobre de destino")

        with transaction.atomic():
            self._registrar_movimientos_pago(monto)
            self.monto_pagado += Decimal(str(monto))
            if self.monto_pagado >= self.monto_total:
                self.completado = True
            self.save()