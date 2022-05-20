import React, { useContext, useEffect, useState } from "react";
import { Button, Input, AutoComplete, Modal } from "antd";
import { StyledHeader } from "./styled";
import { findProducts } from "./apis";
import { Product } from "./models";
import useWindowDimensions from "./hooks/useDimenstion";
import ClampLines from "react-clamp-lines";
import {
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./providers/appProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Header() {
    const [options, setOptions] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const { isAuth, logout } = useContext(AppContext);
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


    // const onSelect = (value: string) => {
    //     handleCancel();
    //     navigate(`/product/?pid=${value}`);
    //     setOptions([]);
    //     setSearchKey("");
    // };

    const searchResult = async (query: string) => {
        setSearchKey(query);
        const resultProduct: Product[] = await findProducts(
            query
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .trim()

        );
        return resultProduct.map((product) => {
            return product;

        });
    };

    const handleSearch = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        if(query !== ""){

            setOptions(await searchResult(query))
        }else{
            setSearchKey("");
        }
    }

    useEffect(()=>{
        searchKey ==="" && setOptions([])
        // console.log(searchKey)
    },[searchKey])

    return (
        <StyledHeader>
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


            <>
                {(
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SearchOutlined />}
                        onClick={showModal}
                    />
                )}


                {isAuth && (
                    <Button
                        type="primary"
                        size="middle"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                )}
            </>


            <Modal title="Search Items In ITVerse" style={{ height: 'fit-content', top: 0 }} footer={<></>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                        onChange={handleSearch}
                        size="large"
                        placeholder={"Search Item......."}
                        allowClear

                    />


                </div>
                <div style={{
                    overflow: 'auto',
                    maxHeight: '70vh',
                    paddingTop:" 10px"
                }}>
                    {
                        options.map((product: any) =>
                            <div
                                key={product.stock_id}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",

                                }}
                            >

                                <LazyLoadImage
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
                </div>
            </Modal>

        </StyledHeader>
    );
}

export default Header;
