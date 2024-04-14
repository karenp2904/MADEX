import React, { useState } from 'react';
import { Router } from "../../router/Router";
import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";

export const Verificar = () => {
    const [formData, setFormData] = useState({
        correo: '',
        codigo: '' 
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:3000/usuario/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);
                if (data.success) {
                    
                    Router.categorias;
                } else {
                    
                    console.error('Error en la autenticación:', data.message);
                    
                }
            } else {
                console.error('Error en la solicitud de autenticación:', response.statusText);
                // Manejar errores si la respuesta no es exitosa
            }
            
        } catch (error) {
            console.error('Error en la solicitud de autenticación:', error);
            // Manejar errores de red, etc.
        }
    };
    
    return (
        <div className="w-full h-full bg-cover bg-auth flex justify-center items-center">
            <div className="relative flex flex-col w-96 h-[500px] rounded-3xl bg-secondary-color px-10" style={{ boxShadow: "-5px 5px 2.5px gray" }}>
                <div className="absolute left-4 top-4">
                    <img className="w-12" src={Arrow} alt="Arrow" />
                </div>
                <div className="flex justify-center items-center flex-1">
                    <img className="max-h-full" src={Logo} alt="Logo" />
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-12"> {/* Añadido mt-8 para mover el formulario hacia arriba */}
                <div className="w-full h-20">
                        <div className="w-full flex flex-col">
                            <label htmlFor="code" className="text-primary-color">
                                <strong className="mb-2">Código de autenticación</strong>
                            </label>
                            <input
                                name="codigo"
                                className="indent-12 bg-[length:1.5rem] bg-[10px] bg-lock bg-no-repeat h-12 rounded-xl placeholder:text-primary-color"
                                placeholder="Código de autenticación"
                                style={{ boxShadow: "-2px 2px 2px gray" }}
                                type="text"
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    <div className="w-full h-28 mt-10"> 
                        <strong>
                        <div className="flex justify-center items-center">
                            <a className="underline text-[12px] text-primary-color" href="">
                                ¿Necesitas ayuda con el código?
                            </a>
                        </div>

                        </strong>
                        <div className="flex justify-center items-center mt-2"> {/* Añadido mt-2 para ajustar el espacio entre los enlaces y el botón */}
                            <button className="w-28 h-8 text-[14px] rounded-3xl bg-primary-color text-white" style={{ boxShadow: "-2px 2px 2px gray" }} onClick={handleAuthentication}>
                                Verificar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
};
