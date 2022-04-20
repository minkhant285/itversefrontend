import { Button, Modal } from "antd";
import React, { useState } from "react";
import { countAllProducts, getAllProducts } from "../apis";
import { Product, ProductCategory } from "../models";
import { ClampText, Column, Row, Text } from "../styled";
import UpdateForm from "../updateForm";
import { range } from "../utils/Range";
import { sortItems } from "../utils/sortAz";

function ProductList() {
    const [products, setProducts] = useState<Product[]>();
    const [totoalProducts, setTotalProducts] = useState<number>(0);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [showModal, setShow] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const handleClose = () => {
        setShow(false);
        setSelectedProduct(undefined);
    };

    React.useEffect(() => {
        countAllProducts().then((r) => {
            setTotalProducts(r);
        });
        getAllProducts(page).then((r) => {
            if (JSON.stringify(products) !== JSON.stringify(r)) {
                setProducts(r);
            }
        });
    }, [page, totoalProducts, showModal]);

    React.useEffect(() => {
        console.log(selectedProduct);
    }, [selectedProduct]);

    const Dialog = () => (
        <Modal
            centered
            title="Update Product"
            style={{ height: "fit-content" }}
            visible={showModal}
            onOk={handleClose}
            onCancel={handleClose}
            footer={<></>}
        >
            <UpdateForm product={selectedProduct} setShow={setShow} />
        </Modal>
    );

    return (
        <Column flex={1} style={{ overflow: "auto", height: "88vh" }}>
            <Row>Products</Row>
            <Column flex={1} style={{ overflow: "auto", height: "88vh" }}>
                <Row flex={1} justify="space-between" bgcolor="#237ad1">
                    <Text color="#fff">Photo</Text>
                    <Text
                        color="#fff"
                        style={{ width: "30%", textAlign: "center" }}
                    >
                        Name
                    </Text>
                    <Text color="#fff" style={{ textAlign: "center" }}>
                        Category
                    </Text>
                    <Text color="#fff">Unit Price</Text>
                </Row>
                {products?.sort(sortItems).map((product) => (
                    <Row
                        key={product.stock_id}
                        flex={1}
                        justify="space-between"
                        bgcolor="#fff"
                        onClick={() => {
                            setSelectedProduct(product);
                            setShow(true);
                        }}
                        style={{ marginBottom: "2px", cursor: "pointer" }}
                    >
                        <img
                            src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${product.stock_id}.jpg`}
                            width={60}
                            height={60}
                            alt={product.item_name}
                            style={{
                                objectFit: "contain",
                                alignSelf: "center",
                                justifySelf: "center",
                            }}
                        />
                        <div style={{ width: "30%" }}>
                            <ClampText
                                id="itname"
                                text={product.item_name}
                                lines={2}
                                buttons={false}
                            />
                        </div>
                        <Row>
                            <span
                                style={{
                                    backgroundColor: "green",
                                    borderRadius: "8px",
                                    padding: "0px 8px",
                                    alignSelf: "center",
                                }}
                            >
                                <Text
                                    color="white"
                                    size={"0.6em"}
                                    fWeight="bold"
                                    style={{ textTransform: "uppercase" }}
                                >
                                    {ProductCategory[product.category_id]}
                                </Text>
                            </span>
                        </Row>
                        <Text style={{ justifySelf: "end" }}>
                            {product.unit_price} MMK
                        </Text>
                    </Row>
                ))}

                {products && (
                    <Row flex={1} spacing="2px" justify="center">
                        {range(Math.ceil(totoalProducts / 30)).map(
                            (val: number) => (
                                <Button
                                    key={val}
                                    size="small"
                                    onClick={() => {
                                        setProducts(undefined);
                                        setPage(val);
                                    }}
                                    type={val === page ? "primary" : "default"}
                                >
                                    {val}
                                </Button>
                            )
                        )}
                    </Row>
                )}
            </Column>
            {<Dialog />}
        </Column>
    );
}

export default ProductList;
