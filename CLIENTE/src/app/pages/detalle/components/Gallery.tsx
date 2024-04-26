import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export interface GalleryProps {
    imagenes: {
        nombre: string
        base64: string
    }[]
}


const Gallery = ({
    imagenes
}: GalleryProps) => {

    const [image, setImage] = useState(0)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div>
                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div
                                className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center`}
                            >
                                {
                                    imagenes[image] ? (
                                        <img
                                            className="object-cover"
                                            src={`data:image/jpeg;base64,${imagenes[image].base64}`}
                                            alt={imagenes[image].nombre}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <Spinner className="w-12 aspect-square" />
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="flex -mx-2 mb-4">
                            {imagenes.map((img, i) => (
                                <div key={i} className="flex-1 px-2">
                                    <button
                                        className={`focus:outline-none w-full rounded-lg h-15 md:h-20 bg-gray-100 flex items-center justify-center ${image === i ? "ring-2 ring-indigo-300 ring-inset" : ""
                                            }`}
                                        onClick={() => setImage(i)}
                                    >
                                        <img
                                            className="object-cover"
                                            src={`data:image/jpeg;base64,${img.base64}`}
                                            alt={img.nombre}
                                        />
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