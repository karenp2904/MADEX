# MADEX
MADEX  "Maderas, Diseños y Estructuras” - Proyecto Integrado 1_ 2024-01


DEVELOP- En esta rama, los integrantes podrá subir los cambios y funciones realizadas una vez ya esten funcionando correctamente, cada integrante con rol de desarrollo tiene su propia rama.
FRONTEND - En esta rama, los encargados subirán el desarrollo de la pagina web y sus vistas funcionales


INFRAESTRUCTURA
El módulo de red puede utilizar DHCP para obtener una dirección IP.
Para acceder a un servidor remoto por su nombre de dominio, se podría usar DNS.
Si el programa necesita obtener o enviar contenido web, utilizaría HTTP.
Si el programa necesita enviar correos electrónicos, utilizaría SMTP.
Si el programa necesita transferir archivos, utilizaría FTP.


Imports y configuración inicial: Se importan los módulos necesarios, como Express, cors, y el pool de conexión a la base de datos. Luego se inicializa una instancia de Express llamada app y se especifica el puerto en el que el servidor escuchará las solicitudes.

Middleware: Se configuran middleware con app.use(). En este caso, cors() se utiliza para permitir solicitudes desde otros dominios y express.json() para analizar el cuerpo de las solicitudes entrantes como JSON.

Rutas: Se definen las rutas de la aplicación para manejar las solicitudes HTTP. Aquí tienes tres rutas:

/todos: Una ruta POST para crear una nueva tarea (todo) en la base de datos.

/todos/obtener: Una ruta POST para obtener todos los datos de una tabla específica en la base de datos. Utiliza un procedimiento almacenado llamado obtenerTodosLosDatos.

/todos/obtener/facil: Una ruta GET para obtener todas las tareas (todos) de la tabla todo en la base de datos.

/todos/:id: Dos rutas, una GET y una PUT, para obtener y actualizar respectivamente una tarea específica por su ID.

Funciones de controlador de ruta: Cada ruta tiene una función de controlador de ruta asincrónica que maneja la lógica de la solicitud. Por ejemplo, para la ruta POST /todos, la función de controlador de ruta toma la descripción de la tarea del cuerpo de la solicitud, la inserta en la base de datos y luego responde con la tarea recién creada en formato JSON.

Conexión al servidor: Finalmente, el servidor se inicia con app.listen(), que especifica el puerto en el que el servidor escuchará las solicitudes. Al iniciar el servidor, también se imprime un mensaje en la consola indicando en qué puerto está escuchando.