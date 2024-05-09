import Paginator from './components/Paginator'
import { useNavigate } from "react-router-dom";

export const AdminLog = () => {
    const navigate = useNavigate();
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
                    <div className="card p-fluid py-5 px-28">
                        <Paginator />
                    </div>
                </div>

            </div>
        </div>
    )
}