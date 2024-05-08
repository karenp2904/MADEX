import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/ui/components/ui/table";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
//import { FaCheckCircle } from 'react-icons/fa';

interface Factura {
    id_factura: number;
    fecha: string; // Asumo que la fecha es una cadena en formato ISO (por ejemplo, "2024-05-05T10:30:00")
    total: number;
    // Otros campos de la factura si los hay
}




export const HistorialCompra = () => {

    const [facturas, setFacturas] = useState<Factura[]>([]); // Tipo Factura[] para facturas

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const facturaResponse = await fetch('http://localhost:3000/usuario/historialCompra?id_usuario=1097490756');
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


    const formatDate = (date) => {
        // Extract only the date part (YYYY-MM-DD) from the ISO string representation of the Date object
        return date.toISOString().split('T')[0];
    };

    const formatTotal = (total) => {
        const totalFormateado = total.toLocaleString('es-CO', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
        return totalFormateado;
    }

    const Opcion = ({
        nombre, className
    }: { nombre: string, className?: string }) => {
        return (
            <div
                className={`${className} text-lg hover:text-gray-300 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat`}
            >
                <strong>{nombre}</strong>
            </div>
        )
    }

    return (
        <div className="container flex p-4">
            <div className="m-5 bg-marron shadow-xl rounded-large w-60 h-auto">
                <div className="grid-cols-1 m-5 grid gap-y-8 text-white my-10">
                    <Opcion nombre="Cuenta" className="bg-userw" />
                    <Opcion nombre="Pedidos" className="bg-pedidos" />
                    <Opcion nombre="Favoritos" className="bg-fav" />
                    <Opcion nombre="Historial" className="bg-historial" />
                </div>
            </div>
            <div className="bg-white shadow-xl w-full h-auto rounded-xl m-5">
                <div className=" ml-7  mt-10 ">
                    <span className="font-bold text-ardilla text-2xl">Historial de compras</span>
                </div>
                <div>
                    <div className="m-4">
                        <Table>
                            <TableCaption>Tus compras recientes.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Fecha</TableHead>

                                    <TableHead>Acciones</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {facturas.map((factura) => (
                                    <TableRow key={factura.id_factura}>
                                        <TableCell className="border border-gray-400 px-4 py-2">
                                            {/* Display factura.fecha without any formatting */}
                                            {factura.fecha.slice(0, 10)}
                                        </TableCell>

                                        <TableCell className="border border-gray-400 px-4 py-2">{formatTotal(factura.total)}</TableCell>
                                        <TableCell className="border border-gray-400 px-4 py-2">
                                            <Button onClick={() => handleDescargarFactura(factura.id_factura)}>Descargar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>

            </div>

        </div>
    );
} 