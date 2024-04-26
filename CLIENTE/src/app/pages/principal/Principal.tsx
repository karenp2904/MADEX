
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
                    <SwipeCards/>
                </div>
                <div className="w-full h-96 p-16">
                    <div className="flex">
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div></div>

                    </div>
                </div>

                <div className="">
                    <section className="bg-center bg-no-repeat bg-[url('wood-furniture.jpg')] bg-cover bg-gray-700 bg-blend-multiply">
                        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"> Descubre la belleza y la calidad de nuestros productos</h1>
                            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Aquí en Madex elaboramos nuestros productos a mano con materiales naturales y sostenibles</p>
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
            <footer className="h-36 w-full bg-blue-gray-900">
                parte de:
            </footer>

        </div>

    )
}