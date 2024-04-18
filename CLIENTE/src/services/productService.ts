import { IProduct } from "../models/interfaces/IProduct";
import { IProductoGuardar } from "../models/interfaces/IProductoGuardar";
import axios from "axios";

const host = "http://localhost:3000";


export async function agregarProducto(producto: IProductoGuardar) {
    const response = await axios.post(host + "/producto/agregar", producto);
    console.log(response.data);
}

interface ObtenerProductosResponse {
    productos: IProduct[]
}

export async function obtenerProductos(): Promise<ObtenerProductosResponse> {
    const response = await axios.get<ObtenerProductosResponse>(host + "/producto/inventario");
    return response.data;
}