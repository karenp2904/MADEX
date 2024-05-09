import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/ui/components/ui/table";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
//import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { Router } from "@/app/router/Router";

interface Factura {
    id_factura: number;
    fecha: string;
    total: number;
    
}






export const HistorialCompra = () => {

    const [facturas, setFacturas] = useState<Factura[]>([]); // Tipo Factura[] para facturas
    const navigate = useNavigate();

    const user = useAuth(s => s.user);
    
    if(!user){
        navigate(Router.login);
    }

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const facturaResponse = await fetch(`http://localhost:3000/usuario/historialCompra?id_usuario=${user?.id_usuario}`);
                if (facturaResponse.ok) {
                    const facturaData = await facturaResponse.json();
                    setFacturas(facturaData);
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
            <div className="container flex justify-center items-center p-4">
            <div className="m-5 bg-marron shadow-xl rounded-large w-60 h-auto">
                <div className="grid-cols-1 m-5 grid gap-y-8 text-white my-10">
                <Opcion nombre="Cuenta" className="bg-userw" onClick={() => navigate('/user-cuenta')} />
                <Opcion nombre="Pedidos" className="bg-pedidos" onClick={() => navigate('/user-pedidos')} />
                <Opcion nombre="Favoritos" className="bg-fav" onClick={() => navigate('/user-favoritos')} />
                <Opcion nombre="Historial" className="bg-historial" onClick={() => navigate('/historialCompra')} />
                </div>
            </div>
            <div className="bg-white shadow-xl w-full h-auto rounded-xl m-5">
                <div className="ml-7 mt-10">
                <span className="font-bold text-ardilla text-2xl">Historial de compras</span>
                </div>
                <div className="m-4">
                <Table className="min-w-full">
                    <TableCaption>Tus compras recientes.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="border border-gray-800 px-4 py-2">Fecha</TableHead>
                        <TableHead className="border border-gray-800 px-4 py-2">Total</TableHead>
                        <TableHead className="border border-gray-800 px-4 py-2">Acciones</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {facturas.map((factura) => (
                        <TableRow key={factura.id_factura}>
                        <TableCell className="border border-gray-400 px-4 py-2">
                            {/* Display factura.fecha without any formatting */}
                            {factura.fecha.slice(0, 10)}
                        </TableCell>
                        <TableCell className="border border-gray-400 px-4 py-2">{formatPrice(factura.total)}</TableCell>
                        <TableCell className="border border-gray-400 px-4 py-2">
                            <Button onClick={() => handleDescargarFactura(factura.id_factura)} className="text-white font-semibold p-4 text-sm bg-marron rounded-full hover:bg-slate-300 hover:text-black">
                            Descargar
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </div>
            </div>
        );
}      
