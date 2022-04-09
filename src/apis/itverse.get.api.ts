import axios from "axios";
import { Product } from "../models";
const endpointUrl = "products";

export async function getAllProducts(page: number) {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}/page/${page}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }

            });
    return response.data;
}

export async function countAllProducts() {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}`, {

        });
    return response.data;
}

export async function findProducts(searchKey: string): Promise<Product[]> {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}/search/${searchKey}`);
    return response.data;
}

export async function getProductById(pid: string): Promise<Product> {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}/${pid}`);
    return response.data;
}
