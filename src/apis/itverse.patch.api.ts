import axios from "axios";
import { ProductInput } from "../models";
const endpointUrl = "products";

export async function productUpdate(
    product_id: string | undefined,
    product: ProductInput
) {
    return await axios.patch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}/${product_id}`, {
            sku: product.sku,
            item_name: product.item_name,
            unit_in_stock: product.unit_in_stock,
            unit_price: product.unit_price,
            // buy_price: product.buy_price,
            category_id: product.category_id,
            picture: product.picture,
            description: product.description
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
}
