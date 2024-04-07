
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

    asignarRol(idRol){
        this.idRol=idRol;
    }
}


module.exports = Usuario;