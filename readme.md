# Api de gestion veterinaria

## Veterinaria Fauna :smile_cat:

Es una API RESTful desarrollada con Node.js, Express y MongoDB para ayudar a lo veterniarios a gestionar sus clientes y mascotas de manera eficiente.

## **Características**

* Gestión de Clientes ( CRUD ).
* Gestión de Mascotas (cada mascota está vinculada a un cliente)
* Persistencia de datos en MongoDB.
* Validación de datos y manejo de errores.

---

## **Tecnologías utilizadas** :computer:

* Node.js – Entorno de ejecución para JavaScript.
  * Express – Framework para desarrollar aplicaciones en Node.js.
  * dotenv – Gestión de variables de entorno en el proyecto.
* Cors – Configuración de políticas de acceso entre dominios (CORS).
* MongoDB – Base de datos NoSQL.
  * Mongoose – Librería ODM (Object Data Modeling) para interactuar con MongoDB.

---

## **Estructura del Proyecto** :construction:

La estructura del proyecto es la siguiente:

* **Directorios:**
  * `config`: Define la configuración de la base de datos.
  * `controllers`: Define las funciones de controlador para las rutas.
  * `models`: Configura los modelos de la base de datos ( clientes y mascotas).
  * `routes`: Define las rutas de la API.

``` bash
└── 📁Integrador
    └── 📁config
        └── db.js
    └── 📁controllers
        └── clientController.js
        └── mascotController.js
    └── 📁models
        └── cliente.js
        └── mascota.js
    └── 📁routes
        └── clientRoutes.js
        └── mascotaRoutes.js
    └── .env         # Variables de entorno
    └── app.js       # Punto de entrada
    └── readme.md
    └── vercel.json  # Configuración de Vercel
```

### **API Endpoints**

* **Clientes** :information_desk_person:
  * Obtener todos los clientes: `GET /cliente`
  * Obtener un cliente por ID: `GET /cliente/:id`
  * Crear un nuevo cliente: `POST /cliente`
  * Actualizar un cliente por ID: `PUT /cliente/:id`
  * Eliminar un cliente por ID: `DELETE /cliente/:id`

* **Mascotas** :dog:
  * Obtener todas las mascotas: `GET /mascota`
  * Crear una nueva mascota: `POST /mascota`
  * Actualizar una mascota: `PUT /mascota/:id`
  * Eliminar una mascota: `DELETE /mascota/:id`
  * Obtener las mascotas de un cliente: `GET /mascota/cliente/:id`

---

## **Uso de la API**

La API se encuentra en Vercel y puedes acceder a ella desde el siguiente enlace: [Fauna Veterinaria](https://veterinaria-api-peach.vercel.app/).

Para utilizar la API, sigue los siguientes pasos:

1. Configura las variables de entorno en el archivo `.env`.
2. Instala las dependencias del proyecto con `npm install`.
3. Inicia el servidor con `npm start`.
4. Utiliza las rutas de la API para realizar las operaciones deseadas.
