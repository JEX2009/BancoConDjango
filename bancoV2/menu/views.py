from django.http import HttpResponse
from .models import sobres as sobreModels
from django.shortcuts import render,redirect
from .forms import sacarDinero,crearSobre,meterDinero,modificarSobre

# Create your views here.
def start(request):
    return render(request,'home.html')  

def ingresarTodos(request):
    return render(request,'ingresar/ingresarTodos.html',{
        'forms':meterDinero()
    })

def retirar(request):
    sobresDB = sobreModels.objects.all()
    return render(request,'retirar/retirar.html',{
        'forms' : sacarDinero
    })

def retirarConfirmacion(request):
        sobreRetirar= request.POST['sobre'].strip()
        sobreBuscado = sobreModels.objects.get(nombre=sobreRetirar)
        retiro = int(request.POST['cantidad'])
        if sobreBuscado.saldo >= retiro :
            sobreBuscado.saldo -= retiro
            sobreBuscado.save()
            return HttpResponse("Se retiraron %d, el saldo restante es %d <br> <a href='/'>Salir</a>" % (retiro,sobreBuscado.saldo))
        else:
            return HttpResponse("Saldo insuficiente<br> <a href='/'>Salir</a>")

def sobres(request):
    sobresDB = sobreModels.objects.all()
    return render(request, 'sobres/sobres.html',{
        'sobres':sobresDB
    })

def formCrearSobre(request):
    return render(request,'sobres/crearSobre.html', {
    'forms': crearSobre()})

def guardarNuevo(request):
    if request.method == 'POST':
        sobreModels.objects.create(
            nombre=request.POST["nombre"]
            ,saldo=request.POST["saldo"]
            ,limite=request.POST["limite"]
            ,porcentaje=request.POST["porcentaje"])
        return render(request, 'sobres/confirmacion.html')
    else:
        return HttpResponse("Acceso no permitido directamente.")

def obtencionId(request, sobre_id):
    if request.method == 'POST':
        return redirect('formModificar', sobre_id)
    else:
        return HttpResponse("Acceso no permitido directamente.")

def formModificar(request, id):  
    sobre = sobreModels.objects.get(id=id)
    form = modificarSobre(instance=sobre)
    context = {'forms': form, 'sobre': sobre}
    return render(request, 'sobres/modificarSobre.html', context)

def guardarSobre(request,id):
    Datos = []
    for valor in request.POST:
        print(valor)
        Datos.append(request.POST.get(valor))
    Datos.pop(0)
    sobre = sobreModels.objects.get(id=id)
    
    sobre.nombre= Datos[0]
    sobre.saldo = Datos[1]
    sobre.limite= Datos[2]
    sobre.save()
    return HttpResponse("Se han realizado los cambio de forma satisfactoria <br> <a href='/'>Salir</a>")

def sobresEliminar(request,id):
    sobre = sobreModels.objects.get(id=id)
    sobre.delete()
    return HttpResponse("Se han realizado los cambio de forma satisfactoria <br> <a href='/'>Salir</a>")