
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { Router } from "@/app/router/Router";

interface Factura {
    id_factura: number;
    fecha: string; // Asumo que la fecha es una cadena en formato ISO (por ejemplo, "2024-05-05T10:30:00")
    total: number;
    // Otros campos de la factura si los hay
}

export const ProcesoFactura = () => {
    
    const [factura, setFactura] = useState<Factura[]>([]); // Tipo Factura[] para facturas
    const user = useAuth(s => s.user);
    const navigate = useNavigate();

   
    if(!user){
        navigate(Router.login);
    }

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const facturaResponse = await fetch(`http://localhost:3000/usuario/historialCompra?id_usuario=${user.id_usuario}`);
                if (facturaResponse.ok) {
                    const facturaData = await facturaResponse.json();
                    console.log('Factura de compra:', facturaData);
                    console.log('Factura de compra:', facturaData[facturaData.length]);
                    setFactura(facturaData);
                } else {
                    console.error('Error al obtener las facturas:', facturaResponse.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchFacturas();
    }, []);

    const handleDescargarFactura = async (id_factura) => {
        try {
            console.log(id_factura);
            const response = await fetch(`http://localhost:3000/factura/generar?idFactura=${id_factura}`);
            if (response.ok) {
                const pdfBlob = await response.blob();
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'factura.pdf';
                link.click();
                URL.revokeObjectURL(pdfUrl);
            } else {
                console.error('Error al descargar la factura:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    

    return (
        <div className="w-full h-full flex flex-col relative justify-center items-center">
            {/* Contenedor blanco */}
            <div className="flex-1 flex justify-center items-center px-20 mt-20"> {/* Añade mt-20 para ajustar la posición */}
                <div className="flex flex-col bg-white h-[400px] w-[990px] rounded-xl p-7 drop-shadow-md relative">
                    {/* Aquí puedes colocar cualquier contenido que desees */}
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <FaCheckCircle className="w-24 h-24 text-green-600 mb-4" />
                        <p className="text-center text-2xl font-semibold mb-8">¡Gracias por su compra!</p>
                        <div className="flex justify-center">
                        <Button onClick={() => handleDescargarFactura(factura[0].id_factura)} className="text-white font-semibold p-4 text-sm bg-marron rounded-full hover:bg-slate-300 hover:text-black">Descargar Factura</Button>                    </div>

                        </div>
                    </div>
                </div>
            </div>
    
    );
    
}