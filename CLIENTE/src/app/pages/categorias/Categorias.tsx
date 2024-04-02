import { useNavigate, useSearchParams } from "react-router-dom"
import { Router } from "../../router/Router";

export const Categorias = () => {

    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    const Opcion = ({
        nombre, className
    }: { nombre: string, className?: string }) => {
        return (
            <div
                className={`${className} bg-white w-auto h-10 absolute bottom-0 left-0 rounded-bl-xl rounded-tr-2xl p-2`}
            >
                <strong>{nombre}</strong>
            </div>
        )
    }

    const IrAProductos = (categoria: string) => {
        setParams({ ...params, categoria });
        navigate(Router.catalogo + `?categoria=${categoria}`);
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-7">
            <div
                className="h-64 drop-shadow-xl relative hover:scale-105 hover:cursor-pointer"
                onClick={() => IrAProductos("1")}
            >
                <Opcion nombre="Muebles para el hogar" className="align-middle text-center text-ardilla px-4" />
                <img src="categorias/centro e irl.webp" alt="Muebles para el hogar" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div
                className="col-span-2 h-64 drop-shadow-xl relative hover:scale-105 hover:cursor-pointer"
                onClick={() => IrAProductos("2")}
            >
                <Opcion nombre="Pisos y Techos" className="align-middle text-center text-ardilla px-4" />
                <img src="categorias/piso-de-bamboo-mexico.jpg" alt="Pisos y Techos" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div
                className="h-64 drop-shadow-xl relative hover:scale-105 hover:cursor-pointer"
                onClick={() => IrAProductos("3")}
            >
                <Opcion nombre="Exterior" className="align-middle text-center text-ardilla px-4" />
                <img src="categorias/childrenhouse-1024x608.jpg" alt="Exterior" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div
                className="h-56 drop-shadow-xl relative hover:scale-105 hover:cursor-pointer"
                onClick={() => IrAProductos("4")}
            >
                <Opcion nombre="Decoraciones" className="align-middle text-center text-ardilla px-4" />
                <img src="categorias/estante baño irl.webp" alt="Decoraciones" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div
                className="h-56 drop-shadow-xl relative hover:scale-105 hover:cursor-pointer"
                onClick={() => IrAProductos("5")}
            >
                <Opcion nombre="Puertas" className="align-middle text-center text-ardilla px-4" />
                <img src="categorias/puerta madera 1 irl.webp" alt="Puertas" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div
                className="col-span-2 h-56 drop-shadow-xl relative hover:scale-105 hover:cursor-pointer"
                onClick={() => IrAProductos("6")}
            >
                <Opcion nombre="Materiales y Estructuras" className="align-middle text-center text-ardilla px-4" />
                <img src="categorias/tableros-madera.jpg" alt="Materiales y Estructuras" className="h-full w-full object-cover rounded-xl" />
            </div>

        </div>
    )
}