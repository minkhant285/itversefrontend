import React, { useEffect, useState } from "react";
import "./App.css";
import { countAllProducts, findProducts, getAllProducts } from "./apis";
import { Product } from "./models";
import { Card, Column, ProductContainer, Row, Text, Tit } from "./styled";
import UpdateForm from "./updateForm";
import { AutoComplete, Button, Input, Modal, SelectProps } from "antd";

// const { Search } = Input;

let tempArr: Product[];

function Home() {
    const [products, setProducts] = useState<Product[]>();
    const [totoalProducts, setTotalProducts] = useState<number>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log("effect called");
        countAllProducts().then((r) => {
            setTotalProducts(r);
        });
        getAllProducts(page).then((r) => {
            if (JSON.stringify(products) !== JSON.stringify(r)) {
                setProducts(r);
                tempArr = r;
            }
        });
    }, [show, page, totoalProducts]);

    function getRandomInt(max: number, min: number = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
    }

    // const searchResult = (query: string) =>
    //     new Array(getRandomInt(5))
    //         .join(".")
    //         .split(".")
    //         .map((_, idx) => {
    //             const category = `${query}${idx}`;
    //             return {
    //                 value: category,
    //                 label: (
    //                     <div
    //                         style={{
    //                             display: "flex",
    //                             justifyContent: "space-between",
    //                         }}
    //                     >
    //                         <span>
    //                             Found {query} on{" "}
    //                             <a
    //                                 href={`https://s.taobao.com/search?q=${query}`}
    //                                 target="_blank"
    //                                 rel="noopener noreferrer"
    //                             >
    //                                 {category}
    //                             </a>
    //                         </span>
    //                         <span>{getRandomInt(200, 100)} results</span>
    //                     </div>
    //                 ),
    //             };
    //         });

    const onSearch = (value: string) => {
        if (value === "") {
            setProducts(tempArr);
            // console.log(tempArr);
        }
        setSearchKey(value);
    };
    // setOptions(value ? searchResult(value) : []);

    const ModalComp = () => (
        <Modal
            centered
            title="Update Product"
            style={{ height: "fit-content" }}
            visible={show}
            onOk={handleClose}
            onCancel={handleClose}
            footer={<></>}
        >
            <UpdateForm product={selectedProduct} setShow={setShow} />
        </Modal>
    );

    function GetSortOrder(prop: string) {
        return function (a: any, b: any) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        };
    }

    const onSelect = (value: string) => {
        console.log("onSelect", value);
    };

    async function serachProducts(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") {
            setProducts(
                await findProducts(
                    searchKey
                        .replace(/[^a-zA-Z0-9 ]/g, "")
                        .trim()
                        .split(" ")
                        .filter((d) => d !== "")
                        .join("&")
                )
            );
        }
    }

    return (
        <div className="App">
            <Column flex={1} height="100%">
                <Row align="center" spacing="0px 10px" bgcolor="#fff">
                    <span style={{ fontWeight: "bold", fontSize: 18 }}>
                        ITVerse
                    </span>
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                        style={{ width: 300 }}
                        options={options}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        onClear={() => console.log("clear")}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                            serachProducts(e)
                        }
                    >
                        <Input.Search
                            value={searchKey}
                            size="large"
                            placeholder={totoalProducts?.toString()}
                            enterButton="Search"
                            onSearch={async () =>
                                setProducts(
                                    await findProducts(
                                        searchKey
                                            .replace(/[^a-zA-Z0-9 ]/g, "")
                                            .trim()
                                            .split(" ")
                                            .filter((d) => d !== "")
                                            .join("&")
                                    )
                                )
                            }
                            allowClear
                        />
                    </AutoComplete>
                </Row>
                <Row>
                    <ProductContainer>
                        {products?.map((res) => (
                            <Card
                                key={res.stock_id}
                                onClick={() => {
                                    JSON.stringify(selectedProduct) !==
                                        JSON.stringify(res) &&
                                        setSelectedProduct(res);
                                    handleShow();
                                }}
                            >
                                <Column>
                                    <img
                                        src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${res.stock_id}.jpg`}
                                        width={150}
                                        height={150}
                                        className="image"
                                        alt={""}
                                        style={{
                                            objectFit: "contain",
                                            alignSelf: "center",
                                        }}
                                    />

                                    <Text>{res.item_name}</Text>

                                    <Row
                                        justify="space-between"
                                        padding="10px 0px 10px 0px"
                                    >
                                        {res.unit_in_stock > 0 ? (
                                            <Text color="green">In Stock</Text>
                                        ) : (
                                            <Text color="red">
                                                Out of Stock
                                            </Text>
                                        )}

                                        <Text>{res.unit_price} MMK</Text>
                                    </Row>
                                </Column>
                            </Card>
                        ))}
                    </ProductContainer>
                    <ModalComp />
                </Row>
                <Row flex={1} justify="center">
                    <Button
                        onClick={() => {
                            getAllProducts(1).then((r) => {
                                if (
                                    JSON.stringify(products) !==
                                    JSON.stringify(r)
                                ) {
                                    setProducts(r);
                                }
                            });
                        }}
                    >
                        page 1
                    </Button>
                    <Button
                        onClick={() => {
                            getAllProducts(2).then((r) => {
                                if (
                                    JSON.stringify(products) !==
                                    JSON.stringify(r)
                                ) {
                                    setProducts(r);
                                }
                            });
                        }}
                    >
                        page 2
                    </Button>
                    <Button
                        onClick={() => {
                            getAllProducts(3).then((r) => {
                                console.log(r);
                                if (
                                    JSON.stringify(products) !==
                                    JSON.stringify(r)
                                ) {
                                    setProducts(r);
                                }
                            });
                        }}
                    >
                        page 3
                    </Button>
                    <Button
                        onClick={() => {
                            getAllProducts(4).then((r) => {
                                if (
                                    JSON.stringify(products) !==
                                    JSON.stringify(r)
                                ) {
                                    setProducts(r);
                                }
                            });
                        }}
                    >
                        page 4
                    </Button>
                    <Button
                        onClick={() => {
                            getAllProducts(5).then((r) => {
                                if (
                                    JSON.stringify(products) !==
                                    JSON.stringify(r)
                                ) {
                                    setProducts(r);
                                }
                            });
                        }}
                    >
                        page 5
                    </Button>
                </Row>
            </Column>
        </div>
    );
}

export default Home;
