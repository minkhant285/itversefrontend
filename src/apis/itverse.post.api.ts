import axios from "axios";
import { ProductInput } from "../models";

const host = "192.168.100.5";
const port = 4000;
const endpointUrl = "products";

export function addProduct(product: ProductInput) {
    axios
        .post(`http://${host}:${port}/${endpointUrl}`, {
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
