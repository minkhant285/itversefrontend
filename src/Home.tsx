import React, { useEffect, useState } from "react";
import "./App.css";
import { countAllProducts, findProducts, getAllProducts } from "./apis";
import { Product } from "./models";
import { Card, Column, ProductContainer, Row, Text, Tit } from "./styled";
import UpdateForm from "./updateForm";
import { AutoComplete, Button, Input, Modal, SelectProps } from "antd";
import jwt_decode from "jwt-decode";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function Home() {
    const [products, setProducts] = useState<Product[]>();
    const [totoalProducts, setTotalProducts] = useState<number>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [options, setOptions] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log("effect called");
        countAllProducts().then((r) => {
            setTotalProducts(r);
        });
        getAllProducts(page).then((r) => {
            if (JSON.stringify(products) !== JSON.stringify(r)) {
                setProducts(r);
            }
        });
    }, [show, page, totoalProducts, products]);

    // const onSearch = (value: string) => {
    //     if (value === "") {
    //         // getAllProducts(page).then((r) => {
    //         //     console.log(r);
    //         //     if (JSON.stringify(products) !== JSON.stringify(r)) {
    //         //         setProducts(r);
    //         //     }
    //         // });
    //     }
    //     setSearchKey(value);
    // };

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

    const onSelect = (value: string) => {
        navigate(`/product/?pid=${value}`);
    };

    const searchResult = async (query: string) => {
        setSearchKey(query);
        const resultProduct: Product[] = await findProducts(
            query
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .trim()
                .split(" ")
                .filter((d) => d !== "")
                .join("&")
        );
        return resultProduct.map((product) => {
            return {
                value: product.stock_id,
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={product.picture}
                            width={80}
                            height={80}
                            alt={product.stock_id}
                        />
                        <span
                            style={{
                                marginLeft: "10px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span>{product.item_name}</span>
                            <span>{product.unit_price} MMK</span>
                            <span style={{ fontWeight: "bold" }}>
                                "{query}"
                            </span>
                        </span>
                    </div>
                ),
            };
        });
    };

    const handleSearch = async (value: any) => {
        setOptions(value ? await searchResult(value) : []);
    };

    return (
        <div
            style={{
                flex: 1,
                flexDirection: "column",
                display: "flex",
                overflow: "auto",
            }}
        >
            <div>
                <Row align="center" spacing="0px 10px" bgcolor="#fff">
                    <span style={{ fontWeight: "bold", fontSize: 18 }}>
                        ITVerse
                    </span>
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                        style={{ width: 500 }}
                        options={options}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                    >
                        <Input.Search
                            value={searchKey}
                            size="large"
                            placeholder={totoalProducts?.toString()}
                            allowClear
                        />
                    </AutoComplete>
                </Row>
            </div>
            <div
                style={{
                    flex: 1,
                    overflow: "auto",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
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
                                    width={150}
                                    height={150}
                                    className="image"
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
                <div
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignSelf: "center",
                        marginTop: "10px",
                    }}
                >
                    {[1, 2, 3, 4, 5].map((val: number) => (
                        <Button
                            onClick={() => {
                                setPage(val);
                            }}
                            type={val === page ? "primary" : "default"}
                        >
                            page {val}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
