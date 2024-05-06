import React, { useState, useEffect } from "react";

const Gallery = ({ productName }) => {
    const [image, setImage] = useState(1);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`http://localhost:3000/producto/CatalogoImagenes/${productName}`);
                if (response.ok) {
                    const data = await response.json();
                    //setImages(data.imagenes); // Suponiendo que la respuesta del servidor contiene un arreglo de imágenes
                } else {
                    console.error('Error al obtener las imágenes del producto');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        if (productName) {
            fetchImages();
        }
    }, [productName]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div>
                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${image === i ? "" : "hidden"
                                        }`}
                                >
                                    <span className="text-5xl">{i}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex -mx-2 mb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex-1 px-2">
                                    <button
                                        className={`focus:outline-none w-full rounded-lg h-15 md:h-20 bg-gray-100 flex items-center justify-center ${image === i ? "ring-2 ring-indigo-300 ring-inset" : ""
                                            }`}
                                        onClick={() => setImage(i)}
                                    >
                                        <span className="text-2xl">{i}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    );
};

export default Gallery;
