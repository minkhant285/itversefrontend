import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Modal, Spin } from "antd";
import { Row, StyledHeader, Column } from "./styled";
import { findProducts } from "./apis";
import { Product } from "./models";
import ClampLines from "react-clamp-lines";
import {
    SearchOutlined,
    FilterFilled
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./providers/appProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Header() {
    const [options, setOptions] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const { isAuth, logout } = useContext(AppContext);
    const [isSearching, setSearching] = useState<boolean>(false);
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const searchResultPressed = (value: string) => {
        handleCancel();
        navigate(`/product/?pid=${value}`);
        setOptions([]);
        setSearchKey("");
    };

    const searchResult = async (query: string) => {
        const resultProduct: Product[] = await findProducts(
            query
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .trim()

        );
        return resultProduct.map((product) => {
            return product;

        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearching(true);
        if (query !== "") {
            searchResult(query).then((res) => { setSearching(false); setOptions(res) })
        }
        else {
            setSearchKey("");
        }
    }

    useEffect(() => {
        if (searchKey === "") { setOptions([]); setSearching(false) }
        // console.log(searchKey)
    }, [searchKey,isSearching])

    return (
        <StyledHeader>
            <Row spacing="0px 5px" align="center">
                <img
                    width={50}
                    height={50}
                    src={require("./assets/brand.png")}
                    style={{
                        objectFit: "contain",
                    }}
                    alt="itverse"
                />
                <span style={{
                    fontWeight: "bold",
                    fontSize: 18,
                }}>
                    ITVerse
                </span>
            </Row>


            <Row spacing="0px 10px">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={showModal}
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<FilterFilled />}
                />


                {isAuth && (
                    <Button
                        type="primary"
                        size="middle"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                )}
            </Row>


            <Modal  title="Search Items In ITVerse" style={{ height: 'fit-content', top: 0 }} footer={<></>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "flex-end",

                    }}
                >

                    <Input
                        value={searchKey}
                        autoFocus={true}
                        onChange={(e)=>{setSearchKey(e.target.value);handleSearch(e);}}
                        size="large"
                        placeholder={"Search Item......."}
                        allowClear
                    />


                </div>
                <Column style={{
                    overflow: 'auto',
                    maxHeight: '70vh',
                    paddingTop: " 10px"
                }}>

                    {isSearching ? <Spin tip="loading..." /> :
                        options.map((product: Product) =>
                            <div
                                onClick={() => searchResultPressed(product.stock_id)}
                                key={product.stock_id}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",

                                }}
                            >

                                <LazyLoadImage
                                    placeholderSrc={"https://us.123rf.com/450wm/lishchyshyn/lishchyshyn1904/lishchyshyn190403199/132862735-vector-loading-icon-futuristic-progress-design.jpg?ver=6"}
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
                                        buttons={false}
                                    />
                                    <span>{product.unit_price} MMK</span>

                                </span>
                            </div>
                        )
                    }
                </Column>
            </Modal>

        </StyledHeader>
    );
}

export default Header;
