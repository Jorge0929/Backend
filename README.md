### 2. `README.md` para `contapp-backend`

Crea un archivo llamado `README.md` en la raíz de tu proyecto `contapp-backend` y pega la siguiente plantilla. Edítala con tus detalles.

```markdown
ContApp - Backend API

Descripción del Proyecto

Este repositorio contiene el código fuente del API backend para ContApp, una aplicación web diseñada para simplificar la preparación y comprensión de la declaración de renta para personas naturales en Colombia.

Este backend proporciona los servicios necesarios para la autenticación de usuarios y la gestión (creación, lectura, actualización) de borradores de declaración de renta.

Estado del Proyecto

Fase Actual: API funcional para las características MVP.
Funcionalidad: Endpoints para registro, login (con JWT), protección de rutas, y operaciones CRUD para declaraciones.

Características Implementadas (API)

Autenticación de Usuarios:**
    * Registro de nuevos usuarios (`/api/auth/register`).
    * Inicio de sesión con generación de JSON Web Tokens (JWT) (`/api/auth/login`).
    * Middleware para proteger rutas que requieren autenticación.
    * Endpoint para obtener datos del usuario actual (`/api/auth/me`).
Gestión de Declaraciones (Protegido por JWT):**
    * Crear un nuevo borrador de declaración (`POST /api/declarations`).
    * Obtener todas las declaraciones de un usuario (`GET /api/declarations`).
    * Obtener un borrador de declaración específico por ID (`GET /api/declarations/:id`).
    * Actualizar un borrador de declaración existente (`PUT /api/declarations/:id`).
Seguridad: Hasheo de contraseñas con `bcryptjs`.

Tech Stack

Entorno: Node.js
Framework: Express.js
Base de Datos: MongoDB
ODM (Object Data Modeling): Mongoose
Autenticación:** JSON Web Tokens (JWT)
Hasheo de Contraseñas: `bcryptjs`
Middleware: `cors`, `dotenv`
Gestor de Paquetes: npm

Prerrequisitos

* Node.js (v18.x o superior recomendado) y npm.
* Una instancia de MongoDB corriendo (localmente o una URI de MongoDB Atlas).

Variables de Entorno

