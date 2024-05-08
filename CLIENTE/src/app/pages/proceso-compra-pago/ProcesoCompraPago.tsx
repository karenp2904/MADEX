import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Tarjeta } from "../../../components/Tarjeta";
import { useNavigate } from "react-router-dom";
import { Router } from "../../router/Router";
import { useAuth } from '@/hooks/useAuth';

export const ProcesoCompraPago = () => {
    const user = useAuth(s => s.user);
    const navigate = useNavigate();
    const [pagoExitoso, setPagoExitoso] = useState(false);

    const handleContinuarPago = async () => {
        if (!user) {
            //alert("El usuario no esta logeado");
            //navigate(Router.login)
            return
        }
        try {
            const response = await fetch('http://localhost:3000/factura/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUsuario: user.id_usuario, 
                    idMetodoDePago: '1' 
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Factura creada:', data);
                setPagoExitoso(true);
                navigate(Router.procesoFactura);
            } else {
                console.error('Error al crear la factura:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Agrega un mensaje de error o manejo de errores aquí
        }
    };
    

    

    const handleCloseNotification = () => {
        // Cierra el letrero de "Pago Exitoso"
        setPagoExitoso(false);
        // Navega a la página de proceso de factura
        navigate(Router.procesoFactura);
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
                    <div className="bg-green-600 text-white rounded-md p-4 shadow-md flex justify-between items-center">
                        <div>
                            <span>¡Pago Exitoso!</span>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 