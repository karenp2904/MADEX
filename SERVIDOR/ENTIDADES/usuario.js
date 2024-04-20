
class Usuario {
    constructor(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.apellido_usuario = apellido_usuario;
        this.correo = correo;
        this.tipo_documento = tipo_documento;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.idRol = idRol;
        this.nitEmpresa = nitEmpresa;
        this.nombreEmpresa = nombreEmpresa;
        this.razonSocial = razonSocial;
        this.cargo = cargo;
        this.rubro = rubro;
    }
    

    actualizarUsuarioConId(id_usuario){
        this.id_usuario = id_usuario;
    }
    // Método para actualizar la información del usuario
    actualizarUsuario(id_usuario, nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol, nitEmpresa, nombreEmpresa, razonSocial, cargo, rubro) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.apellido_usuario = apellido_usuario;
        this.correo = correo;
        this.tipo_documento = tipo_documento;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.idRol = idRol;
        this.nitEmpresa = nitEmpresa;
        this.nombreEmpresa = nombreEmpresa;
        this.razonSocial = razonSocial;
        this.cargo = cargo;
        this.rubro = rubro;
    }

    asignarRol(idRol){
        this.idRol=idRol;
    }
}


module.exports = Usuario;