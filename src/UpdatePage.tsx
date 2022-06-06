import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductById } from './apis';
import { Product } from './models';
import UpdateForm from './updateForm';
const UpdatePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const paramData = searchParams.get("pid") || "";
    const [product, setProduct] = useState<Product>({
        // buy_price:0.0,
        category_id:0,
        description:"",
        item_name:'',
        picture:'',
        sku:'',
        stock_id:'',
        unit_in_stock:0,
        unit_price:0.0,
    });

    React.useEffect(() => {
        if (paramData) {
            getProductById(paramData).then((result) => {
                console.log(result)
                if (JSON.stringify(product) !== JSON.stringify(result)) {
                    setProduct(result);
                }
            });
        };
    }, [product]);

    return <>{product.stock_id !=='' && <UpdateForm product={product}  />} </>

}

export default UpdatePage;
