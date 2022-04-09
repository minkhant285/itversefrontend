import axios from "axios";

export async function deleteProduct(pid: string | undefined) {
    console.log(await localStorage.getItem('accessToken'));

    axios.delete(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/products/${pid}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
        .then(function (response) {
            if (response.status === 201) {
                console.log(response)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
