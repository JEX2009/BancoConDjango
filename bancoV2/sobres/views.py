from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Sobres
from .serializers import SobreSerializer

class SobreViewSet(viewsets.ModelViewSet):
    queryset = Sobres.objects.all().order_by('nombre')
    serializer_class = SobreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        
        if user.is_authenticated:
            queryset = Sobres.objects.filter(usuario=user)
        else:
            queryset = Sobres.objects.filter(is_public=True)
            
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