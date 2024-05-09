import Item from "../carrito/components/Item"
import FavItem from "./components/FavItem"
import { useNavigate } from "react-router-dom";

export const UserFavoritos = () => {
    
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
                className={`text-lg hover:text-gray-300 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat ${className}`}
                onClick={onClick}
            >
                <strong>{nombre}</strong>
            </div>
        )
    }

    
    return (
        <div className="container flex p-4">
            <div className="m-5 bg-marron shadow-xl rounded-large w-60 h-auto">
                <div className="grid-cols-1 m-5 grid gap-y-8 text-white my-10">
                <Opcion nombre="Cuenta" className="bg-userw" onClick={() => navigate('/user-cuenta') }/>
                <Opcion nombre="Pedidos" className="bg-pedidos" onClick={() => navigate('/user-pedidos') }/>
                <Opcion nombre="Favoritos" className="bg-fav" onClick={() => navigate('/user-favoritos') }/>
                <Opcion nombre="Historial" className="bg-historial" onClick={() => navigate('/historialCompra') }/>
                </div>
            </div>
            <div className="bg-white shadow-xl w-full h-auto rounded-xl m-5">
                <div className=" ml-7  mt-10 ">
                    <span className="font-bold text-ardilla text-2xl">Favoritos</span>
                </div>
                <div>
                    <div>
                        <div className=" ">
                            <FavItem />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}