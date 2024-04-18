import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";
import { Router } from "../../router/Router";

export const Login = () => {
    return (
        <div
            className="w-full h-full bg-cover bg-auth flex justify-center items-center"
        >
            <div
                className="relative flex flex-col w-96 h-[500px] rounded-3xl bg-secondary-color px-10"
                style={{
                    boxShadow: "-5px 5px 2.5px gray"
                }}
            >
                <div className="absolute left-4 top-4">
                    <img className="w-12" src={Arrow} />
                </div>
                <div className="flex-1 ">
                    <img className="max-h-full" src={Logo} />
                </div>
                <div className="w-full h-24 flex justify-center items-center">

                    <div className="w-full flex flex-col">
                        <label
                            htmlFor="email"
                            className="text-primary-color"
                        ><strong>Usuario</strong></label>
                        <input
                            name="email"
                            className=" outline-none  indent-10 bg-[length:1.5rem] bg-[10px] bg-user bg-no-repeat h-12 rounded-xl placeholder:text-primary-color"
                            placeholder="Correo electrónico"
                            style={{
                                boxShadow: "-2px 2px 2px gray"
                            }}
                            type="email"
                        />
                    </div>
                </div>
                <div className="w-full h-24">
                    <div className="w-full flex flex-col">
                        <label
                            htmlFor="password"
                            className="text-primary-color"
                        ><strong>Contraseña</strong></label>
                        <input
                            name="password"
                            className="outline-none indent-10 bg-[length:1.5rem] bg-[10px] bg-lock bg-no-repeat h-12 rounded-xl placeholder:text-primary-color"
                            placeholder="Contraseña"
                            style={{
                                boxShadow: "-2px 2px 2px gray"
                            }}
                            type="password"
                        />
                    </div>
                </div>
                <div className="w-full h-28">
                    <strong>
                        <a
                            className="underline text-[12px] text-primary-color"
                            href=""
                        >Olvidé mi contaseña</a>
                    </strong>
                    <div className="flex justify-center items-center">
                        <button
                            className="w-28 h-8 text-[14px] rounded-3xl bg-primary-color text-white"
                            style={{
                                boxShadow: "-2px 2px 2px gray"
                            }}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <strong>
                            <a
                                className="underline text-[12px] text-primary-color"
                                href={Router.register}
                            >¿No tienes cuenta? Regístrate aquí</a>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    )
}