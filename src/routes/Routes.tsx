import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import Header from "../Header";
import Home from "../Home";
import Login from "../Login";
import ProductDetail from "../ProductDetail";
import UpdatePage from "../UpdatePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/page/:pnum" element={<Home />} />
                <Route path="/dashboard/product/update/" element={<UpdatePage />} />
                <Route path="/page/" element={<Navigate to={"/page/1"} />} />
                <Route path="/" element={<Navigate to={"/page/1"} />} />
                <Route path="product" element={<ProductDetail />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="*"
                    element={
                        <div>
                            <h1>404 request Not found</h1>
                        </div>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
