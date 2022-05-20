import { Button, Modal } from "antd";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import { getProductById } from "./apis";
import { Product } from "./models";
import { Column, ProductDetailContainer } from "./styled";
import UpdateForm from "./updateForm";

const ProductDetail: React.FC = () => {
    const [product, setProduct] = useState<Product>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);

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
        <>
            <ProductDetailContainer>

                <div style={{ gridColumn: 1 / 4 }}>
                    <LazyLoadImage
                        placeholderSrc={"https://us.123rf.com/450wm/lishchyshyn/lishchyshyn1904/lishchyshyn190403199/132862735-vector-loading-icon-futuristic-progress-design.jpg?ver=6"}
                        src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${product?.stock_id}.jpg`}
                        width={'100%'}
                        height={250}
                        style={{ objectFit: "contain" }}
                        alt={product?.stock_id}
                    />
                </div>
                <Column style={{ margin: "20px 10px" }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3em' }}>{product?.item_name}</span>
                    <span> Price : {product?.unit_price} MMK</span>
                    <span> Stock : {product?.unit_in_stock} </span>
                    {localStorage.getItem("accessToken") && (
                        <span> Buy Price : {product?.buy_price} USD </span>
                    )}
                    <span> Description : {product?.description} </span>
                    {localStorage.getItem("accessToken") && (
                        <Button onClick={() => setShow(true)}>Update</Button>
                    )}
                </Column>

            </ProductDetailContainer>
            <Modal
                centered
                title="Update Product"
                style={{ height: "fit-content" }}
                visible={showModal}
                onOk={handleClose}
                onCancel={handleClose}
                footer={<></>}
            >
                <UpdateForm product={product} setShow={setShow} />
            </Modal>
        </>
    );
};

export default ProductDetail;
