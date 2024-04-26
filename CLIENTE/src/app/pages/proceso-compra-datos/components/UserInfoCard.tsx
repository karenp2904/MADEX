import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserInfoCard = () => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const obtenerUsuarioPorId = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuario/obtenerPorId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: "1097490756" })
                });
        
                if (response.ok) {
                    const usuario = await response.json();
                    console.log('Información del usuario:', usuario);
                    setUsuario(usuario[0]);
                    // Aquí puedes hacer algo con los datos del usuario, como mostrarlos en la interfaz
                } else {
                    console.error('Error al obtener usuario por ID:', response.statusText);
                    // Aquí puedes manejar el caso en que la solicitud no sea exitosa
                }
            } catch (error) {
                console.error('Error al obtener usuario por ID:', error);
                // Aquí puedes manejar errores de red, etc.
            }
        };

        obtenerUsuarioPorId();
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div className="flow-root">
            {usuario && (
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Nombre</dt>
                        <dd className="text-gray-700 sm:col-span-2">{usuario.nombre}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">CC</dt>
                        <dd className="text-gray-700 sm:col-span-2">{usuario.id_usuario}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Correo</dt>
                        <dd className="text-gray-700 sm:col-span-2">{usuario.correo_electronico}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Teléfono</dt>
                        <dd className="text-gray-700 sm:col-span-2">{usuario.telefono}</dd>
                    </div>
                </dl>
            )}
        </div>
    );
};

export default UserInfoCard;

