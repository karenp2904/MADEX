export const pruebilla = () => {
    return (
        <div>
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
    )
}