from sobres.models import Sobres
from rest_framework import serializers
from .models import Prestamo
from sobres.serializers import SobreSerializer

class PrestamoSerializer(serializers.ModelSerializer):
    saldo_pendiente = serializers.ReadOnlyField()
    fecha_creacion = serializers.ReadOnlyField()
    sobre_origen = serializers.PrimaryKeyRelatedField(queryset=Sobres.objects.none())
    sobre_destino = serializers.PrimaryKeyRelatedField(queryset=Sobres.objects.none())
    class Meta:
        model = Prestamo
        fields = ['id', 'sobre_origen', 'sobre_destino', 'monto_total', 'monto_pagado', 'saldo_pendiente', 'completado', 'fecha_creacion', 'user']
        read_only_fields = ['monto_pagado', 'saldo_pendiente', 'fecha_creacion', 'user']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user = request.user
            self.fields['sobre_origen'].queryset = Sobres.objects.filter(usuario=user)
            self.fields['sobre_destino'].queryset = Sobres.objects.filter(usuario=user)

    def validate(self, attrs):
        if attrs.get('monto_total') <= 0:
            raise serializers.ValidationError( {"error": "El monto total debe ser mayor a cero"})

        if attrs.get('sobre_origen') == attrs.get('sobre_destino'):
            raise serializers.ValidationError(
                {"error": "El sobre de origen y destino no pueden ser el mismo"}
            )
        return attrs
    
class PrestamoReadSerializer(serializers.ModelSerializer):
    saldo_pendiente = serializers.ReadOnlyField()
    fecha_creacion = serializers.ReadOnlyField()
    sobre_origen = SobreSerializer(read_only=True)
    sobre_destino = SobreSerializer(read_only=True)
    class Meta:
        model = Prestamo
        fields = ['id', 'sobre_origen', 'sobre_destino', 'monto_total', 'monto_pagado', 'saldo_pendiente', 'completado', 'fecha_creacion', 'user']
        read_only_fields = ['monto_pagado', 'saldo_pendiente', 'fecha_creacion', 'user']