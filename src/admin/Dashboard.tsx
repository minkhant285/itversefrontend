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
                <Column align="flex-end">
                    <Button type="primary" icon={<PlusOutlined />}>
                        {" "}
                        Add New Product{" "}
                    </Button>
                    <Row spacing={width > 500 ? "10px" : "3px"}>
                        {/* {width > 500 && <ProductForm />} */}
                        <ProductList />
                    </Row>
                </Column>
            ) : (
                <Navigate to={`/login`} />
            )}
        </>
    );
}

export default Dashboard;
