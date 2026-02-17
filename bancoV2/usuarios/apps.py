from django.apps import AppConfig


class UsuariosConfig(AppConfig):
    name = 'usuarios'
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        import usuarios.signals