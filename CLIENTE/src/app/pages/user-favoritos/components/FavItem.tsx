import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import axios from "axios";

interface favItem {
  producto: {
      id_producto: string;
      nombre: string;
      precio: number;
  };
  cantidad: number;
  imageURL?: string;
}


const FavItem = () => {

  const [productos, setProductos] = useState<favItem[]>([]);
  const user = useAuth(s => s.user);
  const navigate = useNavigate();
  

  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      try {
        const response = await fetch(`http://localhost:3000/producto/obtenerDestacados?idUsuario=${user.id_usuario}`);
        const data = await response.json();
  
        // Declarar una variable productos como un arreglo vacío
        let productos = [];
  
        // Obtener los items del carrito
        for (let index = 0; index < data.length; index++) {
          // Iterar sobre cada elemento en data y obtener el primer producto de cada elemento
          productos.push(data[index].producto[0]);
        }
  
        // Cargar las imágenes de los productos
        const updated = await Promise.all(productos.map(async (item) => {
          try {
            const response = await axios.get(`http://localhost:3000/producto/CatalogoImagenes/${item.nombre}`);
            const imagen = response.data;
            return { ...item, imageURL: imagen };
          } catch (error) {
            console.error('Error al obtener la imagen del producto:', error);
            // Si hay un error al cargar la imagen, simplemente devolver el item sin la imagen
            return item;
          }
        }));
  
        // Actualizar el estado con los productos procesados
        setProductos(updated);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    obtenerProductosDestacados();
  }, []);

  return (
  <div>
    {productos.map((producto) => (
      <div className="container mx-auto my-6" key={producto.id_producto}>
        <div className="flex flex-col justify-start">
          <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white">
            <div className="w-48 bg-white grid place-items-center">
              <img
                className="w-full rounded-lg sm:w-20"
                src={producto.imageURL ? `data:image/png;base64,${producto.imageURL}` : ""}
                alt="product-image"
              />
            </div>
            <div className="w-[600px] h-[160px] bg-white flex flex-col space-y-1 p-3">
              <div className="flex justify-between item-center">
                <p className="text-gray-500 font-medium text-xs hidden md:block">Producto</p>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <p className="text-gray-600 font-bold text-xs ml-1">
                    4.96
                    <span className="text-gray-500 font-normal">(76 reviews)</span>
                  </p>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-black text-gray-800 md:text-xl text-xl">
                {producto.nombre}
              </h3>
              <p className="md:text-sm text-gray-500 text-xs text-justify">
                {producto.descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}
export default FavItem;