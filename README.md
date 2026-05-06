# Proyecto Banco (BancoV2)

Sistema integral de gestión financiera diseñado para la administración de presupuestos mediante sobres, control de préstamos, y distribución automática de fondos.

---

## 🛠️ Arquitectura y Tecnologías

El proyecto está dividido en una arquitectura modular que conecta el backend con el frontend:

* **Backend:** Python con **Django** y **Django REST Framework**.
* **Frontend:** **React** con Vite, Tailwind CSS, y `react-hook-form` para una interfaz fluida.
* **Base de Datos:** **PostgreSQL** persistente.
* **Contenerización:** **Docker** y **Docker Compose** para la gestión de servicios.

---

## 📁 Módulos Principales

* **Gestión de Sobres:** Permite crear, editar, activar/desactivar y consultar sobres financieros. Cada sobre mantiene un control de saldos y límites de meta.
* **Préstamos:** Módulo para administrar el flujo de fondos entre sobres (origen y destino), con control de saldos pendientes y pagos.
* **Gestión de Fondos:** Ingresos y egresos rápidos validados por el estado del sobre y saldo disponible.
* **Reparto Global:** Distribución de un monto total entre todos los sobres activos utilizando porcentajes definidos.
* **Historial e Inicio:** Tabla de movimientos y transacciones con filtrado avanzado por fechas y estado.

---

## 🚀 Despliegue Local

### Requisitos Previos
* [Docker](https://www.docker.com/) instalado.
* [Docker Compose](https://docs.docker.com/) instalado.

### Pasos para Ejecutar

1. **Clonar o abrir el directorio del proyecto** en la terminal.

2. **Iniciar los contenedores** ejecutando el siguiente comando para construir y levantar los servicios sin perder los volúmenes de la base de datos:

   ```bash
   docker-compose up --build
   ```

3. **Acceder a la aplicación:**
   * **Frontend:** `http://localhost:5173`
   * **Backend (API):** `http://localhost:8000`

---

## ⚙️ Configuración del Entorno (Settings)

El archivo `settings.py` cuenta con la configuración de seguridad, CORS y conexión a la base de datos a través de variables de entorno:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
```

---

## 🔒 Autenticación

El sistema utiliza **Simple JWT** en combinación con cookies HTTP-Only para la protección de rutas y endpoints del usuario. Los esquemas de autenticación soportan validación personalizada en la API.

---

© 2026 Banco Con Django. Todos los derechos reservados.
