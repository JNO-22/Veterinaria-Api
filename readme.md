# API para gestion veterinaria :smile_cat:

Es una API RESTful desarrollada con Node.js, Express y MongoDB para ayudar al veterinario a gestionar la información de sus clientes y sus mascotas, ademas de realizar turnos.

## **Características**

* Gestión de Clientes ( CRUD ).
* Gestión de Mascotas (cada mascota está vinculada a un cliente)
* Gestión de Turnos unicos ( vinculados a una mascota).
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
        └── turnoController.js
    └── 📁models
        └── cliente.js
        └── mascota.js
        └── turno.js
    └── 📁routes
        └── clientRoutes.js
        └── mascotaRoutes.js
        └── turnoRoutes.js
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
  * Obtener las mascotas de un cliente: `GET /mascota/cliente/:id`
  * Obtener todas las mascotas y filtrar por especie:

  `--> GET /mascota`
  `--> GET /mascota?especie=<especie>`
  * Crear una nueva mascota: `POST /mascota`
  * Actualizar una mascota: `PUT /mascota/:id`
  * Eliminar una mascota: `DELETE /mascota/:id`

* **Turnos** :calendar:

  * Obtener todos los turnos y filtrar por dia:

  `--> GET /turno`
  `--> GET /turno?day=YYYY-MM-DD`

  * Crear un nuevo turno: `POST /turno`
  * Actualizar un turno: `PUT /turno/:id`
  * Eliminar un turno: `DELETE /turno/:id`

---

## **Uso de la API**

La API se encuentra en Vercel y puedes acceder a ella desde el siguiente enlace: [Fauna Veterinaria](https://veterinaria-api-peach.vercel.app/).
Puedes realizar operaciones siguiente los endpoints provistos en la sección **API Endpoints**.

### **Uso local**

Para usar la API de manera local , debes seguir los siguientes pasos:

1. Configura las variables de entorno en el archivo `.env`.

```bash
API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri
```

2. Instala las dependencias del proyecto con `npm install`.
3. Inicia el servidor con `npm start`.
4. Utiliza las rutas de la API para realizar las operaciones deseadas.
