const readline = require('readline');

// Simulación de base de datos de usuarios
const usuarios = [
  { id: 1, correo: 'miguel.luna@gmail.com', contrasena: 'contrasena1234' },
  { id: 2, correo: 'carlos777@gmail.com', contrasena: 'contrasena2' },
  { id: 3, correo: 'maria@gmail.com', contrasena: 'contrasena3' },
  { id: 4, correo: 'daniel@gmail.com', contrasena: 'contrasena4' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function autenticarUsuario(correo, contrasena) {
  return usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
}

function iniciarSesion() {
  rl.question('Ingrese su correo electrónico: ', (correo) => {
    rl.question('Ingrese su contraseña: ', (contrasena) => {
      const usuarioAutenticado = autenticarUsuario(correo, contrasena);

      if (usuarioAutenticado) {
        console.log(`¡Inicio de sesión exitoso para ${correo}!`);
      } else {
        console.log('Correo electrónico o contraseña incorrectos. Inicio de sesión fallido.');
      }

      rl.close();
    });
  });
}

iniciarSesion();

  