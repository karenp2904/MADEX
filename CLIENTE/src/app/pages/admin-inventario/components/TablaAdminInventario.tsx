import { Column, ColumnEditorOptions } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { IProduct } from "../../../../models/interfaces/IProduct";
import { ChangeEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { FilterMatchMode } from "primereact/api";

type TablaAdminiventarioProps = {
    products: IProduct[]
}

export function TablaAdminiventario({
    products: _products
}: TablaAdminiventarioProps) {

    const [products, setProducts] = useState<IProduct[]>(_products);
    const [statuses] = useState(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

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
        if(product.stock >= 10){
            product.status = 'INSTOCK';
        }else if(product.stock == 0){
            product.status = 'OUTOFSTOCK'
        } else if (product.stock < 10) {
            product.status = 'LOWSTOCK'
        }
        console.log(product)
        return <Tag value={product.status} severity={getEstado(product.status)}></Tag>;
    };

    const priceBodyTemplate = (product: IProduct) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price);
    };
    
    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
    });

    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </span>
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
        <DataTable
            header={renderHeader}
            filters={filters} 
            value={products}
            editMode="row"
            dataKey="id"
            onRowEditComplete={onRowEditComplete}
            tableStyle={{ minWidth: '50rem' }}
            globalFilterFields={['id']}
        >
            <Column field="id"              header="ID"   editor={(options) => textEditor(options)}   style={{ width: '10%' }}/>
            <Column field="name"            header="Nombre"   editor={(options) => textEditor(options)}   style={{ width: '20%' }}/>
            <Column field="stock"           header="Cantidad"   editor={(options) => textEditor(options)}   style={{ width: '20%' }}/>
            <Column field="inventoryStatus" header="Status" editor={(options) => statusEditor(options)} style={{ width: '20%' }} body={statusBodyTemplate}/>
            <Column field="price"           header="Precio"  editor={(options) => priceEditor(options)}  style={{ width: '20%' }} body={priceBodyTemplate}/>
            <Column header="Editar"rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}/>
        </DataTable>
    )

}