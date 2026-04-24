from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Sobres
from .serializers import SobreSerializer
from decimal import Decimal, InvalidOperation
from rest_framework.exceptions import ValidationError, ParseError

class SobreViewSet(viewsets.ModelViewSet):
    queryset = Sobres.objects.select_related('usuario').all().order_by('nombre')
    serializer_class = SobreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = Sobres.objects.select_related('usuario')
        
        if user.is_authenticated:
            queryset = queryset.filter(usuario=user)
        else:
            queryset = queryset.filter(is_public=True)
            
        return queryset.order_by('-activo', 'nombre')

    def perform_create(self, serializer):
        user = self.request.user
        
        if self.request.user.is_authenticated:
            serializer.save(usuario=user)
        else:
            serializer.save(is_public=True)

    def perform_destroy(self, instance):
        instance.activo = False
        instance.save()
    
    @action(detail=True, methods=['post'])
    def reactivar(self, request, pk=None):
        sobre = self.get_object()
        sobre.activo = True
        sobre.save()
        
        serializer = self.get_serializer(sobre)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'],url_path="repartir")
    def repartir(self,request,pk=None):
        monto_raw = request.data.get("monto")
    
        if monto_raw is None or str(monto_raw).strip() == "":
            return Response(
                {"error": "El monto es requerido"}, 
                status=status.HTTP_400_BAD_REQUEST
        )
        
        try:
            monto = Decimal(str(monto_raw))
            if monto <= 0:
                raise ValidationError({"error": "El monto debe ser mayor a cero"})
            user = self.request.user
            respuesta_visual=Sobres.repartir_monto_global(monto,user)
            return Response(respuesta_visual, status=status.HTTP_200_OK)
        except ValueError as e:
            raise ValidationError({"error": str(e)})
        
        except Exception as e:
            return Response(
                {"error": "Error inesperado", "code": "unknown_error", "real": e}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'], url_path="ingreso_egreso")
    def ingreso_egreso(self, request, pk=None):
        monto_raw = request.data.get("monto")
        operacion = request.data.get("operacion")
        sobre_id = request.data.get("sobre_id")
        user = self.request.user

        if not monto_raw or str(monto_raw).strip() == "":
            return Response({"error": "El monto es requerido"}, status=status.HTTP_400_BAD_REQUEST)

        if not sobre_id:
            return Response({"error": "El ID del sobre es requerido"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            monto = Decimal(str(monto_raw))
            if monto <= 0:
                return Response({"error": "El monto debe ser mayor a cero"}, status=status.HTTP_400_BAD_REQUEST)
            return self._ejecutar_movimiento(operacion, monto, sobre_id, user)

        except (ValueError, InvalidOperation):
            return Response({"error": "Formato de monto inválido"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "Error inesperado", "code": "unknown_error", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _ejecutar_movimiento(self, operacion, monto, sobre_id, user):
        if operacion == "Ingreso":
            respuesta = Sobres.ingreso(monto, sobre_id, user)
        elif operacion == "Retiro":
            respuesta = Sobres.egreso(monto, sobre_id, user)
        else:
            return Response({"error": "Operación inválida"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(respuesta, status=status.HTTP_200_OK)