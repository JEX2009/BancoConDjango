from django import forms
from .models import sobres

class crearSobre(forms.Form):
    nombre= forms.CharField ()
    saldo= forms.IntegerField()
    limite= forms.IntegerField()
    porcentaje= forms.IntegerField()
    
class modificarSobre(forms.ModelForm):
    class Meta:
        model = sobres  
        fields = ['nombre', 'saldo', 'limite', 'activo']

class sacarDinero(forms.Form):
    sobre=  forms.CharField ()
    cantidad= forms.IntegerField()
    
class meterDinero(forms.Form):
    billetes1= forms.IntegerField(label="Agrega la cantidad de billletes de 1000")
    billetes2= forms.IntegerField(label="Agrega la cantidad de billletes de 2000")
    billetes5= forms.IntegerField(label="Agrega la cantidad de billletes de 5000")
    billetes10= forms.IntegerField(label="Agrega la cantidad de billletes de 10000")
    billetes10= forms.IntegerField(label="Agrega la cantidad de billletes de 20000")