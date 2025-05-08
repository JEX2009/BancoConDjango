from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def start(request):
    return render(request,'home.html')
    

def ingresarTodos(request):
    return render(request,'ingresar/ingresarTodos.html')

def ingresarUno(request):
    return render(request,'ingresar/ingresarUno.html')

def retirar(request):
    return render(request,'retirar/retirar.html')

def balance(request):
    return render(request,'balance/balance.html')

def sobres(request):
    return render(request,'sobres/sobres.html')