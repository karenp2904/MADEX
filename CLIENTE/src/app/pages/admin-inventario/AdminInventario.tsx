
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';

import { useEffect, useState } from 'react';
import { IProduct } from '../../../models/interfaces/IProduct';
import { TablaAdminiventario } from './components/TablaAdminInventario';
import { obtenerProductos } from '../../../services/productService';
import { useNavigate } from "react-router-dom";
//import { ProductService } from './service/ProductService';


export const AdminInventario = () => {

    const [productos, setProductos] = useState<IProduct[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        obtenerProductos()
            .then((res) => {
                console.log(res.productos);
                setProductos([...res.productos]);
            });
    }, []);

/*
    const products: IProduct[] = [

        {
            "id_producto": "WP0",
            "name": "Oak Plank",
            "price": 50.00,
            "stock":   100,
            "status": "INSTOCK",
        },
        {
            "id_producto": "WP3",
            "name": "Maple Wood",
            "price": 40.00,
            "stock": 0,
            "status": "LOWSTOCK"
        },
        {
            "id_producto": "WP3",
            "name": "Birch Timber",
            "price": 45.00,
            "stock": 4,
            "status": "INSTOCK"
        },
        {
            "id_producto": "WP4",
            "name": "Pine Board",
            "price": 30.00,
            "stock": 60,
            "status": "OUTOFSTOCK"
        }

    ];
*/


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
                className={`hover:text-gray-400 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat ${className}`}
                onClick={onClick}
            >
                <strong>{nombre}</strong>
            </div>
        );
    };

    return (
        <div className="container flex pt-4">
            <div className="m-5 bg-gray-800 shadow-xl rounded-large w-60 h-screen ">
                <div className='grid-cols-1 m-5 grid gap-y-8 text-white my-10'>
                    <Opcion nombre="Inventario" className="bg-aplicaciones" onClick={() => navigate('/admin-inventario') }/>
                    <Opcion nombre="Auditlog" className="bg-auditlog"  onClick={() => navigate('/admin-log') }/>
                    <Opcion nombre="Usuarios" className="bg-m-users"  onClick={() => navigate('/admin-usuarios') }/>
                    <Opcion nombre="Facturas" className="bg-facturas"  onClick={() => navigate('/admin-facturas') }/>
                </div>
            </div>
            <div className="bg-white shadow-xl aspect-auto rounded-xl m-5">
                <div className='m-3 p-4'>
                    <div className="card p-fluid">
                        <TablaAdminiventario
                            products={productos}
                        />
                    </div>
                </div>

            </div>

        </div>

    );
}