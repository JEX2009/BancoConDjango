from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.

class sobres (models.Model):
    nombre= models.CharField (max_length=300)
    saldo= models.IntegerField(default=0,validators=[MinValueValidator(0)])
    limite= models.IntegerField(default=0,validators=[MinValueValidator(0)])
    activo= models.BooleanField(default=True)

    def __str__(self):
            return self.nombre


