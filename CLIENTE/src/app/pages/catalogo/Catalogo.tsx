import { useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import { IProduct } from "../../../models/interfaces/IProduct";
import { Button, Spinner } from "@material-tailwind/react";
import { Delay } from "../../../utils/Delay";

export const Catalogo = () => {

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);

  const productos: IProduct[] = [
    {
      "id": "001",
      "name": "Camisa de algodón",
      "price": 25.99,
      "discount": 0.15,
      "isFavorite": true
    },
    {
      "id": "002",
      "name": "Pantalones vaqueros ajustados",
      "price": 39.99,
      "discount": 0,
      "isFavorite": false
    },
    {
      "id": "003",
      "name": "Zapatos deportivos",
      "price": 49.99,
      "discount": 0,
      "isFavorite": true
    },
    {
      "id": "004",
      "name": "Bufanda de lana",
      "price": 12.5,
      "discount": 0.2,
      "isFavorite": false
    },
    {
      "id": "005",
      "name": "Gorra de béisbol",
      "price": 9.99,
      "discount": 0,
      "isFavorite": true
    },
    {
      "id": "006",
      "name": "Reloj de pulsera",
      "price": 79.99,
      "discount": 0.25,
      "isFavorite": false
    },
    {
      "id": "007",
      "name": "Mochila resistente al agua",
      "price": 29.99,
      "discount": 0,
      "isFavorite": true
    },
    {
      "id": "008",
      "name": "Gafas de sol polarizadas",
      "price": 59.99,
      "discount": 0,
      "isFavorite": false
    },
    {
      "id": "009",
      "name": "Chaqueta impermeable",
      "price": 69.99,
      "discount": 0,
      "isFavorite": true
    },
    {
      "id": "010",
      "name": "Cinturón de cuero",
      "price": 19.99,
      "discount": 0,
      "isFavorite": false
    }
  ];

  const addProducts = async () => {
    setLoading(true);
    await Delay(500);
    setProducts(p => [...p, ...productos]);
    setLoading(false);
  }

  return (
    <div className="w-full h-full py-4 flex justify-center">
      <div className="w-[76%]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-12">
          {
            products.map(product => (
              <div className="w-full h-full flex justify-center items-center">
                <ProductCard product={product} />
              </div>
            ))
          }
        </div>
        <div className="w-full h-24 flex justify-center items-center">
          <Button onClick={addProducts} className="w-44 h-12 text-[12px] bg-ardilla flex justify-center items-center" >
            {
              loading ? (
                <Spinner className="h-6 w-6" />
              ) : "Ver más productos"
            }
          </Button>
        </div>
      </div>
    </div>
  );
}