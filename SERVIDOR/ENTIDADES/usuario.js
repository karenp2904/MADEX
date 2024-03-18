class Usuario {
    constructor(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.apellido_usuario = apellido_usuario;
        this.correo = correo;
        this.tipo_documento = tipo_documento;
        this.contraseña = contraseña;
        this.telefono = telefono;
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


    
    readline = require('readline');

    // Simulación de base de datos de usuarios
    usuarios = [
        { id: 1, correo: 'miguel.luna@gmail.com', contrasena: 'contrasena1234' },
        { id: 2, correo: 'carlos777@gmail.com', contrasena: 'contrasena2' },
        { id: 3, correo: 'maria@gmail.com', contrasena: 'contrasena3' },
        { id: 4, correo: 'daniel12@gmail.com', contrasena: 'contrasena4' },
    ];

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

        autenticarUsuario(correo, contrasena) {
    return usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    }

    iniciarSesion() {
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

}

// Ejemplo 
const usuario = new Usuario(1, 'Juan', 'Manzana', 'juan@example.com', 'DNI', 'contraseña123', '123456789');
console.log(usuario);


class Rol {
    constructor(idRol, descripcion) {
    this.idRol = idRol;
    this.descripcion = descripcion;
    }
}

class Rol_has_Usuario {
    constructor(Rol_idRol, Usuario_id_usuario) {
    this.Rol_idRol = Rol_idRol;
    this.Usuario_id_usuario = Usuario_id_usuario;
    }
}


   