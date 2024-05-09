import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Paginator() {
    const [logs, setLogs] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/auditoria/inventario'); 
                if (!response.ok) { // Verificar si la respuesta fue exitosa
                    throw new Error('No se pudieron obtener los datos del servidor');
                }
            
                const data = await response.json();
                setLogs(data);
            } catch (error) {
                console.error('Error al obtener los datos del servidor:', error);
            }
        };

        fetchData(); 
    }, []);


    return (
        <div className="card">
            <DataTable value={logs} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="log_id" header="Log ID"></Column>
                <Column field="fechaaccion" header="Fecha de Acción"></Column>
                <Column field="descripcionaccion" header="Descripción de Acción"></Column>
                <Column field="idproducto" header="ID de Producto"></Column>
            </DataTable>
        </div>
    );
}