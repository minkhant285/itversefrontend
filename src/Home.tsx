import React, { useEffect, useState } from "react";
import "./App.css";
import { countAllProducts, getAllProducts } from "./apis";
import { Product } from "./models";
import {
    Card,
    ClampText,
    Column,
    HomeContainer,
    ProductContainer,
    ProductWrapper,
    Row,
    Text,
} from "./styled";
import { Button, Modal, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { range } from "./utils/Range";
import { sortItems } from "./utils/sortAz";
import { LazyLoadImage } from 'react-lazy-load-image-component';


function Home() {
    const [products, setProducts] = useState<Product[]>();
    const [totoalProducts, setTotalProducts] = useState<number>(0);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const param = useParams();
    const [page, setPage] = useState<number>(
        Number.parseInt(param.pnum || "1") || 1
    );
    const navigate = useNavigate();

    useEffect(() => {
        countAllProducts().then((r) => {
            setTotalProducts(r);
        });
        window.scrollTo(0, 0);
        getAllProducts(page).then((r) => {
            if (JSON.stringify(products) !== JSON.stringify(r)) {
                setProducts(r);
            }
        });
    }, [page, totoalProducts, products]);

    return (
        <HomeContainer>
            {products === undefined ? (
                <div
                    style={{
                        height: "100%",
                        backgroundColor: "#98969645",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spin tip="loading..." />
                </div>
            ) : (
                <ProductWrapper>
                    <ProductContainer>
                        {products?.sort(sortItems).map((res) => (
                            <Card
                                key={res.stock_id}
                                onClick={() => {
                                    navigate(`/product/?pid=${res.stock_id}`);
                                }}
                            >
                                <Column style={{ padding: "5px" }}>
                                    <div style={{ position: "relative" }}>


                                        <img
                                            width={40}
                                            height={40}
                                            src={require("./assets/brand.png")}
                                            style={{
                                                objectFit: "contain",
                                                alignSelf: "flex-start",
                                                position: "absolute",
                                                zIndex: 1,
                                            }}
                                            alt="itverse"
                                        />
                                        <Row justify="center">

                                        <LazyLoadImage
                                            alt=""
                                            placeholderSrc={"https://us.123rf.com/450wm/lishchyshyn/lishchyshyn1904/lishchyshyn190403199/132862735-vector-loading-icon-futuristic-progress-design.jpg?ver=6"}
                                            height={150}
                                            src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${res.stock_id}.jpg`}
                                            width={130}
                                            style={{
                                                objectFit: "contain",
                                                alignSelf: "center",
                                                justifySelf: "center",
                                            }}
                                            />
                                        </Row>
                                    </div>

                                    <ClampText
                                        text={res.item_name}
                                        lines={2}
                                        id="clamp-lines"
                                        buttons={false}
                                    />

                                    <Row
                                        justify="space-between"
                                        padding="10px 0px 10px 0px"
                                    >
                                        {res.unit_in_stock > 0 ? (
                                            <Text color="green">In Stock</Text>
                                        ) : (
                                            <Text color="red">
                                                Out of Stock
                                            </Text>
                                        )}

                                        <Text>{res.unit_price} MMK</Text>
                                    </Row>
                                </Column>
                            </Card>
                        ))}
                    </ProductContainer>

                    {products && (
                        <Row flex={1} spacing="2px" justify="center">
                            {range(Math.ceil(totoalProducts / 30)).map(
                                (val: number) => (
                                    <Button
                                        key={val}
                                        size="small"
                                        onClick={() => {
                                            navigate(`/page/${val}`);
                                            setProducts(undefined);
                                            setPage(val);
                                        }}
                                        type={
                                            val === page ? "primary" : "default"
                                        }
                                    >
                                        {val}
                                    </Button>
                                )
                            )}
                        </Row>
                    )}
                </ProductWrapper>
            )}
        </HomeContainer>
    );
}

export default Home;
