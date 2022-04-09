import React from "react";
import Login from "./Login";
import "antd/dist/antd.css";
import { Column, Row, Text, Tit } from "./styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductDetail from "./ProductDetail";

function App() {
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
