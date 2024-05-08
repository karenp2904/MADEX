import { useState, useEffect } from 'react';
import NumberInput from "../../detalle/components/NumberInput";
import axios from "axios";
import { useAuth } from '@/hooks/useAuth';
//import { useNavigate } from 'react-router-dom';
//import { Router } from '@/app/router/Router';

interface CartItem {
    producto: {
        id_producto: string;
        nombre: string;
        precio: number;
    };
    cantidad: number;
    imageURL?: string;
}

const Item = () => {
    const user = useAuth(s => s.user);
    //const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    //const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Luego, puedes utilizar esta interfaz para definir el tipo de updatedCartItems:
    const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (!user) {
            //alert("El usuario no esta logeado");
            //navigate(Router.login)
            return
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/carrito/contenido/idUsuario?idUsuario=${user.id_usuario}`);
                const data = await response.json();
                // Obtener los items del carrito
                const cartItemsData = data.carritoCompras.productos;

                // Cargar las imágenes de los productos
                const updated = await Promise.all(cartItemsData.map(async (item) => {
                    try {
                        const response = await axios.get(`http://localhost:3000/producto/CatalogoImagenes/${item.producto.nombre}`);
                        const imagen = response.data;
                        const updatedItem = { ...item, imageURL: imagen };
                        return updatedItem;
                    } catch (error) {
                        console.error('Error al obtener la imagen del producto:', error);
                        // Si hay un error al cargar la imagen, simplemente devolver el item sin la imagen
                        return item;
                    }
                }));

                setUpdatedCartItems(updated);

                // Actualizar el estado con los items del carrito que ahora incluyen la URL de la imagen
                await setCartItems(updatedCartItems);


            } catch (error) {
                console.error('Error al obtener los items del carrito:', error);
            }
        };

        fetchData();
    }, [updatedCartItems, user]);

    /*
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/carrito/contenido/idUsuario?idUsuario=1097490756`);
                    const data = await response.json();
                    // Actualizar el estado con los items del carrito
                    setCartItems(data.carritoCompras.productos);
                    loadProductImages(data.carritoCompras.productos);
        
                } catch (error) {
                    console.error('Error al obtener los items del carrito:', error);
                }
            };
        
            fetchData();
            
        }, []);
        
        const loadProductImages = async (items) => {
            const updatedCartItems = [];
            for (const item of items) {
                try {
                    console.log(item.producto.nombre);
                    axios.get(`http://localhost:3000/producto/CatalogoImagenes/${item.producto.nombre}`)
                        .then((res) => {
                            if (res.data && res.data) {
                            const imagen= res.data;
                            const updatedItem = { ...item, imageURL: imagen};
                            updatedCartItems.push(updatedItem);
                            }
                        })
                } catch (error) {
                    console.error('Error al obtener la imagen del producto:', error);
                    // Si hay un error al cargar la imagen, simplemente agregar el item sin la imagen
                }
            }
            setCartItems(updatedCartItems);
        };*/


    const handleQuantityChange = async (idProducto, newQuantity) => {
        if (!user) {
            //alert("El usuario no esta logeado");
            //navigate(Router.login)
            return
        }
        try {
            // Realizar la solicitud PUT al endpoint /carrito/modificarCantidad
            const response = await fetch('http://localhost:3000/carrito/modificarCantidad', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idUsuario: user.id_usuario, idProducto: idProducto, cantidad: newQuantity })
            });
            if (response.ok) {
                console.log('Cantidad del producto en el carrito modificada exitosamente');
                // Actualizar los items del carrito después de modificar la cantidad
                /*
                const updatedItems = cartItems.map(item => {
                    if (item.producto.id_producto === idProducto) {
                        return { ...item, cantidad: newQuantity };
                    }
                    return item;
                });
                */
            } else {
                console.error('Error al modificar la cantidad del producto en el carrito:', response.statusText);
            }

        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    return (
        <>
            {cartItems.map((item) => (
                <div key={item.producto.id_producto} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    {/* Contenido del item del carrito */}
                    <img
                        className="w-full rounded-lg sm:w-20"
                        src={item.imageURL ? `data:image/png;base64,${item.imageURL}` : ""}
                        alt="product-image"
                    />

                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">

                            <h2 className="text-lg font-bold text-gray-900">{item.producto.nombre}</h2>
                            <h6 className="text-xs font-bold text-gray-900 py-2">{item.producto.precio} COP</h6>

                        </div>
                        {/* Opciones del item, como modificar cantidad */}
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                                <NumberInput
                                    value={item.cantidad}
                                    onChange={async (newQuantity: number) => {
                                        await handleQuantityChange(item.producto.id_producto, newQuantity);
                                    }}
                                />


                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Item;
