from rest_framework import serializers
from . import models as m
from django.db import transaction
from django.db.models import F, Sum,Value
from django.db.models.functions import Coalesce

class SobreSerializer(serializers.ModelSerializer):
    usuario_read = serializers.ReadOnlyField(source='usuario.username')
    class Meta:
        model = m.Sobres
        fields= ['id','nombre','saldo','limite','activo','porcentaje','fecha_creacion', 'usuario_read']
        read_only_fields=['fecha_creacion','id','usuario_read']
        
    def validate(self,data):
        saldo = data.get('saldo')
        limite = data.get('limite')
        if saldo is not None and limite is not None and saldo > limite:
            raise serializers.ValidationError({
                "saldo": "El saldo no puede superar el límite del sobre."
            })
        return data 
        
    def validate_porcentaje(self, value): 
        usuario = self.context['request'].user

        with transaction.atomic():
            if self.instance and self.instance.id:
                queryset = m.Sobres.objects.filter(usuario=usuario, activo=True).exclude(id=self.instance.id)
            else:
                queryset = m.Sobres.objects.filter(usuario=usuario, activo=True)

            total_acumulado = queryset.aggregate(total=Coalesce(Sum('porcentaje'), Value(0)))['total']

            if total_acumulado + value > 100:
                raise serializers.ValidationError(
                    f"Solo te queda un {100 - total_acumulado}% disponible"
                )

        return value