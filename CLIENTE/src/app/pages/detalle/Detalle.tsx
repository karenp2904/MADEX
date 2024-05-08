import { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import NumberInput from "./components/NumberInput";
import Gallery from "./components/Gallery";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../../models/interfaces/IProduct";
import axios from "axios";
import Notification from "../../../components/Notification";

export const Detalle = () => {
     // Obtiene la información del producto de la ruta
    const location = useLocation();
    const productId = new URLSearchParams(location.search).get("id");
    const [notificationMessage, setNotificationMessage] = useState('');

    const [quantity, setQuantity] = useState(0);

    // Estado para almacenar la información del producto
    const [producto, setProducto] = useState<IProduct | null>(null);

    useEffect(() => {
        const obtenerProductoPorId = async (idProducto) => {
            try {
                console.log(idProducto + " ID en detalle");
                const res = await axios.get(`http://localhost:3000/producto/obtenerProducto?idProducto=${idProducto}`);
                if (res.data && res.data[0]) {
                    const producto = res.data[0];
                    console.log('Producto obtenido:', producto);
                    // Almacena el producto obtenido en el estado local
                    setProducto(producto);
                }
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                // Manejar errores de red, etc.
                throw error;
            }
        };
        
        // Verificar si productId está presente antes de realizar la solicitud
        if (productId) {
            obtenerProductoPorId(productId);
        } else {
            // Si productId no está presente, establece producto en null o un valor predeterminado
            setProducto(null); // o setProducto(defaultProduct);
        }
    
    }, [productId]);
    

    // Si el producto aún no se ha cargado, puedes mostrar un mensaje de carga o spinner
    if (!producto) {
        return <div>Cargando...</div>;
    }

    const handleAddToCart = async () => {
            try {
            // Realizar la solicitud para agregar el producto al carrito
            console.log(producto.id_producto );
            const response = await axios.post('http://localhost:3000/carrito/agregar', {
                idUsuario: '1097490756',
                idProducto: producto.id_producto,
                cantidad: '1'
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
        
            if (response.status === 201 || response.status === 200) {
                const data = response.data;
                console.log(data)
                setNotificationMessage('Producto añadido al carrito correctamente');
                // Si la solicitud se completa correctamente, mostrar el mensaje de éxito
            }
            } catch (error) {
            console.error('Error en la solicitud:', error);
            }
    };

        
    const handleAddFavorites = async () => {
        try {
        // Realizar la solicitud para agregar el producto al carrito
        console.log(producto.id_producto + "favoritos");
        const response = await axios.post('http://localhost:3000/producto/agregarDestacados', {
            idProducto: producto.id_producto,
            idUsuario: '1097490756',
        }, {
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (response.status === 201 || response.status === 200) {
            const data = response.data;
            console.log(data)
        
        } else {
        
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        }
    };

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    });

    const formatPrice = (price) => {
        const totalFormateado = price.toLocaleString('es-CO', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });

        // Formatear el valor en millones y agregar el símbolo de moneda COP y la indicación de "millón"
        const formattedPrice = formatter.format(totalFormateado).replace(',', '.') ;

        return formattedPrice;
       // return totalFormateado;
    };

    const formatDiscount = (price, discount) => {
        // Calcular el precio con descuento
        if(discount === null || discount === '0.00' || discount === '0'){
            return '';
        }
        const discountedPrice = price - (price * (discount / 100));
    
        // Formatear el precio con descuento
        const formattedDiscountedPrice = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(discountedPrice);
    
        return formattedDiscountedPrice;
    };


    // Una vez que el producto está disponible, muestra los detalles
    return (
        <div className="flex justify-center p-8">
            <div className="bg-white h-[650px] w-[960px] rounded-xl">
                <div className="container flex justify-center p-6">
                    <div className=" bg-gray-200 h-[510px] w-[580px] rounded-lg m-1 ">
                        <div className=" justify-center">
                            {/* Renderiza la galería con las imágenes del producto */}
                            <Gallery productName={producto.nombre} />
                        </div>
                    </div>
                    <div className="w-[700px] m-2 inline-flex flex-col">
                        <strong className=" text-xl pb-2">{producto.nombre}</strong>
                        <Rating />
                        <div className=" inline-block py-4">
                            <strong className=""> {formatPrice(producto.precio)}</strong>
                            <strong className=" text-gray-700 line-through text-md justify-center px-2"> {formatDiscount(producto.precio,producto.descuento)}</strong>
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
                                <span className="px-1">{producto.color}</span>
                            </div>
                            <div className=" pb-5">
                                <div className="mr-1 bg-gray-300 rounded-full size-5 inline-flex hover:cursor-pointer"></div>
                                <div className=" bg-brown-500 rounded-full size-5 inline-flex hover:cursor-pointer"></div>
                            </div>
                            <span className=" text-primary-color font-semibold">{producto.stock} unidades disponibles</span>
                        </div>
                        <div className="">
                            <div className=" float-start py-3">
                            <NumberInput 
                                value={quantity}  
                                onChange={(newQuantity) => setQuantity(newQuantity)} 
                            />
                            </div>
                        </div>
                            <div className="py-3 inline-block">
                                <button className="bg-ardilla text-white rounded-lg font-semibold p-2" onClick={handleAddToCart}>
                                    Agregar al carrito
                                    <div className=" inline-block pl-2">
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="20" height="15"><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" /><path d="M22.984,6.018A3.675,3.675,0,0,0,20.364,5H5.654L5.391,2.938A3.328,3.328,0,0,0,2.087,0H1.5A1.5,1.5,0,0,0,0,1.5H0A1.5,1.5,0,0,0,1.5,3h.587a.331.331,0,0,1,.326.3l1.5,11.759A3.327,3.327,0,0,0,7.217,18H17.339a5.5,5.5,0,0,0,5.3-4.042l1.246-4.531A3.489,3.489,0,0,0,22.984,6.018ZM19.75,13.163A2.508,2.508,0,0,1,17.339,15H7.217a.329.329,0,0,1-.325-.3L6.037,8H20.514A.5.5,0,0,1,21,8.632Z" /></svg>
                                    </div>
                                </button>
                                <button className=" bg-gray-400 rounded-lg font-semibold p-2 m-2"onClick={handleAddFavorites}>
                                    Añadir a favoritos
                                    <div className=" inline-block pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" fill="#FF5733" viewBox="0 0 24 24" width="20" height="15"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" /></svg>
                                    </div>
                                </button>
                                <Notification message={notificationMessage} />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
