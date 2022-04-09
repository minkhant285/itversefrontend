import axios from "axios";
import { ProductInput } from "../models";
const endpointUrl = "products";

export function addProduct(product: ProductInput) {
    axios
        .post(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}`, {
            sku: product.sku,
            item_name: product.item_name,
            unit_in_stock: product.unit_in_stock,
            unit_price: product.unit_price,
            buy_price: product.buy_price,
            category_id: product.category_id,
            picture: product.picture,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function login(email: string, password: string) {
    axios
        .post(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/auth/login`, {
            email, password
        })
        .then(function (response) {
            if (response.status === 201) {
                const token = response.data;
                console.log(token.access_token)
                localStorage.setItem('accessToken', token.access_token);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
