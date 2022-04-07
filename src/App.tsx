import React, { useEffect, useState } from "react";
import "./App.css";
import { findProducts, getAllProducts } from "./apis";
import { Product } from "./models";
import { Card, Column, Row, Text, Title } from "./styled";
import UpdateForm from "./updateForm";
import { AutoComplete, Input, Modal, SelectProps } from "antd";
import "antd/dist/antd.css";
// const { Search } = Input;

let tempArr: Product[];

function App() {
    const [products, setProducts] = useState<Product[]>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
    const [searchKey, setSearchKey] = useState<string>("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log("effect called");
        getAllProducts().then((r) => {
            if (JSON.stringify(products) !== JSON.stringify(r)) {
                setProducts(r);
                tempArr = r;
            }
        });
    }, [show]);

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
            <Row>
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
                        placeholder="input here"
                        enterButton="Search"
                        allowClear
                    />
                </AutoComplete>
            </Row>
            <Row>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    {products?.map((res) => (
                        <div
                            key={res.stock_id}
                            style={{
                                width: 230,
                                margin: 2,
                            }}
                        >
                            <Card
                                onClick={() => {
                                    JSON.stringify(selectedProduct) !==
                                        JSON.stringify(res) &&
                                        setSelectedProduct(res);
                                    handleShow();
                                }}
                            >
                                <Column>
                                    <img
                                        src={res.picture}
                                        width={200}
                                        height={150}
                                        className="image"
                                        alt={res.picture}
                                    />

                                    <Title size={"small"}>
                                        {res.item_name}
                                    </Title>

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
                        </div>
                    ))}
                </div>
                <ModalComp />
            </Row>
        </div>
    );
}

export default App;
