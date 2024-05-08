import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
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
        idProveedor: 0,
        idCategoria: 0
    });

    const handleChange = (e, field) => {
        const value = e.target.value;
        setProducto(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/producto/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setVisible(false);
            } else {
                console.error('Error al agregar el producto:', response.statusText);
                // Aquí puedes mostrar una notificación de error
            }
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            // Aquí puedes mostrar una notificación de error
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Agregar producto"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <div className="p-field">
                            <label className="label-background label-text" htmlFor="nombre">Nombre</label>
                            <InputText
                                id="nombre"
                                value={producto.nombre}
                                onChange={(e) => handleChange(e, 'nombre')}
                                style={{
                                    borderRadius: '0.25rem', /* Radio de borde */
                                    padding: '0.1em', /* Ajusta el padding según sea necesario */
                                    width: '100%', /* Ancho del componente */
                                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' /* Sombras */
                            }}
                            />
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field">
                            <label className="label-background label-text" htmlFor="descripcion">Descripción</label>
                            <InputText
                                id="descripcion"
                                value={producto.descripcion}
                                onChange={(e) => handleChange(e, 'descripcion')}
                                style={{
                                    borderRadius: '0.25rem', /* Radio de borde */
                                    padding: '0.1em', /* Ajusta el padding según sea necesario */
                                    width: '100%', /* Ancho del componente */
                                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' /* Sombras */
                            }}
                            />
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field">
                            <label className="label-background label-text" htmlFor="precio">Precio</label>
                            <InputNumber
                                id="precio"
                                value={producto.precio}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                onChange={(e) => {
                                    const newValue = e.value !== null ? e.value : 0;
                                    setProducto(prevState => ({ ...prevState, precio: newValue }));
                                }}
                                style={{
                                    borderRadius: '0.25rem', /* Radio de borde */
                                    padding: '0.1em', /* Ajusta el padding según sea necesario */
                                    width: '100%', /* Ancho del componente */
                                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' /* Sombras */
                            }}
                            />
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field">
                            <label className="label-background label-text" htmlFor="color">Color</label>
                            <InputText
                                id="color"
                                value={producto.color}
                                onChange={(e) => handleChange(e, 'color')}
                                style={{
                                    borderRadius: '0.25rem', /* Radio de borde */
                                    padding: '0.1em', /* Ajusta el padding según sea necesario */
                                    width: '100%', /* Ancho del componente */
                                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' /* Sombras */
                            }}
                            />
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field">
                            <label className="label-background label-text" htmlFor="stock">Stock</label>
                            <InputNumber
                                id="stock"
                                value={producto.stock}
                                onChange={(e) => {
                                    const newValue = e.value !== null ? e.value : 0;
                                    setProducto(prevState => ({ ...prevState, stock: newValue }));
                                }}
                                style={{
                                    borderRadius: '0.25rem', /* Radio de borde */
                                    padding: '0.1em', /* Ajusta el padding según sea necesario */
                                    width: '100%', /* Ancho del componente */
                                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' /* Sombras */
                            }}
                            />
                        </div>
                    </div>
                    <div className="p-col-1">
                        <div className="p-field">
                            <label className="label-background label-text" htmlFor="descuento">Descuento (%)</label>
                            <InputNumber
                                id="descuento"
                                value={producto.descuento}
                                suffix="%"
                                onChange={(e) => {
                                    const newValue = e.value !== null ? e.value : 0;
                                    setProducto(prevState => ({ ...prevState, descuento: newValue }));
                                }}
                                style={{
                                    //border: '2px solid #A67C5D', /* Estilo del borde */
                                    borderRadius: '0.25rem', /* Radio de borde */
                                    padding: '0.1em', /* Ajusta el padding según sea necesario */
                                    width: '100%', /* Ancho del componente */
                                    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' /* Sombras */
                                    
                            }}
                            />
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-field p-grid p-justify-end">
                            <div className="p-col-3">
                                <Button
                                    onClick={handleSubmit}
                                    label="Agregar"
                                    className="p-button-success p-button-rounded p-button-text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}    

