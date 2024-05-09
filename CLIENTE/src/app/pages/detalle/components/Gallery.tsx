import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = ({ productName }) => {
    const [image, setImage] = useState(0);
    const [imagenes, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(http://localhost:3000/producto/ImagenesDetalle/${productName});
            
                if (response.status === 201) {
                    const respuesta: { imagenBase64: string }[] = response.data;
                    const imagenes: string[] = [];
                    if(respuesta.length<4){
                        for (let index = 0; index < respuesta.length; index++) {
                            imagenes.push(respuesta[index].imagenBase64);
                        
                        }   
                    }else{
                        for (let index = 0; index < 4; index++) {
                            imagenes.push(respuesta[index].imagenBase64);
                        
                        } 
                    }
                    
            
                    setImages(imagenes);
                } else {
                    console.error('Error al obtener las imágenes: Código de estado', response.status);
                }
            } catch (error) {
                console.error('Error al obtener las imágenes:', error);
            }
        };
    
        if (productName) {
            fetchImages();
        }
    
        // Aquí podrías considerar agregar más dependencias si es necesario
    }, [loading, productName]);
    

//pruebaa
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div>
                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div
                                className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                            >
                                {imagenes[image] ? (
                                    <img
                                        className="object-contain max-h-full max-w-full"
                                        src="data:image/jpeg;base64,${imagenes[image]}"
                                        alt="Gallery Image"
                                    />
                                ) : (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <Spinner className="w-12 aspect-square" />
                                    </div>
                                )}
                            </div>
                        </div>
    
                        <div className="flex -mx-2 mb-4">
                            {imagenes.map((img, i) => (
                                <div key={i} className="flex-1 px-2">
                                    <button
                                        className={`focus:outline-none w-20 h-20 p-2 rounded-lg bg-gray-100 flex items-center justify-center ${
                                            image === i ? "ring-2 ring-indigo-300 ring-inset" : ""
                                        }`}
                                        onClick={() => setImage(i)}
                                    >
                                        <img
                                            className="object-cover max-h-full max-w-full"
                                            src="{data:image/png;base64,${img}}"
                                            alt="Gallery Thumbnail"
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
}

export default Gallery;