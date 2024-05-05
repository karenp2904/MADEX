import { Button } from "@material-tailwind/react"
import { Input } from "../../../components/form/Input"
import UserInfoCard from "./components/UserInfoCard"
import { useNavigate } from "react-router-dom"
import { Router } from "../../router/Router"
import { useState } from "react";
import axios from 'axios'; 

export const ProcesoCompraDatos = () => {

    const navigate = useNavigate();

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState<{[key: string]: string}>({
        ID_Usuario: "1097490756", 
        Calle: "",
        Ciudad: "",
        Codigo_Postal: "",
        departamento: "",
        barrio: "",
        descripcion: ""
    });

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realizar la solicitud POST al endpoint /direccion/agregar utilizando Axios
            const response = await axios.post("http://localhost:3000/direccion/agregar", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201|| response.status === 200) {
                const direccionGuardada = response.data;
                console.log("Dirección guardada:", direccionGuardada);

                // Redirigir a la siguiente página
                navigate(Router.procesoCompraPago);
            } else {
                console.error("Error al guardar la dirección:", response.statusText);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error("Error al procesar la solicitud:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    /*
    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    */

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-evenly text-center mt-6">
                <div className="items-center font-bold text-xl">
                    Confirmar
                    <div className="flex justify-center items-center bg-gray-300 rounded-full size-20">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="40" height="40"><path d="M23.94,6.59l-.88,4.39c-.47,2.33-2.53,4.02-4.9,4.02H6.73c.42,1.18,1.53,2,2.83,2h9.44c.55,0,1,.45,1,1s-.45,1-1,1H9.56c-2.53,0-4.67-1.9-4.97-4.42L3.21,2.88c-.06-.5-.49-.88-.99-.88H1c-.55,0-1-.45-1-1S.45,0,1,0h1.22c1.52,0,2.8,1.14,2.98,2.65l.04,.35h3.76c.55,0,1,.45,1,1s-.45,1-1,1h-3.52l.94,8h11.74c1.42,0,2.66-1.01,2.94-2.41l.88-4.39c.06-.29-.02-.6-.21-.83-.19-.23-.47-.37-.77-.37h-4c-.55,0-1-.45-1-1s.45-1,1-1h4c.9,0,1.75,.4,2.32,1.1s.8,1.61,.62,2.49ZM7,20c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm10,0c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2ZM9.27,7.25c-.38,.4-.35,1.04,.05,1.41l1.56,1.46c.59,.59,1.36,.88,2.13,.88s1.52-.29,2.09-.86l1.59-1.48c.4-.38,.42-1.01,.05-1.41-.38-.4-1.01-.43-1.41-.05l-1.32,1.23V1c0-.55-.45-1-1-1s-1,.45-1,1v7.43l-1.32-1.23c-.4-.38-1.04-.35-1.41,.05Z" /></svg>
                    </div>
                </div>
                <div className="font-bold text-xl text-center">
                    Datos de envío
                    <div className="flex justify-center items-center bg-gray-300 rounded-full size-20">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="40" height="40"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" /><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" /></svg>
                    </div>
                </div>
                <div className="font-bold text-xl text-center">
                    Pago
                    <div className="flex justify-center items-center bg-gray-300 rounded-full size-20">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="40" height="40"><path d="M19,3H5A5.006,5.006,0,0,0,0,8H24A5.006,5.006,0,0,0,19,3Z" /><path d="M0,16a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm7-.5A1.5,1.5,0,1,1,5.5,14,1.5,1.5,0,0,1,7,15.5" /></svg>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center px-20 py-6">
                <div className=" bg-white h-[540px] w-[990px] rounded-xl p-7 drop-shadow-md">
                    <div className="flex gap-6">
                        <div className="my-20">
                            <h1 className="font-bold pb-4">Identificación</h1>
                            <div className="py-4">
                                <UserInfoCard />
                            </div>
                            <button className="bg-ardilla text-white w-auto h-7 rounded-lg px-3">
                                Editar
                            </button>
                        </div>
                        <div>
                            <h1>Datos de envío</h1>
                            <div className="grid grid-cols-2">
                                <Input
                                    name="departamento"
                                    label="Departamento*"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="apellido_usuario"
                                    label="Nombre del destinatario*"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="Ciudad"
                                    label="Ciudad*"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="Codigo_Postal"
                                    label="Código postal*"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="barrio"
                                    label="Barrio"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="Calle"
                                    label="Dirección"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <Input
                                    name="descripcion"
                                    label="Información adicional"
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-evenly items-center">
                        <span onClick={() => navigate(Router.procesoCompraConfirmar)} className="hover:cursor-pointer hover:underline" >Volver al carrito</span>
                        <Button type="submit" onClick={handleSubmit}>Continuar al Pago</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}