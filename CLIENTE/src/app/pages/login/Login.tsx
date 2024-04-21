import Logo from "/icon/icon-primary.svg";
import { Router } from "../../router/Router";
import React, { useState } from 'react';

export const Login = () => {
    const [formData, setFormData] = useState({
        correo: '',
        contraseña: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/usuario/login', {
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
                    // Si el inicio de sesión fue exitoso, redirige a la página de categorías
                    Router.verificar;
                } else {
                    // Si hubo un error en el inicio de sesión, muestra el mensaje de error
                    console.error('Error en el inicio de sesión:', data.message);
                    // Aquí puedes mostrar el mensaje de error al usuario si lo deseas
                }
            } else {
                console.error('Error en la solicitud de inicio de sesión:', response.statusText);
                // Manejar errores si la respuesta no es exitosa
            }
            
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            // Manejar errores de red, etc.
        }
    };
    

    return (
        <div className="w-full h-full bg-cover bg-auth flex justify-center items-center">
            <div className="relative flex flex-col w-96 h-[500px] rounded-3xl bg-secondary-color px-10" style={{ boxShadow: "-5px 5px 2.5px gray" }}>
                <div className="flex-1 ">
                    <img className="max-h-full" src={Logo} alt="Logo" />
                </div>
                <div className="w-full h-24 flex justify-center items-center">
                    <div className="w-full flex flex-col">
                        <label htmlFor="email" className="text-primary-color"><strong>Usuario</strong></label>
                        <input name="correo" className="indent-10 bg-[length:1.5rem] bg-[10px] bg-user bg-no-repeat h-12 rounded-xl placeholder:text-primary-color" placeholder="Correo electrónico" style={{ boxShadow: "-2px 2px 2px gray" }} type="email" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="w-full h-24">
                    <div className="w-full flex flex-col">
                        <label htmlFor="password" className="text-primary-color"><strong>Contraseña</strong></label>
                        <input name="contraseña" className="indent-10 bg-[length:1.5rem] bg-[10px] bg-lock bg-no-repeat h-12 rounded-xl placeholder:text-primary-color" placeholder="Contraseña" style={{ boxShadow: "-2px 2px 2px gray" }} type="password" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="w-full h-28">
                    <strong>
                        <a className="underline text-[12px] text-primary-color" href="">Olvidé mi contraseña</a>
                    </strong>
                    <div className="flex justify-center items-center">
                        <button className="w-28 h-8 text-[14px] rounded-3xl bg-primary-color text-white" style={{ boxShadow: "-2px 2px 2px gray" }} onClick={handleLogin}>
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <strong>
                            <a className="underline text-[12px] text-primary-color" href={Router.register}>¿No tienes cuenta? Regístrate aquí</a>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};
