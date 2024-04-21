import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";
import { Router } from "../../router/Router";
import React, { useState, useEffect } from 'react';
import { Input } from "../../../components/form/Input";
import { Select } from "../../../components/form/Select";
import { useNavigate } from "react-router-dom";


export const Register = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<{[key: string]: string}>({
        nombre_usuario: '',
        apellido_usuario: '',
        tipo_documento: '',
        idUsuario: '',
        telefono: '',
        correo: '',
        idRol: '1',
        password: '',
        confirmar_contraseña: ''
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    
    useEffect(() => {
        // Verificar si las contraseñas coinciden
        setPasswordsMatch(formData.password === formData.confirmar_contraseña);
    }, [formData.password, formData.confirmar_contraseña]);
    
    // Función para manejar el cambio en la aceptación de términos
    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(e.target.checked);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos obligatorios estén completos
        if (!formData.nombre_usuario || !formData.apellido_usuario || !formData.telefono || !formData.correo || !formData.password || !formData.confirmar_contraseña) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        // Verificar si las contraseñas coinciden
        if (!passwordsMatch) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/usuario/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        
            if (response.ok) {
                const data = await response.json();
                console.log('Registro exitoso:', data.message); // Muestra el mensaje del servidor
                navigate(Router.login); // Redirige al usuario a la página de inicio de sesión
            } else {
                // Si la respuesta no es exitosa, muestra el mensaje de error del servidor
                const errorMessage = await response.text();
                console.error('Error en el registro:', errorMessage);
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
        }
    };

    return (
        <div className="w-full h-[1000px] mb-10 flex justify-center items-center">
            <div className="relative flex flex-col w-96 h-[1000px] rounded-3xl bg-secondary-color px-10"
                style={{
                    boxShadow: "-5px 5px 2.5px gray"
                }}>
                <div className="absolute left-4 top-4">
                    <img className="w-12" src={Arrow} />
                   
                </div>
                <div className="h-48 flex justify-center items-center">
                    <img className="max-h-full" src={Logo} />
                </div>
                {/* Contenido del formulario */}
                <form onSubmit={handleSubmit}>
                    <Input
                        name="nombre_usuario"
                        label="Nombres"
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Input
                        name="apellido_usuario"
                        label="Apellidos"
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Select
                        name="tipo_documento"
                        label="Tipo de Documento"
                        formData={formData}
                        setFormData={setFormData}
                        opciones={[
                            {text: "Cedula", valor: "CC"},
                            {text: "Cedula Extranjeria (CE)", valor: "CE"},
                            {text: "Pasaporte", valor: "Pasaporte"}
                        ]}
                    />
                    <Input
                        name="idUsuario"
                        label="Número de Documento" 
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Input
                        name="telefono"
                        label="Teléfono"
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Input
                        name="correo"
                        label="Correo electrónico"
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Input
                        name="password"
                        label="Contraseña"
                        isPasswordInput={true}
                        hasError={!passwordsMatch}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <Input
                        name="confirmar_contraseña"
                        label="Confirmar contraseña"
                        isPasswordInput={true}
                        hasError={!passwordsMatch}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    
                    {!passwordsMatch && (
                        <div className="text-red-600 text-xs mt-1 mb-4">Las contraseñas no coinciden</div>
                    )}

                    <div className="w-full h-32">
                        {/* Contenido adicional */}
                        <div className="text-[8px] flex mb-4">
                            <div className="w-6 flex justify-center items-center">
                                <input
                                    className="scale-110"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={handleTermsChange}
                                />
                            </div>
                            <span className="text-primary-color">
                                Acepto los <span className="text-black font-bold">Términos y Condiciones</span> y Autorizo el <span className="text-black font-bold">Tratamiento de mis Datos Personales</span> de MADEX S.A
                            </span>
                        </div>
                        <div className="w-full h-14 flex justify-center items-center">
                            <button
                                type="submit"
                                className={`w-28 h-8 text-[14px] rounded-3xl bg-primary-color text-white ${!termsAccepted && 'opacity-50 cursor-not-allowed'}`}
                                style={{
                                    boxShadow: "-2px 2px 2px gray"
                                }}
                                disabled={!termsAccepted || !passwordsMatch}
                            >
                                Enviar
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <strong>
                                <a
                                    className="underline text-[12px] text-primary-color"
                                    href={Router.registeEmpresa}
                                >Crear cuenta de empresa</a>
                            </strong>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
