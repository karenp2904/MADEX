export const UserCuenta = () => {
    const Opcion = ({
        nombre, className
    }: {nombre: string, className?: string}) => {
        return (
            <div
                className={`${className} text-lg hover:text-gray-300 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat`}
            >
                <strong>{nombre}</strong>
            </div>
        )
    }


    return (
        <div className="container flex p-4">
            <div className="m-5 bg-marron shadow-xl rounded-large w-60 h-screen">
                <div className="grid-cols-1 m-5 grid gap-y-8 text-white my-10">
                    <Opcion nombre="Cuenta" className="bg-userw"/>
                    <Opcion nombre="Pedidos" className="bg-pedidos"/>
                    <Opcion nombre="Favoritos" className="bg-fav"/>
                    <Opcion nombre="Historial" className="bg-historial"/>
                </div>
            </div>
            <div className="bg-white shadow-xl w-full h-auto rounded-xl m-5">

            </div>
        </div>
    )
}