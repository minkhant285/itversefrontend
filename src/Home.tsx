import React, { useEffect, useState } from "react";
import "./App.css";
import { countAllProducts, getAllProducts } from "./apis";
import { Product } from "./models";
import {
    Card,
    Column,
    ProductContainer,
    ProductWrapper,
    Row,
    Text,
} from "./styled";
import UpdateForm from "./updateForm";
import { Button, Input, Modal, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState<Product[]>();
    const [totoalProducts, setTotalProducts] = useState<number>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [page, setPage] = useState<number>(1);

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // console.log("effect called");
        countAllProducts().then((r) => {
            setTotalProducts(r);
        });
        getAllProducts(page).then((r) => {
            if (JSON.stringify(products) !== JSON.stringify(r)) {
                setProducts(r);
            }
        });
    }, [show, page, totoalProducts, products]);

    const ModalComp = () => (
        <Modal
            centered
            title="Update Product"
            style={{ height: "fit-content" }}
            visible={show}
            onOk={handleClose}
            onCancel={handleClose}
            footer={<></>}
        >
            <UpdateForm product={selectedProduct} setShow={setShow} />
        </Modal>
    );

    function GetSortOrder(prop: string) {
        return function (a: any, b: any) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        };
    }

    return (
        <div
            style={{
                flex: 1,
                flexDirection: "column",
                display: "flex",
                overflow: "auto",
            }}
        >
            <ProductWrapper>
                <ProductContainer>
                    {products?.map((res) => (
                        <Card
                            key={res.stock_id}
                            onClick={() => {
                                navigate(`/product/?pid=${res.stock_id}`);
                                // let userData: any = jwt_decode(
                                //     localStorage.getItem("accessToken") || ""
                                // );

                                // if (userData.role === "admin") {
                                //     if (
                                //         (new Date(userData.exp * 1000) >
                                //             new Date(),
                                //         new Date(
                                //             userData.exp * 1000
                                //         ).toLocaleString())
                                //     ) {
                                //         console.log("token expired");
                                //         // JSON.stringify(selectedProduct) !==
                                //         //     JSON.stringify(res) &&
                                //         //     setSelectedProduct(res);
                                //         // handleShow();
                                //     }
                                // } else {
                                //     console.log("Admin permission required");
                                // }
                            }}
                        >
                            <Column>
                                <img
                                    src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${res.stock_id}.jpg`}
                                    width={130}
                                    height={150}
                                    alt={""}
                                    style={{
                                        objectFit: "contain",
                                        alignSelf: "center",
                                    }}
                                />

                                <Text>{res.item_name}</Text>

                                <Row
                                    justify="space-between"
                                    padding="10px 0px 10px 0px"
                                >
                                    {res.unit_in_stock > 0 ? (
                                        <Text color="green">In Stock</Text>
                                    ) : (
                                        <Text color="red">Out of Stock</Text>
                                    )}

                                    <Text>{res.unit_price} MMK</Text>
                                </Row>
                            </Column>
                        </Card>
                    ))}
                </ProductContainer>
                <ModalComp />

                {products && (
                    <div
                        style={{
                            flexDirection: "row",
                            display: "flex",
                            alignSelf: "center",
                            margin: "10px 0px",
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((val: number) => (
                            <Button
                                size="small"
                                onClick={() => {
                                    setPage(val);
                                }}
                                type={val === page ? "primary" : "default"}
                            >
                                page {val}
                            </Button>
                        ))}
                    </div>
                )}
            </ProductWrapper>
        </div>
    );
}

export default Home;
