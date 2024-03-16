const readline = require('readline');

// Simulación de base de datos de usuarios
const usuarios = [
    { id: 1, correo: 'miguel.luna@gmail.com', contrasena: 'contrasena1234' },
    { id: 2, correo: 'carlos777@gmail.com', contrasena: 'contrasena2' },
    { id: 3, correo: 'maria@gmail.com', contrasena: 'contrasena3' },
    { id: 4, correo: 'daniel12@gmail.com', contrasena: 'contrasena4' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para buscar un usuario por su identificador
function buscarUsuarioPorId(id) {
  const usuarioEncontrado = usuarios.find(u => u.id === id);
  if (usuarioEncontrado) {
    return {
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      correo: usuarioEncontrado.correo
    };
  }
  return null;
}

// Función para iniciar la búsqueda del usuario
function iniciarBusquedaUsuario() {
  rl.question('Ingrese el ID del usuario que desea buscar: ', (id) => {
    const usuarioEncontrado = buscarUsuarioPorId(parseInt(id));

    if (usuarioEncontrado) {
      console.log('Usuario encontrado:');
      console.log(usuarioEncontrado);
    } else {
      console.log(`No se encontró ningún usuario con el ID ${id}.`);
    }

    rl.close();
  });
}

// Ejecutar la búsqueda del usuario
iniciarBusquedaUsuario();
