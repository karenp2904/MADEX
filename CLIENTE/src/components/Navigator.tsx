import { useNavigate } from "react-router-dom";
import Arrow from "/arrow/arrow-left-white.svg";

interface NavigatorProps {
    rutas: string[]
}

export const Navigator = ({
    rutas
}: NavigatorProps) => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-10 bg-ardilla flex items-center space-x-2 text-white">
            <img className="max-w-10" src={Arrow} alt="" />
            {
                rutas.map((ruta, i) => (
                    <span
                        key={i}
                        className="hover:text-gray-300 hover:cursor-pointer"
                        onClick={() => navigate("/" + ruta)}
                    >{ruta}</span>
                ))
            }
        </div>
    )
}