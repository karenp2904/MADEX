class Direccion {
    constructor({ ID_Direccion, ID_Usuario, Calle, Ciudad, Codigo_Postal }) {
        this.ID_Direccion = ID_Direccion;
        this.ID_Usuario = ID_Usuario;
        this.Calle = Calle;
        this.Ciudad = Ciudad;
        this.Codigo_Postal = Codigo_Postal;
    }

    // Métodos para actualizar campos específicos si es necesario
    actualizarCalle(Calle) {
        if (Calle) this.Calle = Calle;
    }

    actualizarCiudad(Ciudad) {
        if (Ciudad) this.Ciudad = Ciudad;
    }

    actualizarCodigoPostal(Codigo_Postal) {
        if (Codigo_Postal) this.Codigo_Postal = Codigo_Postal;
    }
}