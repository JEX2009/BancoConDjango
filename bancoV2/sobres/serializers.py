from rest_framework import serializers
from . import models as m
from django.db import transaction
from django.db.models import F, Sum,Value
from django.db.models.functions import Coalesce

class SobreSerializer(serializers.ModelSerializer):
    usuario_read = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = m.Sobres
        fields = ['id', 'nombre', 'saldo', 'limite', 'activo', 'porcentaje', 'fecha_creacion', 'usuario_read']
        read_only_fields = ['fecha_creacion', 'id', 'usuario_read']

    def validate(self, data):
        # 1. Validaciones básicas de lógica
        saldo = data.get('saldo', self.instance.saldo if self.instance else 0)
        limite = data.get('limite', self.instance.limite if self.instance else 0)
        
        if saldo > limite and limite != 0: 
            raise serializers.ValidationError({
                "error": "El saldo no puede superar el límite del sobre."
            })

        nuevo_porcentaje = data.get('porcentaje')

        if nuevo_porcentaje is not None:
            usuario = self.context['request'].user
            
            with transaction.atomic():
                queryset = m.Sobres.objects.select_for_update().filter(
                    usuario=usuario, 
                    activo=True
                )

                if self.instance and self.instance.id:
                    queryset = queryset.exclude(id=self.instance.id)

                total_acumulado = queryset.aggregate(
                    total=Coalesce(Sum('porcentaje'), Value(0))
                )['total']

                if total_acumulado + nuevo_porcentaje > 100:
                    raise serializers.ValidationError({
                        "error": f"Solo te queda un {100 - total_acumulado}% disponible para repartir."
                    })

        return data