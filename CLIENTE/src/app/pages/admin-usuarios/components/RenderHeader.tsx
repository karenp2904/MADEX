import { InputText } from "primereact/inputtext";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const RenderHeader = ({
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    setFilters
}: {
    globalFilterValue: string,
    setGlobalFilterValue: Dispatch<SetStateAction<string>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: {[key: string]: any},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters: Dispatch<SetStateAction<{[key: string]: any}>>
}) => {

    const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };
        
        _filters['global'].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    return (
        <div className="flex justify-end outline-none">
            <span className="p-input-icon-left outline-none">
                <i className="pi pi-search outline-none" />
                <InputText
                    className="outline-none border-white"
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Buscar"
                />
            </span>
        </div>
    );
};
