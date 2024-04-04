const express = require('express')
const router = express.Router()

const {manejarInicioSesion, s_añadirUsuario} = require('../CONTROLADOR/controllerServer.js')

router.post('/login', manejarInicioSesion)
router.post('/register', s_añadirUsuario)



fetch('http://localhost:3000/añadir/usuario', {
  method: 'POST', // Método HTTP que quieres utilizar
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido que estás enviando
    // Otros headers que necesites agregar, como tokens de autorización, etc.
  },
  body: JSON.stringify({ // Datos que quieres enviar al servidor (si es necesario)
        "id_usuario": "100000",
        "nombre_usuario": "Stefanny",
        "apellido_usuario": "Molina",
        "correo": "stefanny@gmail.com",
        "tipo_documento": "cosa",
        "contraseña": "lunalunera",
        "telefono": "5416584",
        "idRol": 1
  }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Error al realizar la petición');
  }
  // Si la petición es exitosa, puedes manejar la respuesta aquí
  return response.json(); // Esto convierte la respuesta a JSON si es necesario
})
.then(data => {
  // Aquí puedes manejar los datos que recibiste del servidor
  console.log(data);
})
.catch(error => {
  // Aquí manejas los errores que puedan ocurrir durante la petición
  console.error('Error:', error);
});

module.exports = router
