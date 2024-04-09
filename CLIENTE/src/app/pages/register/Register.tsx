import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";
import { Router } from "../../router/Router";
import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export const Register = () => {
    interface FormData {
        nombre_usuario: string;
        apellido_usuario: string;
        tipo_documento: string;
        idUsuario: string;
        telefono: string;
        correo: string;
        idRol: string;
        contraseña: string;
        confirmar_contraseña: string;
        [key: string]: string; // Firma de índice para permitir cualquier cadena como índice
    }
    
    const [formData, setFormData] = useState<FormData>({
        nombre_usuario: '',
        apellido_usuario: '',
        tipo_documento: '',
        idUsuario: '',
        telefono: '',
        correo: '',
        idRol: '2',
        contraseña: '',
        confirmar_contraseña: ''
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    
    useEffect(() => {
        // Verificar si las contraseñas coinciden
        setPasswordsMatch(formData.contraseña === formData.confirmar_contraseña);
    }, [formData.contraseña, formData.confirmar_contraseña]);
    
    // Función para manejar el cambio en la aceptación de términos
    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(e.target.checked);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    
    
    const handleSubmit = async () => {
        // Validar que todos los campos obligatorios estén completos
        if (!formData.nombre_usuario || !formData.apellido_usuario || !formData.telefono || !formData.correo || !formData.contraseña || !formData.confirmar_contraseña) {
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
                Router.login; // Redirige al usuario a la página de inicio de sesión
            } else {
                // Si la respuesta no es exitosa, muestra el mensaje de error del servidor
                const errorMessage = await response.text();
                console.error('Error en el registro:', errorMessage);
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
        }
    };

    const Input = ({ name, label, isPasswordInput = false, hasError = false }: { name?: string, label?: string, isPasswordInput?: boolean, hasError?: boolean }) => {        
        const [inputType, setInputType] = useState(isPasswordInput ? 'password' : 'text');
    
        const togglePasswordVisibility = () => {
            setInputType((prevInputType) => (prevInputType === 'password' ? 'text' : 'password'));
        };
    
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };
    
        return (
            <div className="mb-4">
                <label htmlFor={name} className="block text-sm font-semibold text-primary-color">
                    {label}
                </label>
                <div className="relative">
                    <input
                        name={name}
                        type={isPasswordInput ? inputType : 'text'}
                        value={name && formData[name]} // Verificar si name está definido antes de acceder a formData[name]
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mt-1 rounded-xl placeholder-text-primary-color border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    {isPasswordInput && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                            onClick={togglePasswordVisibility}
                        >
                            {inputType === 'password' ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                        </button>
                    )}
                </div>
            </div>
        );
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
                    <Input name="nombre_usuario" label="Nombres" />
                    <Input name="apellido_usuario" label="Apellidos" />
                    <Input name="tipo_documento" label="Tipo de Documento" />
                    <Input name="idUsuario" label="Número de Documento" />
                    <Input name="telefono" label="Teléfono" />
                    <Input name="correo" label="Correo electrónico" />
                    <Input name="contraseña" label="Contraseña" isPasswordInput={true} hasError={!passwordsMatch}/>
                    <Input name="confirmar_contraseña" label="Confirmar contraseña" isPasswordInput={true} hasError={!passwordsMatch}/>
                    
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
