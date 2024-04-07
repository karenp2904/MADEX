import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";
import { Router } from "../../router/Router";

import { useState } from 'react';


export const Register = () => {
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        apellido_usuario: '',
        tipo_documento: '',
        idUsuario: '',
        telefono: '',
        correo: '',
        idRol: '1',
        contraseña: '',
    });


    const handleSubmit = async () => {

        try {
            const response = await fetch('http://localhost:3000/usuario/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Manejar la respuesta exitosa
                console.log(response);
                console.log('Registro exitoso');
                Router.login
            } else {
                // Manejar la respuesta de error
                console.error('Error en el registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
        }
    };



    const Input = ({
        name, label
    }: { name?: string, label?: string }) => {
        return (
            <div className="w-full h-22 mb-2">
                <div className="w-full flex flex-col">
                    <label
                        htmlFor={name}
                        className="text-primary-color text-sm font-semibold"
                    >{label}</label>
                    <input
                        name={name}
                        className="indent-2 h-8 rounded-xl placeholder:text-primary-color"
                        style={{
                            boxShadow: "-2px 2px 2px gray"
                        }}
                        type=""
                    />
                </div>
            </div>
        )
    }

    return (
        <div
            className="w-full h-[900px] mb-10 flex justify-center items-center"
        >
            <div
                className="relative flex flex-col w-96 h-[800px] rounded-3xl bg-secondary-color px-10"
                style={{
                    boxShadow: "-5px 5px 2.5px gray"
                }}
            >
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
                    <Input name="contraseña" label="Contraseña" />
                    <Input name="confirm_password" label="Confirmar contraseña" />
                    <div className="w-full h-32">
                        {/* Contenido adicional */}
                        <div className="text-[8px] flex">
                            <div className="w-6 flex justify-center items-center">
                                <input className="scale-110" type="checkbox" />
                            </div>
                            <span className="text-primary-color">
                                Acepto los <span className="text-black font-bold">Términos y Condiciones</span> y Autorizo el <span className="text-black font-bold">Tratamiento de mis Datos Personales</span> de MADEX S.A
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
    )
}

