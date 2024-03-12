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
}

// Ejemplo 
const usuario = new Usuario(1, 'Juan', 'Perez', 'juan@example.com', 'DNI', 'contraseña123', '123456789');
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


  // Ejemplo 
const rol = new Rol(1, 'Descripción del rol');
console.log(rol);