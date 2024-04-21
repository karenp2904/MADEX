import Item from "./components/Item"

export const Carrito = () => {
    return (
        <div className="flex justify-center">
            <div className="pt-6">
                <h1 className=" font-bold text-2xl">
                    Carrito de compras
                </h1>
                <div className=" bg-white h-[500px] w-[990px] rounded-xl p-7 mt-7 drop-shadow-md">
                    <div className="flex">
                        <div className=" flex flex-col rounded-lg md:w-2/3">
                            <Item />
                            <Item />
                        </div>
                        <div className="flex flex-col px-6">
                            <div className="flex">
                                <p className=" p-4 text-ardilla font-bold text-lg">
                                    Subtotal:
                                </p>
                                <p className=" pt-4 pr-4 text-black font-semibold text-lg">
                                    $400.000 COP
                                </p>
                            </div>
                            <div className="px-2">
                                <button className="bg-ardilla text-white font-semibold rounded-lg p-2 w-full">
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
                <div className="flex w-full">
                    <div className="text-ardilla font-bold py-4 text-2xl">
                        Subtotal:
                    </div>
                    <div className=" justify-self-end p-4 text-xl font-semibold">
                        $400.000 COP
                    </div>
                    <button className=" bg-gray-400 rounded-lg p-2 m-2 font-bold">
                        Seguir comprando
                    </button>
                    <button className="bg-ardilla rounded-lg p-3 m-2 font-bold text-white flex">
                        Pagar
                        <svg className="px-" fill="white" xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" /><path d="M22.984,6.018A3.675,3.675,0,0,0,20.364,5H5.654L5.391,2.938A3.328,3.328,0,0,0,2.087,0H1.5A1.5,1.5,0,0,0,0,1.5H0A1.5,1.5,0,0,0,1.5,3h.587a.331.331,0,0,1,.326.3l1.5,11.759A3.327,3.327,0,0,0,7.217,18H17.339a5.5,5.5,0,0,0,5.3-4.042l1.246-4.531A3.489,3.489,0,0,0,22.984,6.018ZM19.75,13.163A2.508,2.508,0,0,1,17.339,15H7.217a.329.329,0,0,1-.325-.3L6.037,8H20.514A.5.5,0,0,1,21,8.632Z" /></svg>
                    </button>

                </div>

            </div>
        </div>

    )
}