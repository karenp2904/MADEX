import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";
import { Router } from "../../router/Router";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Input } from "../../../components/form/Input";


export const RegisterEmpresa = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<{[key: string]: string}>({

        idUsuario: '',
        nombre: '',
        apellido: '',
        correo: '', 
        tipo_documento: '', 
        password: '' ,
        telefono: '',
        idRol: '2',
        nitEmpresa: '',
        nombreEmpresa: '',
        razonSocial: '',
        cargo: '',
        rubro: '',
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
        if (!formData.nombre_usuario || !formData.apellido || !formData.telefono || !formData.correo || !formData.password || !formData.confirmar_contraseña) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        // Verificar si las contraseñas coinciden
        if (!passwordsMatch) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/empresa/registro', {
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
        <div className="w-full h-[1100px] mb-10 flex justify-center items-center">
            <div className="relative flex flex-col w-[700px] h-[800px] rounded-3xl bg-secondary-color px-10"
                style={{
                    boxShadow: "-5px 5px 2.5px gray"
                }}
            >
                <div className="absolute left-4 top-4">
                    <button onClick={() => navigate(Router.register)}>
                        <img className="w-12" src={Arrow} alt="Back to register" />
                    </button>
                </div>
                <div className="h-48 flex justify-center items-center">
                    <img className="max-h-full" src={Logo} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="flex flex-col">
                        <Input
                                name="nombre"
                                label="Nombres"
                                formData={formData}
                                setFormData={setFormData}
                            />
                            <Input
                                name="apellido"
                                label="Apellidos"
                                formData={formData}
                                setFormData={setFormData}
                            />
                            <Input
                                name="tipo_documento"
                                label="Tipo de Documento"
                                formData={formData}
                                setFormData={setFormData}
                            />
                            <Input
                                name="document"
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
                                formData={formData}
                                setFormData={setFormData}
                            />
                            <Input
                                name="confirmar_contraseña"
                                label="Confirmar contraseña"
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>
                            <div className="flex flex-col">
                                <Input
                                    name="nit_empresa"
                                    label="NIT Empresa"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="razonSocial"
                                    label="Razón social"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="cargo"
                                    label="Cargo"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="rubro"
                                    label="Rubro"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="departamento"
                                    label="Departamento"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="ciudad"
                                    label="Ciudad"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="direccion"
                                    label="Dirección"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="empresa"
                                    label="Empresa"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </div>
                    </div>
                    <div className="w-full h-32">
                        <div className="text-[8px] flex">
                            <div className="w-6 flex justify-center items-center">
                                <input className="scale-110" type="checkbox" />
                            </div>
                            <span className="text-primary-color">
                                Acepto los <span className="text-black font-bold">Términos y Condiciones</span> y Autorizo el <span className="text-black font-bold">Tratemiento de mis Datos Personales</span> de MADEX S.A
                            </span>
                        </div>
                        <div className="w-full h-14 flex justify-center items-center">
                            <button
                                type="submit" 
                                className="w-28 h-8 text-[14px] rounded-3xl bg-primary-color text-white"
                                style={{
                                    boxShadow: "-2px 2px 2px gray"
                                }}
                            >
                                Enviar
                            </button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}