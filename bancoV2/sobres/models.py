from django.db import models,transaction
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from transaccion.models import Transaccion
from decimal import Decimal

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
        indexes=[
            models.Index(fields=['-fecha_creacion']),
            models.Index(fields=['usuario','activo'])
        ]
        
    def registrar_movimientos(self, monto, tipo, descripcion=""):
        with transaction.atomic():
            sobre=  Sobres.objects.select_for_update().get(pk=self.pk)
            if tipo == Transaccion.Estados.RETIRO:
                if sobre.saldo < monto:
                    raise ValueError("Saldo insuficiente para retirar")
                else:
                    sobre.saldo -= monto
            else:
                sobre.saldo += monto
            sobre.save()
            
            Transaccion.objects.create(
                sobre = sobre,
                monto=monto,
                estado=tipo,
                descripcion=descripcion
            )
    
    @classmethod
    def repartir_monto_global(cls, monto_total,usuario):
        with transaction.atomic():
            sobres= cls.objects.select_for_update().filter(usuario=usuario, activo=True,porcentaje__gt=0).order_by('id')
            
            if not sobres:
                raise ValueError("No existen sobres")
            
            monto_total = Decimal(str(monto_total))
            acumulado_repartido= Decimal("0.00")
            respuesta_visual = {}
            cantidad_sobres = sobres.count()
            for i , sobre in enumerate (sobres):
                if i == cantidad_sobres -1:
                    monto_a_depositar =  monto_total- acumulado_repartido
                    respuesta_visual[sobre.nombre]=monto_a_depositar
                else :
                    monto_a_depositar = (monto_total * Decimal(sobre.porcentaje) / Decimal('100')).quantize(Decimal('0.01'))
                
                if monto_a_depositar > 0:
                    respuesta_visual[sobre.nombre]=monto_a_depositar
                    sobre.registrar_movimientos(
                        monto=monto_a_depositar,
                        tipo=Transaccion.Estados.DEPOSITO,
                        descripcion=f"Reparto masivo de {monto_a_depositar}"
                    )
                acumulado_repartido+= monto_a_depositar
        return respuesta_visual
    def __str__(self):
        nombre_usuario = self.usuario.username if self.usuario else "Sin asignar"
        return f"{self.nombre} - {nombre_usuario}"

