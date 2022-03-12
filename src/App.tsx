import { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts } from "./apis";
import { Product } from "./models";
import { Card, Column, Row, Text, Title } from "./styled";
import UpdateForm from "./updateForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

function App() {
    const [products, setProducts] = useState<Product[]>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAllProducts().then(
            (r) =>
                JSON.stringify(products) !== JSON.stringify(r) && setProducts(r)
        );
    }, [products, show]);

    const ModalComp = () => (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Proudct</Modal.Title>
            </Modal.Header>
            <Column>
                <UpdateForm product={selectedProduct} setShow={setShow} />
            </Column>
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

    return (
        <div className="App">
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

                                        <Text>
                                            {Number.parseInt(res.unit_price) *
                                                1780}{" "}
                                            MMK
                                        </Text>
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
