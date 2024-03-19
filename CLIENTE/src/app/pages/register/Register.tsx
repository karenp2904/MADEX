import Logo from "/icon/icon-primary.svg";
import Arrow from "/arrow/arrow-left-primary.svg";
import { Router } from "../../router/Router";

export const Register = () => {

    const Input = ({
        name, label
    }: { name?: string, label?: string }) => {
        return (
            <div className="w-full h-22 mb-2">
                <div className="w-full flex flex-col">
                    <label
                        htmlFor={name}
                        className="text-primary-color text-sm font-semibold"
                    >{label}</label>
                    <input
                        name={name}
                        className="indent-2 h-8 rounded-xl placeholder:text-primary-color"
                        style={{
                            boxShadow: "-2px 2px 2px gray"
                        }}
                        type=""
                    />
                </div>
            </div>
        )
    }

    return (
        <div
            className="w-full h-[900px] mb-10 flex justify-center items-center"
        >
            <div
                className="relative flex flex-col w-96 h-[800px] rounded-3xl bg-secondary-color px-10"
                style={{
                    boxShadow: "-5px 5px 2.5px gray"
                }}
            >
                <div className="absolute left-4 top-4">
                    <img className="w-12" src={Arrow} />
                </div>
                <div className="h-48 flex justify-center items-center">
                    <img className="max-h-full" src={Logo} />
                </div>
                <Input name="name" label="Nombres" />
                <Input name="second_name" label="Apellidos" />
                <Input name="doc_type" label="Tipo de Documento" />
                <Input name="document" label="Número de Documento" />
                <Input name="phone" label="Teléfono" />
                <Input name="email" label="Correo electrónico" />
                <Input name="password" label="Contraseña" />
                <Input name="confirm_password" label="Confirmar contraseña" />
                <div className="w-full h-32">
                    <div className="text-[8px] flex">
                        <div className="w-6 flex justify-center items-center">
                            <input className="scale-110" type="checkbox" />
                        </div>
                        <span className="text-primary-color">
                            Acepto los <span className="text-black font-bold">Términos y Condiciones</span> y Autorizo el <span className="text-black font-bold">Tratemiento de mis Datos Personales</span> de MADEX S.A
                        </span>
                    </div>
                    <div className="w-full h-14 flex justify-center items-center">
                        <button
                            className="w-28 h-8 text-[14px] rounded-3xl bg-primary-color text-white"
                            style={{
                                boxShadow: "-2px 2px 2px gray"
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <strong>
                            <a
                                className="underline text-[12px] text-primary-color"
                                href={Router.registeEmpresa}
                            >Crear cuenta de empresa</a>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    )
}