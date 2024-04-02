import { useEffect, useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import { IProduct } from "../../../models/interfaces/IProduct";
import { Button, Spinner } from "@material-tailwind/react";
import { Delay } from "../../../utils/Delay";
import { useSearchParams } from "react-router-dom";

export const Catalogo = () => {

  const [search] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {

    const productos: IProduct[] = [
      {
          "id": "WP0",
          "name": "Oak Plank",
          "price": 50.00,
          "stock":   100,
          "status": "INSTOCK",
          "category": 1
      },
      {
          "id": "WP3",
          "name": "Maple Wood",
          "price": 40.00,
          "stock": 80,
          "status": "LOWSTOCK",
          "category": 2
      },
      {
          "id": "WP3",
          "name": "Birch Timber",
          "price": 45.00,
          "stock": 120,
          "status": "INSTOCK",
          "category": 3
      },
      {
          "id": "WP4",
          "name": "Pine Board",
          "price": 30.00,
          "stock": 60,
          "status": "OUTOFSTOCK",
          "category": 4
      }
    ];

    const categoria = search.get("categoria");

    if(!categoria) {
      return setProducts(productos);
    }

    setProducts(productos.filter(p => p.category === parseInt(categoria)));

  }, []);

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