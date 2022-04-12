import React, { useState } from "react";
import Login from "./Login";
import "antd/dist/antd.css";
import { Column, Row, Text, Tit } from "./styled";
import {
    BrowserRouter,
    Link,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import { AutoComplete, Button, Input, Modal, SelectProps } from "antd";
import { findProducts } from "./apis";
import { Product } from "./models";
import { SearchOutlined } from "@ant-design/icons";
import useWindowDimensions from "./hooks/useDimenstion";
import ClampLines from "react-clamp-lines";
import Dashboard from "./admin/Dashboard";

function App() {
    const [options, setOptions] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [searchFocus, setFocus] = useState<boolean>(false);
    const { height, width } = useWindowDimensions();

    const onSelect = (value: string) => {
        window.location.href = `/product/?pid=${value}`;
        // navigate(`/product/?pid=${value}`);
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
                            <ClampLines
                                text={product.item_name}
                                lines={1}
                                id="clamp-lines"
                            />
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
        <div className="App">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <BrowserRouter>
                    <div>
                        <Row
                            align="center"
                            justify="space-between"
                            bgcolor="#fff"
                            height="70px"
                            padding="10px"
                        >
                            {(() => {
                                if (searchFocus && width < 400) {
                                    return <></>;
                                } else if (searchFocus && width > 400) {
                                    return (
                                        <>
                                            <img
                                                width={60}
                                                height={60}
                                                src={require("./assets/brand.png")}
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                                alt="itverse"
                                            />
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 18,
                                                }}
                                            >
                                                ITVerse
                                            </span>
                                        </>
                                    );
                                } else if (!searchFocus) {
                                    return (
                                        <>
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 18,
                                                }}
                                            >
                                                <img
                                                    width={60}
                                                    height={60}
                                                    src={require("./assets/brand.png")}
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                    alt="itverse"
                                                />
                                                ITVerse
                                            </span>
                                        </>
                                    );
                                }
                            })()}

                            {!searchFocus && (
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<SearchOutlined />}
                                    onClick={() => setFocus(true)}
                                />
                            )}

                            {searchFocus && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <AutoComplete
                                        dropdownMatchSelectWidth={true}
                                        style={{
                                            width: (() => {
                                                if (
                                                    width > 700 &&
                                                    width < 900
                                                ) {
                                                    return "60%";
                                                } else if (
                                                    width > 630 &&
                                                    width < 700
                                                ) {
                                                    return "70%";
                                                } else if (width < 630) {
                                                    return "95%";
                                                } else {
                                                    return "40%";
                                                }
                                            })(),
                                            alignSelf: "flex-end",
                                        }}
                                        options={options}
                                        onSelect={onSelect}
                                        onSearch={handleSearch}
                                        autoFocus
                                    >
                                        <Input
                                            onFocus={() => setFocus(true)}
                                            onBlur={() => setFocus(false)}
                                            value={searchKey}
                                            size="large"
                                            placeholder={"Search Item......."}
                                            allowClear
                                        />
                                    </AutoComplete>
                                    <Button type="primary" size="large">
                                        {" "}
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </Row>
                    </div>
                    <Routes>
                        <Route path="/page/:pnum" element={<Home />} />
                        <Route
                            path="/page/"
                            element={<Navigate to={"/page/1"} />}
                        />
                        <Route path="/" element={<Navigate to={"/page/1"} />} />
                        <Route path="product" element={<ProductDetail />} />
                        <Route path="login" element={<Login />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
