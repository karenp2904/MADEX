import { useState, useEffect } from 'react';
import NumberInput from "../../detalle/components/NumberInput";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Router } from '@/app/router/Router';

const Item = () => {
    
    const user = useAuth(s => s.user);
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        if (!user) {
            alert("El usuario no esta logeado");
            navigate(Router.login)
            return
        }
        const fetchCartItems = async () => {

            try {
                // Obtener el ID del usuario de algún lugar (por ejemplo, desde el estado o las props)
                const response = await fetch(`http://localhost:3000/carrito/contenido/idUsuario?idUsuario=${user.id_usuario}`);

                const data = await response.json();
                // Actualizar el estado con los items del carrito
                setCartItems(data.carritoCompras.productos);
            } catch (error) {
                console.error('Error al obtener los items del carrito:', error);
            }
        };

        fetchCartItems();
    }, [user]);


    const handleQuantityChange = async (idProducto, newQuantity) => {
        if (!user) {
            alert("El usuario no esta logeado");
            navigate(Router.login)
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
                const updatedItems = cartItems.map(item => {
                    if (item.producto.id_producto === idProducto) {
                        return { ...item, cantidad: newQuantity };
                    }
                    return item;
                });
                setCartItems(updatedItems);
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
                    <img src={item.producto.imagen} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    {/* Resto del contenido del item */}
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                            {/* Detalles del producto */}
                            <h2 className="text-lg font-bold text-gray-900">{item.producto.nombre}</h2>
                            <h6 className="text-xs font-bold text-gray-900 py-2">{item.producto.precio} COP</h6>
                            {/* Más detalles del producto */}
                        </div>
                        {/* Opciones del item, como modificar cantidad */}
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                                {/* Componente NumberInput para modificar cantidad */}
                                <NumberInput value={item.cantidad} onValueChange={(newQuantity) => handleQuantityChange(item.producto.id_producto, newQuantity)} />
                            </div>
                            {/* Resto de opciones del item */}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Item;
