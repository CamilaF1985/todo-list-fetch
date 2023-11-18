# Mi Aplicación TODO List

Esta aplicación TODO List está construida con React y utiliza Axios para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con una API de backend. A continuación, se describen los aspectos clave de la integración con la API:

## Sincronización con la API

La aplicación se sincroniza con la API de backend en tres momentos críticos durante el tiempo de ejecución:

1. **Después de que la lista se carga vacía por primera vez (componentDidMount):**
   - Se obtienen (GET) los datos de la API para cargar la lista inicial de tareas.
   - Se actualizan las tareas en el front-end cuando la información finalmente llega.

2. **Cuando se agrega una nueva tarea:**
   - Se realiza una solicitud PUT para actualizar la lista en el servidor con la nueva tarea.
   - Las tareas se actualizan en el front-end para reflejar el cambio.

3. **Cuando se elimina una tarea:**
   - Se realiza una solicitud PUT para actualizar la lista en el servidor después de eliminar una tarea.
   - Las tareas se actualizan en el front-end para reflejar la lista actualizada.

4. **Creación de un nuevo usuario:**
   - Cuando la aplicación se carga por primera vez y el usuario no existe, se realiza una solicitud POST para crear un nuevo usuario en la API.
   - La información del nuevo usuario se envía al servidor para su creación.
   - Después de crear el usuario, la aplicación vuelve a obtener las tareas actualizadas.   

## Eliminación de Todas las Tareas

Se ha agregado un botón de limpieza que elimina todas las tareas en el servidor y actualiza la lista vacía en el front-end. Este proceso implica una solicitud DELETE al servidor para eliminar todos los elementos asociados al usuario. En el caso particular de esta API:

- Cuando se utiliza el botón "Limpiar Todas las Tareas", se realiza una solicitud DELETE al endpoint que elimina todas las tareas asociadas al usuario.
- La API, en este caso, elimina el usuario junto con todas sus tareas.
- Después de la eliminación, al volver a cargar la página, se realiza automáticamente una solicitud POST para crear un nuevo usuario en la API, y la aplicación vuelve a obtener las tareas actualizadas.

## Uso de Tecnologías

- React
- Axios
- Otros paquetes y herramientas según sea necesario.

## Instrucciones de Ejecución

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta la aplicación con `npm run dev`.
