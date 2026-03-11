from django.db import migrations

def crear_sobre_publico_inicial(apps, schema_editor):
    # Usamos apps.get_model para evitar importar el modelo directamente
    Sobres = apps.get_model('sobres', 'Sobres')
    
    # Insertamos el registro
    Sobres.objects.create(
        nombre="Sobre Público Inicial",
        is_public=True,
        usuario=None, # Sin usuario asignado
        saldo=0,
        limite=0,
        activo=True,
        porcentaje=0
    )

class Migration(migrations.Migration):

    dependencies = [
        # Es vital que dependa de la migración que acabas de mostrar (la 0001)
        ('sobres', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(crear_sobre_publico_inicial),
    ]