import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductById } from "./apis";
import { Product } from "./models";
import { Column } from "./styled";

const ProductDetail: React.FC = () => {
    const [product, setProduct] = useState<Product>();
    const [searchParams, setSearchParams] = useSearchParams();
    const paramData = searchParams.get("pid") || "";
    React.useEffect(() => {
        if (paramData) {
            getProductById(paramData).then((result) => {
                if (JSON.stringify(product) !== JSON.stringify(result)) {
                    setProduct(result);
                }
            });
        }
    }, [product, paramData]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                padding: "10px",
            }}
        >
            <img
                src={product?.picture}
                width={300}
                height={300}
                alt={product?.stock_id}
            />
            <Column style={{ margin: "20px" }}>
                <span>{product?.item_name}</span>
                <span> Price : {product?.unit_price} MMK</span>
                <span> Stock : {product?.unit_in_stock} </span>
                <span> Specification : {product?.sku} </span>
            </Column>
        </div>
    );
};

export default ProductDetail;
