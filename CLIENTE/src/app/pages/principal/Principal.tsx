
//import Footer from "@/components/Footer"
import SearchBar from "./components/SearchBarMain"
import SwipeCards from "./components/SwipeCards"


export const Principal = () => {




    return (

        <div>
            <div className="relative w-screen h-96 bg-auth bg-cover flex items-center justify-center">
                <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                <div className="z-10 text-center">
                    <div className="font-extrabold text-4xl pb-5">Bienvenidos a Madex</div>
                    <div className="text-ardilla font-bold">
                        Busca productos de alta calidad
                    </div>
                    <div className="mt-8">
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div>
                <div className=" text-3xl font-bold text-center pt-10 pb-3">
                    Productos destacados
                </div>
                <div className=" text-gray-600 font-semibold text-center pb-6">
                    Descubre nuestra selección

                </div>
                <div>
                    <SwipeCards />
                </div>
                <div className=" w-full h-[550px] p-16 drop-shadow-lg">
                    <div className="flex">
                        <div className="relative h-[400px] w-[400px]">
                            <img className="object-cover h-full rounded-lg" src="/descuento.jpg" alt="" />
                            <div className=" absolute bottom-0 left-0 h-10 w-40 py-2 rounded-tr-lg rounded-bl-lg bg-yellow-400 text-center">
                                <span className="font-bold text-white ">SUPER OFERTA</span>

                            </div>
                        </div>
                        <div className=" px-7">
                            <h1 className="font-extrabold text-4xl">Temporada de descuentos</h1>
                            <h6 className=" font-semibold text-sm pl-2 py-3">Ofertas que no te puedes perder</h6>
                            <div className="flex gap-4">
                                <div className="transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-80 w-64 bg-white rounded-xl">
                                    <div className=" h-3/4 w-full object-cover rounded-t-xl hover:">
                                        <img src="sala.jpg" alt="Sala de estar" className="rounded-t-xl h-full" />
                                    </div>
                                    <p className="font-bold justify-start pl-2 pt-1"> Renueva tu hogar con descuentos increíbles</p>

                                </div>
                                <div className="transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-80 w-64 bg-white rounded-xl">
                                    <div className=" h-3/4 w-full object-cover rounded-t-xl">
                                        <img src="entrada.jpg" alt="Sala de estar" className="rounded-t-xl h-full" />
                                    </div>
                                    <p className="font-bold justify-start pl-2 pt-1">Decora tu sala con nuestra selección</p>

                                </div>
                                <div className="transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-80 w-64 bg-white rounded-xl">
                                    <div className=" h-3/4 w-full object-cover rounded-t-xl">
                                        <img src="parque.jpg" alt="Sala de estar" className="rounded-t-xl h-full w-full" />
                                    </div>
                                    <p className="font-bold justify-start pl-2 pt-1">Explora opciones para el exterior</p>

                                </div>

                            </div>
                        </div>



                    </div>
                </div>

                <div className="">
                    <section className="bg-center bg-no-repeat bg-[url('wood-furniture.jpg')] bg-cover bg-gray-700 bg-blend-multiply">
                        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">¿Buscas algo único? Diseña tu mueble personalizado con nosotros.</h1>
                            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">¡Dale vida a tus ideas! Solicita tu mueble de madera personalizado hoy</p>
                            <form className="w-full max-w-md mx-auto pb-3">
                                <label htmlFor="default-email" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email sign-up</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0.641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input type="email" id="default-email" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white" placeholder="¡Contáctanos!" required />
                                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-ardilla hover:bg-gray-400  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                                </div>
                            </form>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-ardilla hover:bg-gray-600 focus:ring-4 focus:ring-ardilla-3 dark:focus:ring-blue-900">
                                    Explora
                                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                                <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                    Más info
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>

    )
}