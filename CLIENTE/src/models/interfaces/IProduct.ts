export interface IProduct {
    id_producto: string;
    nombre: string;
    descripcion: string;
    precio: number;
    estado_producto: string;
    color: string;
    stock: number;
    descuento: number;
    idProveedor: number;
    idCategoria: number;
}