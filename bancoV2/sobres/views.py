from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Sobres
from .serializers import SobreSerializer
from decimal import Decimal
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
            respuesta_visual="Ha ocurrido un error inesperado"
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