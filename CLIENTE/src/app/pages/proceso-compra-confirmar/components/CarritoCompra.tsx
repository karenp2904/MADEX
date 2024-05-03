import { useNavigate } from "react-router-dom";
import Item from "../../carrito/components/Item";
import { Router } from "../../../router/Router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const CarritoCompra = () => {

    const [subtotal, setSubtotal] = useState(0); // Estado para almacenar el subtotal

    const user = useAuth(s => s.user);
    const navigate = useNavigate();

    // Llamar a fetchSubtotal al cargar el componente
    useEffect(() => {
        if (!user) {
            alert("El usuario no esta logeado");
            navigate(Router.login)
            return
        }
        // Función para obtener el subtotal del carrito de compras
        const fetchSubtotal = async () => {
            try {
                const response = await fetch(`http://localhost:3000/carrito/contenido/idUsuario?idUsuario=${user.id_usuario}`);
                const data = await response.json();
                setSubtotal(data.subtotal); // Actualizar el estado con el subtotal obtenido del backend
                console.log(data.subtotal, "°°°");
            } catch (error) {
                console.error('Error al obtener el subtotal del carrito:', error);
            }
        };
        fetchSubtotal();
    }, [user]);

    return (
        <div className=" h-[500px] w-[990px] rounded-xl p-4  drop-shadow-md">
            <div className="flex">
                <div className=" flex flex-col rounded-lg md:w-2/3">
                    <Item />
                </div>
                <div className="flex flex-col px-6">
                    <div className="flex">
                        <p className="p-4 text-ardilla font-bold text-lg">Subtotal:</p>
                        <p className="pt-4 pr-4 text-black font-semibold text-lg">${subtotal} COP</p>
                    </div>
                    <div className="px-2">
                        <button onClick={() => navigate(Router.procesoCompraDatos)} className="bg-ardilla text-white font-semibold rounded-lg p-2 w-full">
                            Finalizar compra
                        </button>
                        <div className="flex bg-brown-200 rounded-lg p-2 mt-2 items-center">
                            <svg width="40" height="66" viewBox="0 0 66 60" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.6902 29.2325L25.8502 24.665L19.9102 29.8625L25.9602 35.58C26.5536 36.1512 27.2664 36.609 28.0569 36.9266C28.8473 37.2443 29.6996 37.4154 30.5637 37.43H30.6654C32.3785 37.4255 34.0206 36.8075 35.2359 35.71L49.0437 23.1525L43.2082 17.8525L30.6902 29.2325Z" fill="#A67C5D" />
                                <path d="M32.7855 60L31.3252 59.4075C30.2692 58.9725 5.5 48.75 5.5 30V13.8125C5.50016 12.2382 6.04526 10.7038 7.05805 9.42685C8.07085 8.14986 9.5 7.19498 11.143 6.6975L33 0.0749969L54.8597 6.7C56.5032 7.19579 57.9328 8.14997 58.9454 9.42687C59.958 10.7038 60.502 12.2384 60.5 13.8125V30C60.5 51.3475 35.3732 59.205 34.3035 59.53L32.7855 60ZM33 7.98L13.75 13.8125V30C13.75 41.675 28.446 49.6175 33.2118 51.8825C38.0023 50.065 52.25 43.52 52.25 30V13.8125L33 7.98Z" fill="#866349" />
                            </svg>
                            <p className="p-3 text-xs font-semibold w-48">
                                Compra segura:
                                <span className=" font-normal p-1 ">
                                    Tus datos personales se mantienen bajo estricta
                                    confidencialidad y estan protegidos.
                                </span>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

};

export default CarritoCompra;