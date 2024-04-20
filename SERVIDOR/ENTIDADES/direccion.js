class Direccion {
    constructor({ id_direccion, id_usuario, calle, ciudad, codigoPostal, departamento, barrio, descripcion }) {
        this.id_direccion = id_direccion;
        this.id_usuario = id_usuario;
        this.calle = calle;
        this.ciudad = ciudad;
        this.codigoPostal = codigoPostal;
        this.departamento = departamento;
        this.barrio = barrio;
        this.descripcion = descripcion;
    }

    // Métodos para actualizar 
    actualizarCalle(calle) {
        if (calle) this.calle = calle;
    }

    actualizarCiudad(Ciudad) {
        if (Ciudad) this.Ciudad = Ciudad;
    }

    actualizarCodigoPostal(codigoPostal) {
        if (codigoPostal) this.codigoPostal = codigoPostal;
    }


    calcularCostoEnvio() {
        const departamentoDestino = this.departamento;
        const ciudadDestino = this.ciudad;
    
        
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

        const totalFormateado = tarifaEnvio.toLocaleString('es-CO', {
            style: 'decimal',
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
        
        // Devuelve el total formateado
    
        return this.formatearCostoEnvio(totalFormateado);
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

    formatearCostoEnvio(costoEnvio) {
        // Primero, eliminamos los puntos (.) como separadores de miles
        let costoLimpio = costoEnvio.replace(/\./g, '');
    
        // Luego, reemplazamos la coma (,) por un punto (.) para manejarlo como número
        costoLimpio = costoLimpio.replace(',', '.');
    
        // Convertimos la cadena limpia a un número de punto flotante
        const costoNumerico = parseFloat(costoLimpio);
    
        // Ahora formateamos el número de acuerdo con la convención que quieres
        // Usamos toLocaleString con 'es-CO' para usar puntos como separadores de miles
        const costoFormateado = costoNumerico.toLocaleString('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    
        return costoFormateado;
    }
    
}

module.exports = Direccion;
