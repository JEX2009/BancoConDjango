from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Sobres
from .serializers import SobreSerializer
from decimal import Decimal

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
        try:
            respuesta_visual="Ha ocurrido un error inesperado"
            monto =Decimal(str(request.data.get("monto")))
            print(monto)
            if not  monto:
                return Response({'status': '400, No se envio un monto'})
            if monto < 0: 
                return Response({'status': '400, El monto debe ser mayor a cero'})
            user = self.request.user
            respuesta_visual=Sobres.repartir_monto_global(monto,user)
            return Response({'status': '200 OK' , "respuesta_visual":respuesta_visual})
        except Exception as e:
            return Response({
                'status': '400',
                'error_real': str(e),
                'contexto': 'Hubo un error inesperado'
            }, status=400)