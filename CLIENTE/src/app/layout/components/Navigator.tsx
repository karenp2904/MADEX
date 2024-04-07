import { useState } from "react"
import Arrow from "/arrow/arrow-left-white.svg";

export const Navigator = () => {

    const [rutas] = useState<string[]>([
        "Productos", "/",
        "Categorías", "/",
        "Muebles para el hogar"
    ]);
    
    return (
        <div className="w-full h-10 bg-ardilla flex items-center space-x-2 text-white">
            <img className="max-w-10" src={Arrow} alt="" />
            {
                rutas.map((ruta, i) => (
                    <span key={i} className="hover:text-gray-300 hover:cursor-pointer">{ruta}</span>
                ))
            }
        </div>
    )
}