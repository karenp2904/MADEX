import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton
  } from "@material-tailwind/react";
  import clsx from "clsx";
  import { useState } from "react";
  import Skeleton from "react-loading-skeleton";
  import { IProduct } from "../models/interfaces/IProduct";
  
  export type ProductCardProps = {
    product: IProduct
  }
  
  export function ProductCard({
    product
  }: ProductCardProps) {
  
    const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  
    return (
      <Card className="w-[226px] h-[308px] hover:cursor-pointer hover:shadow-2xl overflow-hidden flex shadow-xl rounded-3xl">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex-1 m-0 rounded-none"
        >
          <img
            src="https://th.bing.com/th/id/R.e80e6eae9edd3effa8d354b65e6ca3ee?rik=%2fyL4PDOz5p60OA&riu=http%3a%2f%2fwww.mueblesbongiorno.com.ar%2fImagenes_Productos%2fmelina2-1.jpg&ehk=YhFl%2bbozFSpUAvDdNv%2bKusWlg997NqiIg69M%2fXniJVE%3d&risl=&pid=ImgRaw&r=0"
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody className="relative p-0 h-14">
          {
            product.discount > 0 && (
              <div className="absolute right-0 w-[101px] h-9 z-10 flex flex-col items-end">
                <div className="w-full h-5 bg-red-700 rounded-bl-2xl flex justify-center text-white text-sm">
                  En Oferta
                </div>
                <div className="w-6 h-5 bg-red-100 text-[9px] flex justify-center items-center text-black">
                  {product.discount * 100}%
                </div>
              </div>
            )
          }
          <div className="px-4 pt-0 pb-0">
            {
              product.name ? (
                <Typography className="font-extrabold" >
                  {product.name}
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
                  $ {product.price} COP
                </Typography>
              ) : (
                <div className="w-32">
                  <Skeleton />
                </div>
              )
            }
          </div>
        </CardBody>
        <CardFooter className="h-7 flex items-center justify-start px-4">
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