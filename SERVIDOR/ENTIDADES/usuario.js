const readline = require('readline');
class Usuario {
    constructor(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono,idRol) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.apellido_usuario = apellido_usuario;
        this.correo = correo;
        this.tipo_documento = tipo_documento;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.idRol=idRol;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
            });

        }

    actualizarUsuarioConId(id_usuario){
        this.id_usuario = id_usuario;
    }
    // Método para actualizar la información del usuario
    actualizarUsuario(nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono) {
        // Verificar si los nuevos valores no son nulos o indefinidos antes de actualizar
        if (nombre_usuario) this.nombre_usuario = nombre_usuario;
        if (apellido_usuario) this.apellido_usuario = apellido_usuario;
        if (correo) this.correo = correo;
        if (tipo_documento) this.tipo_documento = tipo_documento;
        if (contraseña) this.contraseña = contraseña;
        if (telefono) this.telefono = telefono;
    }

    eliminarUsuario(id_usuario){
        this.id_usuario = id_usuario;
    }

    iniciarSesion() {
    this.rl.question('Ingrese su correo electrónico: ', (correo) => {
        this.rl.question('Ingrese su contraseña: ', (contrasena) => {
        const usuarioAutenticado = autenticarUsuario(correo, contrasena);

        if (usuarioAutenticado) {
            console.log(`¡Inicio de sesión exitoso para ${correo}!`);
        } else {
            console.log('Correo electrónico o contraseña incorrectos. Inicio de sesión fallido.');
        }

        this.rl.close();
            });
        });
    }

    asignarRol(idRol){
        this.idRol=idRol;
    }
}

class Rol_has_Usuario {
    constructor(idRol, Usuario_id_usuario,descripcion) {
    his.idRol = idRol;
    this.Usuario_id_usuario = Usuario_id_usuario;
    this.descripcion = descripcion;
    }
}


module.exports = Usuario,Rol_has_Usuario;