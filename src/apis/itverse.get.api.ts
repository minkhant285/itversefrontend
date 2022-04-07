import axios from "axios";

const host = "192.168.100.5";
const port = 4000;
const endpointUrl = "products";

export function getAllProducts() {
    return axios
        .get(`http://${host}:${port}/${endpointUrl}`)
        .then(function (response) {
            // handle success
            return response.data;
        });
}
