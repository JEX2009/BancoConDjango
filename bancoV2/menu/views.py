from django.http import HttpResponse
from .models import sobres as sobreModels
from django.shortcuts import render,redirect
from .forms import *
from math import floor

# Create your views here.
def start(request):
    return render(request,'home.html')  

def ingresarTodos(request):
    todosSobres = sobreModels.objects.all()
    return render(request,'ingresar/ingresarTodos.html',{
        'forms':meterDinero(),
        'sobres': todosSobres
    })

def retirar(request):
    todosSobres = sobreModels.objects.all()
    return render(request,'retirar/retirar.html',{
        'forms' : sacarDinero,
        'sobres': todosSobres
    })

def retirarConfirmacion(request):
        sobreRetirar= request.POST['sobre'].strip().capitalize()
        sobreBuscado = sobreModels.objects.get(nombre=sobreRetirar)
        retiro = int(request.POST['cantidad'])
        seLogro = False
        if sobreBuscado.saldo >= retiro :
            sobreBuscado.saldo -= retiro
            sobreBuscado.save()
            seLogro= True
        
        return render(request, 'retirar/confirmacion.html',{
            "seLogro":seLogro,
            "retiro":retiro,
            "sobre":sobreBuscado
        })

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
        nombreStr = request.POST["nombre"].strip().capitalize()
        sobreModels.objects.create(
            nombre=nombreStr
            ,saldo=request.POST["saldo"]
            ,limite=request.POST["limite"]
            ,porcentaje=request.POST["porcentaje"])
        return render(request, 'sobres/confirmacion.html')
    else:
        return render(request, 'sobres/confirmacion.html')

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
        Datos.append(request.POST.get(valor))
    Datos.pop(0)
    sobre = sobreModels.objects.get(id=id)
    nombre =Datos[0].strip().capitalize()
    sobre.nombre= nombre
    sobre.saldo = Datos[1]
    sobre.limite= Datos[2]
    sobre.porcentaje= Datos[3]
    
    sobre.save()
    return render(request, 'sobres/confirmacion.html')

def sobresEliminar(request,id):
    sobre = sobreModels.objects.get(id=id)
    sobre.delete()
    return render(request, 'sobres/confirmacion.html')

def ingresar(request):
    sobreLleno = []
    cantidad = []
    sobresVacios = []
    colones = [1000,2000,5000,10000,20000]
    ingresos = {}
    for billetes in request.POST:
        cantidad.append(request.POST.get(billetes))
    cantidad.pop(0)
    
    total = sum(col * int(cant) for col, cant in zip(colones, cantidad)) if cantidad else 0
    
    sobreMayorPorcentaje = sobreModels("Prueba",0,0,0,0)
    for sobre in sobreModels.objects.all():
        if sobreMayorPorcentaje.porcentaje <sobre.porcentaje:
            sobreMayorPorcentaje = sobre
            
        if sobre.limite == sobre.saldo and sobre.saldo > 0:
            sobreLleno.append(sobre)
        else:
            sobresVacios.append(sobre)
    dineroSale = total
    
    for sobre in sobresVacios:
        porcentaje = sobre.porcentaje / 100     #Calculan cuanto dinero ira para ese sobre
        dineroAsignado = int(total * porcentaje)#Calculan cuanto dinero ira para ese sobre
        if dineroAsignado % 1000 != 0  and dineroSale >= 1000:
            while dineroAsignado % 1000 != 0 :
                dineroAsignado -=100
            #Si en dinero asignado empieza a dar menos que 1000 se meten al ultimo
        if dineroAsignado > dineroSale:
            dineroAsignado = dineroSale
            #Si dinero saliente es menor de lo que se calcula se pone el restante

        ingresos[sobre.nombre ] =  dineroAsignado
        sobre.saldo += dineroAsignado
        sobre.save()
        dineroSale -= dineroAsignado
        #Proceso de guardado en sobre
        
    if dineroSale > 0 and sobresVacios:
        ingresos[sobre.nombre ] =  dineroAsignado
        sobreMayorPorcentaje.saldo += dineroSale
        sobreMayorPorcentaje.save()
        #Se guarda lo restante 
        
    return render(request, 'ingresar/ingreso.html',{
        "ingresos": ingresos,
        })
    
def ingresarUno(request) : 
    todosSobres = sobreModels.objects.all()
    return render(request,'ingresar/ingresarUno.html',{
        'forms' : sacarDinero,
        'sobres': todosSobres})

def ingresarUnoConfirmacion(request):
        sobreIngresar= request.POST['sobre'].strip().capitalize()
        sobreBuscado = sobreModels.objects.get(nombre=sobreIngresar)
        ingreso = int(request.POST['cantidad'])
        sobreBuscado.saldo += ingreso
        sobreBuscado.save()
        
        return render(request, 'ingresar/confirmacion.html',{
            "ingreso":ingreso,
            "sobre":sobreBuscado
        })