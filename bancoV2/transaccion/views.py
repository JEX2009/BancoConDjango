from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaccion
from .serializers import TransaccionSerializer

from django.utils.dateparse import parse_date

class TransaccionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TransaccionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # 1. Base del queryset (Solo lo del usuario)
        user = self.request.user
        queryset = Transaccion.objects.filter(sobre__usuario=user).select_related('sobre')

        # 2. Captura de parámetros de la URL
        sobre_id = self.request.query_params.get('sobre_id')
        fecha_inicio = self.request.query_params.get('fecha_inicio')
        fecha_fin = self.request.query_params.get('fecha_fin')

        # 3. Aplicación de filtros si existen
        if sobre_id:
            queryset = queryset.filter(sobre_id=sobre_id)
        
        if fecha_inicio and fecha_fin:
            # parse_date asegura que el formato sea YYYY-MM-DD
            queryset = queryset.filter(fecha_creacion__date__range=[fecha_inicio, fecha_fin])
        elif fecha_inicio:
            queryset = queryset.filter(fecha_creacion__date__gte=fecha_inicio)

        return queryset.order_by('-fecha_creacion')