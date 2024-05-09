import Logo from "/LogoFinal.svg";
import User from "/user.svg";
import Menu from "/menu-hamburguesa.svg";
import Cart from "/carrito-de-compras.svg";
import { useNavigate } from "react-router-dom";
import { Router } from "../app/router/Router";
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';

export const NavBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const user = useAuth(s => s.user);
    const navigate = useNavigate();

    const handleIconClick = () => {
        if (!user) {
            // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
            navigate('/login');
        } else {
            // Si el usuario ha iniciado sesión, redirigir a su cuenta
            navigate('/user-cuenta');
        }
    };

    return (
        <header className="sticky w-full h-14 bg-primary-color flex justify-evenly">
            <div className="h-full aspect-square flex justify-center items-center hover:cursor-pointer">
                <img className="w-1/2 aspect-square" src={Menu} />
            </div>
            <div className="flex-[1 flex p-1">
                <img className="w-1/2 aspect-square" src={Logo} />
            </div>
            <div
                className=" font-semibold w-auto text-sm flex justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
                onClick={() => navigate(Router.principal)}
            >
                <span>Inicio</span>
            </div>
            <div
                className=" font-semibold w-auto text-sm flex justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
                onClick={() => navigate(Router.categorias)}
            >
                <span>Categorías</span>
            </div>
            <div
                className=" font-semibold w-auto text-sm flex justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
                onClick={() => navigate(Router.catalogo)}
            >
                <span>Productos</span>
            </div>
            <div className=" font-semibold w-auto text-sm flex justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
                onClick={() => navigate(Router.catalogo)}
            >
                <span>Sobre Nosotros</span>

            </div>
            <div className="w-42 flex justify-end items-center text-white hover:cursor-pointer hover:text-gray-300">
                <input
                    className="bg-[length:0.8rem] bg-[18px] bg-buscar bg-no-repeat outline-none indent-10 bg-transparent placeholder:text-white text-white w-96 border-2 border-white rounded-md"
                    type="text"
                    placeholder="Buscar en el sitio"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            navigate(`/catalogo?q=${searchTerm}`)
                        }
                    }}
                />
            </div>
            <div className="w-8 h-full aspect-square flex justify-center items-center text-white hover:cursor-pointer" onClick={() => handleIconClick()}>
                <img className="w-3/4 aspect-square hover:scale-110" src={User} />
            </div>
            <div className="w-8 h-full aspect-square flex justify-center items-center text-white hover:cursor-pointer" onClick={() => navigate(Router.carrito)}>
                <img className="w-3/4 aspect-square hover:scale-110" src={Cart} alt="Icono de carrito" />
            </div>
        </header>
    )
}