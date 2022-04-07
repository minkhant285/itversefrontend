import axios from "axios";
const endpointUrl = "products";

export async function getAllProducts() {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}`);
    return response.data;
}

export async function findProducts(searchKey: string) {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}/search/${searchKey}`);
    return response.data;
}
