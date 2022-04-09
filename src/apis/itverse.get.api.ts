import axios from "axios";
const endpointUrl = "products";

export async function getAllProducts(page: number) {
    console.log(await localStorage.getItem('accessToken'));
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

export async function findProducts(searchKey: string) {
    const response = await axios
        .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${endpointUrl}/search/${searchKey}`);
    return response.data;
}
