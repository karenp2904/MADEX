import { useNavigate } from "react-router-dom";

export const UserPedidos = () => {
    const navigate = useNavigate();

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
        )
    }

    return (
        <div className=" container flex p-4">
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
                    <span className="font-bold text-ardilla text-2xl">Detalles de la orden</span>
                </div>
                <div className="flex">
                    <div>
                        <div className=" ml-7 mt-10">
                            <span className="text-black text-base font-bold pr-2"># de Orden:</span>
                            <span className=" text-gray-500 font-medium text-sm">N°1234567</span>
                        </div>
                        <div className=" ml-7 mt-5">
                            <span className="text-black text-base font-bold pr-2">Enviando a:</span>
                            <span className="text-gray-500 font-base">Carrera 27 #34-45 - Bucaramanga, Santander, 681003</span>
                        </div>
                        <div className=" ml-7 mt-5">
                            <span className="text-black text-base font-bold pr-2">Estado:</span>
                            <span className="text-gray-500 font-base">En ruta</span>
                        </div>
                        <div className=" ml-7 mt-5">
                            <span className="text-black text-base font-bold pr-2">Artículos:</span>
                            <div className="py-4 ">
                                <div className="bg-gray-300 h-24 w-[380px] rounded-lg flex">
                                    <div className="bg-black h-full w-1/3 rounded-l-lg object-cover">
                                        <img src="descuento.jpg" alt="" className="h-full w-full rounded-l-lg" />
                                    </div>
                                    <span className="p-10 font-bold">Nombre del artículo </span>
                                </div>
                            </div>
                        </div>
                        <div className=" ml-7 mt-4 flex pb-10">
                            <div className=" size-14 pb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                    <path d="m19,5h-2.077c-.336-1.903-1.753-3.474-3.674-3.968-.529-.137-1.079.185-1.218.719-.138.535.185,1.08.72,1.217,1.324.341,2.249,1.536,2.249,2.906v11.126H4c-1.103,0-2-.897-2-2v-4h2.5c.553,0,1-.448,1-1s-.447-1-1-1h-2.5c-1.103,0-2,.897-2,2v4c0,1.88,1.304,3.461,3.055,3.887-.036.201-.055.406-.055.613,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h4.074c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.207-.019-.412-.055-.613,1.751-.426,3.055-2.007,3.055-3.887v-5c0-2.757-2.243-5-5-5Zm3,5v1h-5v-4h2c1.654,0,3,1.346,3,3Zm-14,9.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm9.5,1.5c-.827,0-1.5-.673-1.5-1.5,0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5,0,.827-.673,1.5-1.5,1.5Zm2.5-4h-3v-4h5v2c0,1.103-.897,2-2,2ZM0,2c0-.552.447-1,1-1h8.154c.553,0,1,.448,1,1s-.447,1-1,1H1c-.553,0-1-.448-1-1Zm0,4c0-.552.447-1,1-1h6.154c.553,0,1,.448,1,1s-.447,1-1,1H1c-.553,0-1-.448-1-1Z" />
                                </svg>
                            </div>
                            <div className="flex flex-col px-4">
                                <span className="text-black text-base font-bold pr-2">Fecha estimada de entrega:</span>
                                <span className="text-gray-500 font-base">8 de Mayo</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-300 w-[300px] h-[400px] m-10 rounded-lg">
                        <div className=" text-center pt-3">
                            <span className="font-bold">Actualizaciones</span>
                            <ul>
                                <li className="py-2">
                                    <span>Información del envío</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}