import NumberInput from "../../detalle/components/NumberInput"


const Item = () => {
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src="https://maderkit.vtexassets.com/arquivos/ids/166212-800-auto?v=638218472572600000&width=800&height=auto&aspect=true" alt="product-image" className="w-full rounded-lg sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900">Puerta madera melánimica</h2>
                                <h6 className="text-xs font-bold text-gray-900 py-2">100.000 COP</h6>
                                <div className=" py-1 flex">
                                    <h6 className="text-xs font-bold text-gray-900">Envío:</h6>
                                    <p className=" pl-1 text-xs text-gray-700"> 2 a 5 días hábiles</p>
                                </div>
                                <div className=" py-1 flex">
                                    <h6 className="text-xs font-bold text-gray-900">Stock:</h6>
                                    <p className=" pl-1 text-xs text-green-500 font-semibold">Disponible</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div className="flex items-center border-gray-100">
                                    <NumberInput />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <p className="text-sm">$200.000 COP</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
    )
};

export default Item;