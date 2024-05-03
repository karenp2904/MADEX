import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton
} from "@material-tailwind/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { IProduct } from "../models/interfaces/IProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type ProductCardProps = {
  product: IProduct
}

export function ProductCard({
  product
}: ProductCardProps) {

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/producto/CatalogoImagenes/${product.nombre}`)
      .then((res) => {
        if (res.data && res.data[0]) {
          setImage(res.data[0].base64)
        }
      })
  }, []);



  const handleAddFavorites = async () => {
    try {
      // Realizar la solicitud para agregar el producto al carrito
      console.log(product.id_producto);
      const response = await axios.post('http://localhost:3000/producto/agregarDestacados', {
        idProducto: product.id_producto,
        idUsuario: '1097490756',
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        console.log(data)
        // Si la solicitud se completa correctamente, mostrar el mensaje de éxito
        setMensaje('¡Producto agregado a favoritos!');
      } else {
        // Si hay algún problema con la solicitud, mostrar un mensaje de error
        setMensaje('Error al agregar a favoritos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error en la solicitud');
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/producto/CatalogoImagenes/${product.nombre}`)
      .then((res) => {
        if (res.data && res.data[0]) {
          setImage(res.data[0].base64)
        }
      })
  }, []);


  const [mensaje, setMensaje] = useState('');

  const handleAddToCart = async () => {
    try {
      // Realizar la solicitud para agregar el producto al carrito
      console.log(product.id_producto);
      const response = await axios.post('http://localhost:3000/carrito/agregar', {
        idUsuario: '1097490756',
        idProducto: product.id_producto,
        cantidad: '1'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        console.log(data)
        // Si la solicitud se completa correctamente, mostrar el mensaje de éxito
        setMensaje('¡Producto agregado al carrito!');
      } else {
        // Si hay algún problema con la solicitud, mostrar un mensaje de error
        setMensaje('Error al agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error en la solicitud');
    }
  };

  const handleCardClick = () => {
    // Navegar a la página de detalle del producto con el ID del producto como parámetro
    navigate(`/detalle?id=${product.id_producto}`);
  };

  return (
    <Card className="w-[226px] h-[308px] hover:cursor-pointer hover:shadow-2xl overflow-hidden flex shadow-xl rounded-3xl"onClick={handleCardClick}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex-1 m-0 rounded-none"
      >
        <img
          className="object-cover"
          src={image ? `data:image/jpeg;base64,${image}` : ""}
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody className="relative p-0 h-14">
        {(product.descuento && product.descuento > 0) && (
          <div className="absolute right-0 w-[101px] h-9 z-10 flex flex-col items-end">
            <div className="w-full h-5 bg-red-700 rounded-bl-2xl flex justify-center text-white text-sm">
              En Oferta
            </div>
            <div className="w-6 h-5 bg-red-100 text-[9px] flex justify-center items-center text-black">
              {product.descuento}%
            </div>
          </div>
        )}
        <div className="px-4 pt-2 pb-2">
          <Typography className="font-extrabold line-clamp-2">
            {product.nombre ? product.nombre : <Skeleton width={150} />}
          </Typography>
          <Typography>
            $ {product.precio} COP
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="h-7 flex items-center justify-start px-4">
        <IconButton
          variant="text"
          className="w-7 h-7"
          onClick={() => {
            setIsFavorite(f => !f);
            handleAddFavorites();
          }}
        >
          <i className={clsx("fas fa-heart fa-xl", { "text-red-700": isFavorite })} />
        </IconButton>
        <IconButton variant="text" className="w-7 h-7"onClick={handleAddToCart}>
            <i className="fa-solid fa-cart-plus fa-xl"></i>
        </IconButton>
        {mensaje && (
          <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
            <div className="bg-green-600 text-white rounded-md p-4 shadow-md flex justify-between items-center">
              <div>
                <span>{mensaje}</span>

              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}  
