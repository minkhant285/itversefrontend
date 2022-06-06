export interface ProductInput {
    sku: string;
    item_name: string;
    unit_in_stock: number;
    unit_price: number;
    category_id: number;
    picture: string;
    description: string;
}

export interface Product extends ProductInput {
    stock_id: string;
    created_at?: Date;
    updated_at?: Date;
}
