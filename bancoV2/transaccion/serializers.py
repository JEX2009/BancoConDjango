from rest_framework import serializers
from . import models as m

class TransaccionSerializer(serializers.ModelSerializer):
    movimiento_sobre = serializers.ReadOnlyField(source='sobre.nombre')
    class Meta:
            model= m.Transaccion
            fields= ['movimiento_sobre','estado','fecha_creacion','descripcion','monto','saldo_anterior','saldo_nuevo']
            read_only_fields = fields
