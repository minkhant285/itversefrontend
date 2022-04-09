import React from "react";
import Login from "./Login";
import "antd/dist/antd.css";
import { Column, Row, Text, Tit } from "./styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
    return (
        <div className="App">
            <div
                style={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
