import Logo from "/icon/icon.svg";
import User from "/user.svg";
import Menu from "/menu-hamburguesa.svg";
import Cart from "/carrito-de-compras.svg";

export const NavBar = () => {
    return (
        <header className="sticky w-full h-14 bg-primary-color flex">
            <div className="h-full aspect-square flex justify-center items-center">
                <img className="w-1/2 aspect-square" src={Menu} />
            </div>
            <div className="flex-[5] flex">
                <img className="w-1/2 aspect-square" src={Logo} />
            </div>
            <div className="flex-1 flex justify-center items-center text-white">
                <span>Inicio</span>
            </div>
            <div className="flex-1 flex justify-center items-center text-white">
                <span>Productos</span>
            </div>
            <div className="flex-[2] flex justify-center items-center text-white">
                <span>Sobre Nosotros</span>
            </div>
            <div className="flex-1 flex justify-center items-center text-white">
                <span>Contacto</span>
            </div>
            <div className="flex justify-center items-center text-white">
                <input 
                    className="bg-transparent placeholder:text-white text-white w-96 border-2 border-white rounded-md"
                    type="text"
                    placeholder="Buscar en el sitio"
                />
            </div>
            <div className="h-full aspect-square flex justify-center items-center text-white">
                <img className="w-1/2 aspect-square" src={User} />
            </div>
            <div className="h-full aspect-square flex justify-center items-center text-white">
                <img className="w-1/2 aspect-square" src={Cart} />
            </div>
        </header>
    )
}