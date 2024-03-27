class Direccion {
    constructor({ ID_Direccion, ID_Usuario, Calle, Ciudad, Codigo_Postal }) {
        this.ID_Direccion = ID_Direccion;
        this.ID_Usuario = ID_Usuario;
        this.Calle = Calle;
        this.Ciudad = Ciudad;
        this.Codigo_Postal = Codigo_Postal;
    }

    // Métodos para actualizar campos específicos 
    actualizarCalle(Calle) {
        if (Calle) this.Calle = Calle;
    }

    actualizarCiudad(Ciudad) {
        if (Ciudad) this.Ciudad = Ciudad;
    }

    actualizarCodigoPostal(Codigo_Postal) {
        if (Codigo_Postal) this.Codigo_Postal = Codigo_Postal;
    }

    // Método para calcular el costo aproximado de envío
    calcularCostoEnvio() {
        // Obtener la ciudad de destino
        const ciudadDestino = this.Ciudad.toLowerCase();

        // Definir tarifas para diferentes ubicaciones
        let tarifaEnvio;
        switch (ciudadDestino) {
            case 'bucaramanga':
                tarifaEnvio = 5000; // Envíos dentro de Bucaramanga
                break;
            case 'giron':
            case 'piedecuesta':
            case 'provenza':
                tarifaEnvio = 10000; // Envíos a Giron, Piedecuesta y Provenza
                break;
            default:
                tarifaEnvio = 20000; // Envíos a otras ciudades dentro de Colombia
        }

        return tarifaEnvio;
    }
}

