import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { AppContext } from "../providers/appProvider";
import { Row, Column } from "../styled";
import ProductList from "./ProductList";
import useWindowDimensions from "../hooks/useDimenstion";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function Dashboard() {
    const { isAuth } = useContext(AppContext);
    const { width } = useWindowDimensions();

    return (
        <>
            {isAuth ? (
                <ProductList />
            ) : (
                <Navigate to={`/login`} />
            )}
        </>
    );
}

export default Dashboard;
