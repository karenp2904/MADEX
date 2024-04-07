export interface IProduct {
    id: string;
    name: string;
    price: number;
    stock: number;
    status: string;
    category?: number;
    //quantity: number;
    discount?: number;
    isFavorite?: boolean;
}