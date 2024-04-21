import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { agregarProducto } from "../../../../services/productService";
import { IProductoGuardar } from "../../../../models/interfaces/IProductoGuardar";
import { IProduct } from "../../../../models/interfaces/IProduct";

interface ModalAgregarProductoProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    guardarProducto: (producto: IProduct) => void
}

export default function ModalAgregarProducto({
    visible, setVisible, guardarProducto
}: ModalAgregarProductoProps) {

    const [producto, setProducto] = useState<IProductoGuardar>({
        nombre: "",
        descripcion: "",
        precio: 0,
        estado_producto: "",
        color: "",
        stock: 0,
        descuento: 0,
        idProveedor: 2,
        idCategoria: 2
    });

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Agregar producto"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <div className="flex flex-col">

                    <InputText
                        placeholder="Nombre"
                        value={producto.nombre}
                        onChange={(e) => {
                            setProducto(p => ({...p, nombre: e.target.value}))
                        }}
                    ></InputText>
                    <InputText
                        placeholder="Descripcion"
                        value={producto.descripcion}
                        onChange={(e) => {
                            setProducto(p => ({...p, descripcion: e.target.value}))
                        }}
                    ></InputText>
                    <InputNumber
                        placeholder="Precio"
                        value={producto.precio}
                        onChange={(e) => {
                            setProducto(p => ({...p, precio: e.value ?? 0}))
                        }}
                    ></InputNumber>
                    <InputText
                        placeholder="Color"
                        value={producto.color}
                        onChange={(e) => {
                            setProducto(p => ({...p, color: e.target.value}))
                        }}
                    ></InputText>
                    <InputNumber
                        placeholder="Stock"
                        value={producto.stock}
                        onChange={(e) => {
                            setProducto(p => ({...p, stock: e.value ?? 0}))
                        }}
                    ></InputNumber>
                    <InputNumber
                        placeholder="Descuento"
                        value={producto.descuento}
                        onChange={(e) => {
                            setProducto(p => ({...p, descuento: e.value ?? 0}))
                        }}
                    ></InputNumber>
                    <Button
                        className="bg-green-200 flex justify-center items-center py-1"
                        onClick={() => {
                            agregarProducto(producto)
                                .then(() => {
                                    guardarProducto(({...producto, id_producto: "1"}));
                                })
                        }}
                    >Submit</Button>
                </div>
            </Dialog>
        </div>
    )
}
