from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Prestamo
from .serializers import PrestamoReadSerializer, PrestamoSerializer
from rest_framework.exceptions import ValidationError, ParseError

class PrestamoViewSet(viewsets.ModelViewSet):
    serializer_class = PrestamoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return PrestamoReadSerializer
        return PrestamoSerializer

    @action(detail=True, methods=['put'])
    def pagar(self, request, pk=None):
        prestamo = self.get_object()
        monto_pago = request.data.get('monto')

        if monto_pago is None:
            raise Response({"error": "El campo 'monto' es requerido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            monto_pago = float(monto_pago)
        except ValueError:
            raise ValidationError({"error": "El monto debe ser un número válido."})

        if monto_pago <= 0:
            raise ValidationError({"error": "El monto de pago debe ser mayor a cero."})

        if prestamo.completado:
            return Response({"error": "El préstamo ya está completado."}, status=status.HTTP_400_BAD_REQUEST)

        if monto_pago > prestamo.saldo_pendiente:
            return Response({"error": "El monto de pago excede el saldo pendiente."}, status=status.HTTP_400_BAD_REQUEST)

        prestamo.registrar_pago(monto_pago)
        prestamo.save() 
        serializer = self.get_serializer(prestamo)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        user = self.request.user
        queryset = Prestamo.objects.filter(user=user).select_related('sobre_origen', 'sobre_destino')
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        monto = serializer.validated_data['monto_total']

        prestamo = Prestamo(
            sobre_origen=serializer.validated_data['sobre_origen'],
            sobre_destino=serializer.validated_data['sobre_destino'],
            monto_total=monto,
            user=request.user
        )

        try:
            prestamo.hacer_prestamo(monto)
        except ValueError as e:
            raise ValidationError({"error": str(e)})

        serializer = self.get_serializer(prestamo)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

