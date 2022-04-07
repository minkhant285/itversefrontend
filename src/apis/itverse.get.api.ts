import axios from "axios";
import { Environment } from "./env";

const host = Environment.host;
const port = Environment.port;
const endpointUrl = "products";

export function getAllProducts() {
    return axios
        .get(`https://${host}/${endpointUrl}`)
        .then(function (response) {
            // handle success
            return response.data;
        });
}
