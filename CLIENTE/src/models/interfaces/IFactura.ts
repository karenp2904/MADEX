export interface IFactura {
    Id_direccion: number;
    fecha: string;
    id_factura: number;
    id_producto: number[];
    id_usuario: number;
    metodo_pago: number;
    total: string;
}
