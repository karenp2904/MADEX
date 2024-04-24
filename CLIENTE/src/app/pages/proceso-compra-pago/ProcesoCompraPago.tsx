import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Tarjeta } from "../../../components/Tarjeta";
import UserInfoCard from "../proceso-compra-datos/components/UserInfoCard";
import { useNavigate } from "react-router-dom";
import { Router } from "../../router/Router";

export const ProcesoCompraPago = () => {
    const navigate = useNavigate();
    const [pagoExitoso, setPagoExitoso] = useState(false);

    const handleContinuarPago = async () => {
        try {
            const response = await fetch('http://localhost:3000/factura/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUsuario: '1097490756', 
                    idMetodoDePago: '1' 
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Factura creada:', data);
                setPagoExitoso(true); // Marcar el pago como exitoso si la factura se crea correctamente
            } else {
                console.error('Error al crear la factura:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    

    const handleCloseNotification = () => {
        setPagoExitoso(false);
    };
    return (
        <div className="w-full h-full flex flex-col relative">
            {/* ... */}
            <div className="flex-1 flex justify-center items-center px-20">
                <div className="flex flex-col bg-white h-[400px] w-[990px] rounded-xl p-7 drop-shadow-md relative">
                    <Tarjeta />
                    <div className="flex-1 flex justify-evenly items-center">
                        <span onClick={() => navigate(Router.procesoCompraDatos)} className="hover:cursor-pointer hover:underline">Volver al carrito</span>
                        <Button onClick={handleContinuarPago}>Continuar al Pago</Button>
                    </div>
                </div>
            </div>
            {pagoExitoso && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
                    <div className="bg-green-600 text-white rounded-md p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <span>¡Pago Exitoso!</span>
                            <button onClick={handleCloseNotification} className="text-white hover:text-gray-200 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M13.414 10l3.293 3.293a1 1 0 01-1.414 1.414L12 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414L12 8.586l3.293-3.293a1 1 0 111.414 1.414L13.414 10z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
