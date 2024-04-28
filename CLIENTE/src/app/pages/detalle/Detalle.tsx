import { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import NumberInput from "./components/NumberInput";
import Gallery from "./components/Gallery";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../../models/interfaces/IProduct";

export const Detalle = () => {
    // Obtiene la información del producto de la ruta
    const location = useLocation();
    const productId = new URLSearchParams(location.search).get("id");

    // Estado para almacenar la información del producto
    const [producto, setProducto] = useState<IProduct | null>(null);

    useEffect(() => {
        const obtenerProductoPorId = async (idProducto) => {
            try {
                const response = await fetch(`http://localhost:3000/producto/obtenerProducto?idProducto=${idProducto}`);
                if (response.ok) {
                    const producto = await response.json();
                    console.log('Producto obtenido:', producto);
                    // Almacena el producto obtenido en el estado local
                    setProducto(producto[0]);
                } else {
                    console.error('Error al obtener el producto:', response.statusText);
                    // Manejar el caso en que la solicitud no sea exitosa
                    throw new Error('Error en la solicitud de obtener el producto');
                }
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                // Manejar errores de red, etc.
                throw error;
            }
        };
        
        obtenerProductoPorId(productId);
    }, [productId]);

    // Si el producto aún no se ha cargado, puedes mostrar un mensaje de carga o spinner
    if (!producto) {
        return <div>Cargando...</div>;
    }

    // Una vez que el producto está disponible, muestra los detalles
    return (
        <div className="flex justify-center p-8">
            <div className="bg-white h-[580px] w-[960px] rounded-xl">
                <div className="container flex justify-center p-6">
                    <div className=" bg-gray-200 h-[510px] w-[580px] rounded-lg m-1 ">
                        <div className=" justify-center">
                            {/* Renderiza la galería con las imágenes del producto */}
                            <Gallery productName={producto.nombre} />
                        </div>
                    </div>
                    <div className=" w-[700px] m-2 inline-flex flex-col">
                        <strong className=" text-xl pb-2">{producto.nombre}</strong>
                        <Rating />
                        <div className=" inline-block py-4">
                            <strong className=""> $530.000 COP</strong>
                            <strong className=" text-gray-700 line-through text-md justify-center px-2"> $750.000 COP</strong>
                            <span className=" bg-red-500 px-2 font-semibold text-white">OFERTA</span>
                        </div>
                        <div className="py-6">
                            <span className=" font-bold text-md">Descripción:</span>
                            <br />
                            <p>{producto.descripcion}</p>
                        </div>
                        <div className="flex flex-col">
                            <div className=" inline-block">
                                <span className="font-bold">Seleccione un color:</span>
                                <span className="px-1">Gris claro</span>
                            </div>
                            <div className=" pb-5">
                                <div className="mr-1 bg-gray-300 rounded-full size-5 inline-flex hover:cursor-pointer"></div>
                                <div className=" bg-brown-500 rounded-full size-5 inline-flex hover:cursor-pointer"></div>
                            </div>
                            <span className=" text-primary-color font-semibold">10 unidades disponibles</span>
                        </div>
                        <div className="">
                            <div className=" float-start py-3">
                                <NumberInput />
                            </div>
                        </div>
                        <div className="py-3 inline-block">
                            <button className="bg-ardilla text-white rounded-lg font-semibold p-2">
                                Agregar al carrito
                                <div className=" inline-block pl-2">
                                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="20" height="15"><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" /><path d="M22.984,6.018A3.675,3.675,0,0,0,20.364,5H5.654L5.391,2.938A3.328,3.328,0,0,0,2.087,0H1.5A1.5,1.5,0,0,0,0,1.5H0A1.5,1.5,0,0,0,1.5,3h.587a.331.331,0,0,1,.326.3l1.5,11.759A3.327,3.327,0,0,0,7.217,18H17.339a5.5,5.5,0,0,0,5.3-4.042l1.246-4.531A3.489,3.489,0,0,0,22.984,6.018ZM19.75,13.163A2.508,2.508,0,0,1,17.339,15H7.217a.329.329,0,0,1-.325-.3L6.037,8H20.514A.5.5,0,0,1,21,8.632Z" /></svg>
                                </div>
                            </button>
                            <button className=" bg-gray-400 rounded-lg font-semibold p-2 m-2">
                                Añadir a favoritos
                                <div className=" inline-block pl-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" fill="#FF5733" viewBox="0 0 24 24" width="20" height="15"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" /></svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
