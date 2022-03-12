import axios from "axios";
import { ProductInput } from "../models";

const host = "127.0.0.1";
const port = 4000;
const endpointUrl = "products";

export function productUpdate(
    product_id: string | undefined,
    product: ProductInput
) {
    axios
        .patch(`http://${host}:${port}/${endpointUrl}/${product_id}`, {
            sku: product.sku,
            item_name: product.item_name,
            unit_in_stock: product.unit_in_stock,
            unit_price: product.unit_price,
            buy_price: product.buy_price,
            category_id: product.category_id,
            picture: product.picture,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
