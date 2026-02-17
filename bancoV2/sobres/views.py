from rest_framework import viewsets, permissions
from .models import Sobres
from .serializers import SobreSerializer

class SobreViewSet(viewsets.ModelViewSet):
    queryset = Sobres.objects.all().order_by('nombre')
    serializer_class = SobreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Sobres.objects.filter(usuario=user, activo=True)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    def perform_destroy(self, instance):
        instance.activo = False
        instance.save()