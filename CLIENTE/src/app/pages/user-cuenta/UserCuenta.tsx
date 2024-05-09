import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from "react";

interface Usuario {
    nombre: string;
    id_usuario: string;
    correo_electronico: string;
    telefono: string;
}

export const UserCuenta = () => {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const user = useAuth(s => s.user);
    const navigate = useNavigate();

    useEffect(() => {

        
        const obtenerUsuarioPorId = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuario/obtenerPorId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: 123123 })
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

    const Opcion = ({
        nombre,
        className,
        onClick
    }: {
        nombre: string,
        className?: string,
        onClick?: () => void
    }) => {
        return (
            <div
                className={`text-lg hover:text-gray-300 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat ${className}`}
                onClick={onClick}
            >
                <strong>{nombre}</strong>
            </div>
        );
    };




    return (
        <div className="container flex p-4">
            <div className="m-5 bg-marron shadow-xl rounded-large w-60 h-auto">
                <div className="grid-cols-1 m-5 grid gap-y-8 text-white my-10">
                <Opcion nombre="Cuenta" className="bg-userw" onClick={() => navigate('/user-cuenta') }/>
                <Opcion nombre="Pedidos" className="bg-pedidos" onClick={() => navigate('/user-pedidos') }/>
                <Opcion nombre="Favoritos" className="bg-fav" onClick={() => navigate('/user-favoritos') }/>
                <Opcion nombre="Historial" className="bg-historial" onClick={() => navigate('/historialCompra') }/>
                </div>
            </div>
            <div className="bg-white shadow-xl w-full h-auto rounded-xl m-5">
                <div className=" ml-7  mt-10 ">
                    <span className="font-bold text-ardilla text-2xl">Mi cuenta</span>
                </div>
                <div className="ml-7 my-2">
                    <span className="">Administra tu información personal, direcciones y pedidos</span>
                </div>
                <div className=" flex">
                    <div className="">
                        <div className="ml-7 my-10">
                            <span className="text-marron font-bold underline cursor-pointer">Información personal</span>
                        </div>
                        <div className="ml-7">
                            <span className="font-bold text-marron cursor-pointer">Nombre completo</span>
                        </div>
                        <div className="ml-7 my-3">
                            <input type="text" placeholder="Nombre completo" className=" outline-slate-400" />
                        </div>
                        <div className="ml-7">
                            <span className="font-bold text-marron cursor-pointer">Correo</span>
                        </div>
                        <div className="ml-7 my-3">
                            <input type="text" placeholder="maria@example.com" className=" outline-slate-400" />
                        </div>
                        <div className="ml-7">
                            <span className="font-bold text-marron cursor-pointer">Teléfono</span>
                        </div>
                        <div className="ml-7 my-3">
                            <input type="text" placeholder="+57 300 0000000" className=" outline-slate-400" />
                        </div>
                        <div className="m-7">
                            <button className="text-white font-semibold p-2 text-sm bg-marron rounded-full hover:bg-slate-300 hover:text-black">Actualizar</button>
                        </div>

                    </div>
                    <div>
                        <div className=" ml-24 my-10">
                            <span className="text-ardilla font-semibold underline cursor-pointer">Direcciones</span>
                        </div>
                        <div className="flex">
                            <div className="ml-24 bg-marron rounded-lg h-20 w-96 p-4 hover:bg-gray-500 flex flex-col hover:cursor-pointer">
                                <span className="text-white font-semibold">Dir 1</span>
                                <span className="text-white">Cra 25 #125-147</span>
                            </div>
                            <div className=" flex font-semibold hover:cursor-pointer">
                                <div className=" m-5 p-2 bg-gray-300 rounded-lg">Editar</div>
                                <div className="my-5  p-2 bg-red-400 rounded-lg hover:bg-red-700 hover:text-white">Eliminar</div>
                            </div>
                        </div>
                        <br />
                        <div className="flex">
                            <div className="ml-24 bg-marron rounded-lg h-20 w-96 p-4 hover:bg-gray-500 flex flex-col hover:cursor-pointer">
                                <span className="text-white font-semibold">Dir 2</span>
                                <span className="text-white">Cra 16 #25a-147</span>
                            </div>
                            <div className=" flex font-semibold hover:cursor-pointer">
                                <div className=" m-5 p-2 bg-gray-300 rounded-lg">Editar</div>
                                <div className="my-5  p-2 bg-red-400 rounded-lg hover:bg-red-700 hover:text-white">Eliminar</div>
                            </div>
                        </div>
                        <br />
                        <div className="ml-24 bg-slate-300 rounded-lg p-2 text-center font-semibold hover:bg-black hover:text-white cursor-pointer">
                            Agregar dirección
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}