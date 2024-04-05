class Direccion {
    constructor({ ID_Direccion, ID_Usuario, calle, ciudad, codigoPostal, departamento, barrio, descripcion }) {
        this.ID_Direccion = ID_Direccion;
        this.ID_Usuario = ID_Usuario;
        this.calle = calle;
        this.ciudad = ciudad;
        this.codigoPostal = codigoPostal;
        this.departamento = departamento;
        this.barrio = barrio;
        this.descripcion = descripcion;
    }

    // Métodos para actualizar 
    actualizarCalle(Calle) {
        if (Calle) this.Calle = Calle;
    }

    actualizarCiudad(Ciudad) {
        if (Ciudad) this.Ciudad = Ciudad;
    }

    actualizarCodigoPostal(Codigo_Postal) {
        if (Codigo_Postal) this.Codigo_Postal = Codigo_Postal;
    }


    calcularCostoEnvio() {
        const departamentoDestino = this.departamento.toLowerCase();
        const ciudadDestino = this.Ciudad.toLowerCase();
    
        
        let tarifaEnvio;
    
        if (departamentoDestino === 'santander') {
            switch (ciudadDestino) {
                case 'bucaramanga':
                    tarifaEnvio = 5000; // Envíos Bucaramanga
                    break;
                case 'giron':
                case 'piedecuesta':
                case 'provenza':
                    tarifaEnvio = 1000; // Envíos a Giron, Piedecuesta y Provenza
                    break;
                default:
                    tarifaEnvio = 20000; // Envíos dentro del departamento de Santander
            }
        } else {
            // Si es otro departamento
            tarifaEnvio = 30000; 
        }
    
        return tarifaEnvio;
    }

    calcularFechaEstimadaEntrega() {
        const diasHabiles = 10; // Número de días hábiles para la entrega
        const fechaActual = new Date();
        let contadorDias = 0;
    
        while (contadorDias < diasHabiles) {
            // Incrementar la fecha actual por un día
            fechaActual.setDate(fechaActual.getDate() + 1);
    
            // Verificar si el día actual no es sábado ni domingo (día no hábil)
            if (fechaActual.getDay() !== 0 && fechaActual.getDay() !== 6) {
                contadorDias++;
            }
        }
        return fechaActual;
    } 
}

module.exports = Direccion;
