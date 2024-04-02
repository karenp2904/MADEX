
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';

import { IProduct } from '../../../models/interfaces/IProduct';
import { TablaAdminiventario } from './components/TablaAdminInventario';
//import { ProductService } from './service/ProductService';


export const AdminInventario = () => {

    const products: IProduct[] = [

        {
            "id": "WP0",
            "name": "Oak Plank",
            "price": 50.00,
            "stock":   100,
            "status": "INSTOCK",
        },
        {
            "id": "WP3",
            "name": "Maple Wood",
            "price": 40.00,
            "stock": 0,
            "status": "LOWSTOCK"
        },
        {
            "id": "WP3",
            "name": "Birch Timber",
            "price": 45.00,
            "stock": 4,
            "status": "INSTOCK"
        },
        {
            "id": "WP4",
            "name": "Pine Board",
            "price": 30.00,
            "stock": 60,
            "status": "OUTOFSTOCK"
        }

    ];

    const Opcion = ({
        nombre, className
    }: {nombre: string, className?: string}) => {
        return (
            <div
                className={`${className} hover:text-gray-400 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat`}
            >
                <strong>{nombre}</strong>
            </div>
        )
    }

    return (
        <div className="container flex pt-4">
            <div className="m-5 bg-gray-800 shadow-xl rounded-large w-60 h-screen ">
                <div className='grid-cols-1 m-5 grid gap-y-8 text-white my-10'>
                    <Opcion nombre="Inventario" className="bg-aplicaciones" />
                    <Opcion nombre="Auditlog" className="bg-auditlog" />
                    <Opcion nombre="Usuarios" className="bg-m-users" />
                    <Opcion nombre="Roles" className="bg-roles" />
                    <Opcion nombre="Facturas" className="bg-facturas" />
                </div>
            </div>
            <div className="bg-white shadow-xl aspect-auto rounded-xl m-5">
                <div className='m-3 p-4'>
                    <div className="card p-fluid">
                        <TablaAdminiventario
                            products={products}
                        />
                    </div>
                </div>

            </div>

        </div>

    );
}