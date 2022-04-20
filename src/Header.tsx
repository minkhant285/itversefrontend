import React, { useContext, useState } from "react";
import { Button, Input, AutoComplete } from "antd";
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

function Header() {
    const [options, setOptions] = useState<any>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [searchFocus, setFocus] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { width } = useWindowDimensions();
    const { isAuth, logout } = useContext(AppContext);
    const navigate = useNavigate();

    const onSelect = (value: string) => {
        navigate(`/product/?pid=${value}`);
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
        <StyledHeader>
            {(() => {
                if (searchFocus && width < 400) {
                    return <></>;
                } else if (searchFocus && width > 400) {
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

            {width < 400 ? (
                <>
                    <Button
                        type={menuOpen ? "default" : "primary"}
                        shape="circle"
                        icon={
                            menuOpen ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                </>
            ) : (
                <>
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
                                        if (width > 700 && width < 900) {
                                            return "60%";
                                        } else if (width > 630 && width < 700) {
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
                                Cancel
                            </Button>
                        </div>
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
            )}
        </StyledHeader>
    );
}

export default Header;
