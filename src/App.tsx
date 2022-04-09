import React, { useState } from "react";
import Login from "./Login";
import "antd/dist/antd.css";
import { Column, Row, Text, Tit } from "./styled";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import { AutoComplete, Button, Input, Modal, SelectProps } from "antd";
import { findProducts } from "./apis";
import { Product } from "./models";

function App() {
    const [options, setOptions] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");

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
                                    placeholder={"Search Item......."}
                                    allowClear
                                />
                            </AutoComplete>
                        </Row>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="product" element={<ProductDetail />} />
                        <Route path="login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
