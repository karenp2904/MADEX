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
  
  export type ProductCardProps = {
    product: IProduct
  }
  
  export function ProductCard({
    product
  }: ProductCardProps) {
  
    const [isFavorite, setIsFavorite] = useState(false);
  
    const [image, setImage] = useState<string|null>(null)

    useEffect(() => {
      axios.get(`http://localhost:3000/producto/Imagenes/${product.nombre}`)
        .then((res) => {
          if(res.data && res.data[0]){
            setImage(res.data[0].base64)
          }
        })
    }, []);

    return (
      <Card className="w-[226px] h-[308px] hover:cursor-pointer hover:shadow-2xl overflow-hidden flex shadow-xl rounded-3xl">
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
          {
            (product.descuento && product.descuento > 0) ? (
              <div className="absolute right-0 w-[101px] h-9 z-10 flex flex-col items-end">
                <div className="w-full h-5 bg-red-700 rounded-bl-2xl flex justify-center text-white text-sm">
                  En Oferta
                </div>
                <div className="w-6 h-5 bg-red-100 text-[9px] flex justify-center items-center text-black">
                  {product.descuento}%
                </div>
              </div>
            ) : ""
          }
          <div className="px-4 pt-2 pb-2">
            {
              product.nombre ? (
                <Typography className="font-extrabold" >
                  {product.nombre}
                </Typography>
              ) : (
                <div className="w-24">
                  <Skeleton />
                </div>
              )
            }
            {
              product ? (
                <Typography>
                  $ {product.precio} COP
                </Typography>
              ) : (
                <div className="w-32">
                  <Skeleton />
                </div>
              )
            }
          </div>
        </CardBody>
        <CardFooter className="h-7 flex items-center justify-start px-4 py-4">
          <IconButton
            variant="text"
            className="w-7 h-7"
            onClick={() => setIsFavorite(f => !f)}
          >
            <i className={clsx("fas fa-heart fa-xl", { "text-red-700": isFavorite })} />
          </IconButton>
          <IconButton variant="text" className="w-7 h-7">
            <i className="fa-solid fa-cart-plus fa-xl"></i>
          </IconButton>
        </CardFooter>
      </Card>
    );
  }