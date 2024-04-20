import { Column, ColumnEditorOptions } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { IProduct } from "../../../../models/interfaces/IProduct";
import { ChangeEvent, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import ModalAgregarProducto from "./ModalAgregarProducto";

type TablaAdminiventarioProps = {
    products: IProduct[]
}

export function TablaAdminiventario({
    products: _products
}: TablaAdminiventarioProps) {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [statuses] = useState(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [verModal, setVerModal] = useState<boolean>(false);

    useEffect(() => {
        setProducts(_products);
    }, [_products])

    const getEstado = (value: string) => {
        switch (value) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const { newData, index } = e;
        console.log(newData)
        setProducts((products) => {
            products[index] = newData as IProduct;
            return [...products]
        });
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback!(e.target.value)}
            />
        )
    };

    const statusEditor = (options: ColumnEditorOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.editorCallback!(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getEstado(option)}></Tag>;
                }}
            />
        );
    };

    const priceEditor = (options: ColumnEditorOptions) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback!(e.value)}
                mode="currency"
                currency="COP"
                locale="es-CO"
            />
        );
    };

    const statusBodyTemplate = (product: IProduct) => {
        if (product.stock >= 10) {
            product.estado_producto = 'INSTOCK';
        } else if (product.stock == 0) {
            product.estado_producto = 'OUTOFSTOCK'
        } else if (product.stock < 10) {
            product.estado_producto = 'LOWSTOCK'
        }
        return <Tag value={product.estado_producto} severity={getEstado(product.estado_producto)}></Tag>;
    };

    const priceBodyTemplate = (product: IProduct) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.precio);
    };

    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
    });

    const renderHeader = () => {
        return (
            <div className="flex flex-col outline-none">
                <span className="mb-2 p-input-icon-left outline-none">
                    <i className="pi pi-search outline-none" />
                    <InputText
                        className="outline-none border-ardilla"
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </span>
                <Button
                    className="w-24 p-2 bg-green-200"
                    onClick={() => setVerModal(true)}
                >+ Agregar</Button>
            </div>
        );
    };

    const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    return (
        <>
            <DataTable
                header={renderHeader}
                filters={filters}
                value={products}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                tableStyle={{ minWidth: '50rem' }}
                globalFilterFields={['id_producto', 'nombre']}
            >
                <Column field="id_producto" header="ID" editor={(options) => textEditor(options)} style={{ width: '10%' }} />
                <Column field="nombre" header="Nombre" editor={(options) => textEditor(options)} style={{ width: '20%' }} />
                <Column field="stock" header="Cantidad" editor={(options) => textEditor(options)} style={{ width: '20%' }} />
                <Column field="inventoryStatus" header="Status" editor={(options) => statusEditor(options)} style={{ width: '20%' }} body={statusBodyTemplate} />
                <Column field="precio" header="Precio" editor={(options) => priceEditor(options)} style={{ width: '20%' }} body={priceBodyTemplate} />
                <Column header="Editar" rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>
            <ModalAgregarProducto
                visible={verModal}
                setVisible={setVerModal}
                guardarProducto={(nuevo) => {
                    setProducts(p => [nuevo, ...p])
                    setVerModal(false)
                }}
            />
        </>
    )

}