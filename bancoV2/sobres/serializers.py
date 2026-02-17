from rest_framework import serializers
from . import models as m

class SobreSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Sobres
        fields= ['id','nombre','saldo','limite','activo','porcentaje','fecha_creacion','fecha_actualizacion']
        read_only_fields=['fecha_creacion','fecha_actualizacion','id']
    
    def validate_saldo(self,value):
        if value < 0:
            raise serializers.ValidationError("El saldo no puede ser menor a 0.")
        return value
    
    def validate_porcentaje(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("El porcentaje debe estar entre 0 y 100.")
        return value
    