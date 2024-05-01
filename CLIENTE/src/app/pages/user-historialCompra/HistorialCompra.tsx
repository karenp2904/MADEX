import { Button } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export const HistorialCompra = () => {
    const [facturas, setFacturas] = useState([]);

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

    const formatTotal= (total) => {
        const totalFormateado = total.toLocaleString('es-CO', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
        return totalFormateado;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex justify-center px-20 mt-20">
                <div className="bg-white rounded-xl p-7 drop-shadow-md">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-center text-2xl font-semibold mb-8">Historial de Compras</p>
                        <table className="border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">Fecha</th>
                                    <th className="border border-gray-400 px-4 py-2">Monto Total</th>
                                    <th className="border border-gray-400 px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facturas.map((factura) => (
                                    <tr key={factura.id_factura}>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {/* Display factura.fecha without any formatting */}
                                            {factura.fecha.slice(0, 10)}
                                        </td>

                                        <td className="border border-gray-400 px-4 py-2">{formatTotal(factura.total)}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            <Button onClick={() => handleDescargarFactura(factura.id_factura)}>Descargar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 