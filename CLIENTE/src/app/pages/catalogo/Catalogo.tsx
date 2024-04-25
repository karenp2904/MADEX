import { useEffect, useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import { IProduct } from "../../../models/interfaces/IProduct";
import { Button, Spinner } from "@material-tailwind/react";
import { Delay } from "../../../utils/Delay";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Navigator } from "../../../components/Navigator";
import { Link } from "react-router-dom";

export const Catalogo = () => {

  const [search] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [todosProductos, setTodosProductos] = useState<IProduct[]>([]);
  const [actual, setActual] = useState(0);
  const [productos, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/producto/catalogo")
      .then((res) => {
        let productos = res.data.productos as IProduct[];
        const categoria = search.get("categoria");
        if (categoria) {
          productos = productos.filter(p => p.idCategoria === parseInt(categoria));
        }

        setTodosProductos(productos);
        setActual(10);
        setProducts(productos.slice(0, 10));

      });
  }, []);

  const addProducts = async () => {
    setLoading(true);
    await Delay(500);
    setProducts(p => [...p, ...todosProductos.slice(actual, actual + 10)]);
    setActual(a => a+10);
    setLoading(false);
  }
  return (
    <div className="w-full h-full flex flex-col">
      <Navigator
        rutas={["Catalogo"]}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-12">
        {
        productos.map(product => (
          <div className="w-full h-full flex justify-center items-center my-4">
            <ProductCard product={product} />
          </div>
        ))
        }
      </div>
      <div className="w-full h-24 flex justify-center items-center">
        <Button onClick={addProducts} className="w-44 h-12 text-[12px] bg-ardilla flex justify-center items-center m-6" >
          {
            loading ? (
              <Spinner className="h-6 w-6" />
            ) : "Ver más productos"
          }
        </Button>
      </div>
    </div>
  );
}