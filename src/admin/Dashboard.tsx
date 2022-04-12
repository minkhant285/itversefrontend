import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ProductForm from "../ProductForm";
import jwt_decode from "jwt-decode";

function Dashboard() {
    const [isAuth, setAuth] = useState(false);

    React.useEffect(() => {
        let userData: any = jwt_decode(
            localStorage.getItem("accessToken") || ""
        );

        if (userData.role === "admin") {
            if (
                (new Date(userData.exp * 1000) > new Date(),
                new Date(userData.exp * 1000).toLocaleString())
            ) {
                console.log("token expired");
                // JSON.stringify(selectedProduct) !==
                //     JSON.stringify(res) &&
                //     setSelectedProduct(res);
                // handleShow();
            } else {
                setAuth(true);
            }
        } else {
            console.log("Admin permission required");
        }
    }, [isAuth]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    padding: "10px",
                }}
            >
                <ProductForm />
            </div>
        </>
    );
}

export default Dashboard;
