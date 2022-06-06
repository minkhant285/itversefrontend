import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { FormEvent } from "react";
import { addProduct } from "../apis/itverse.post.api";
import { Column, Row, Text } from "../styled";
import { useFormInput } from "../utils/hooks";

const ProductForm: React.FC = () => {
    const { values, handleFormInputChange } = useFormInput({});

    const addNewProduct = (e: FormEvent) => {
        e.preventDefault();
        addProduct({
            sku: values.sku,
            // buy_price: values.buy_price,
            category_id: values.category,
            item_name: values.title,
            picture: values.photo_url,
            unit_in_stock: values.quantity,
            unit_price: values.unit_price,
            description: values.description,
        });
    };

    return (
        <div
            style={{
                overflow: "auto",
                backgroundColor: "#0d0d0d",
                width: "25%",
                padding: "10px",
                borderRadius: "10px",
            }}
        >
            <form onSubmit={(e: FormEvent) => addNewProduct(e)}>
                <Column style={{ padding: "10px" }}>
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            SKU Number
                        </Text>
                        <Input
                            value={values.sku}
                            type={"text"}
                            placeholder="SKU number"
                            onChange={handleFormInputChange}
                            name="sku"
                            required
                        />
                    </Column>
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Title
                        </Text>
                        <Input
                            value={values.title}
                            type={"text"}
                            placeholder="Title"
                            onChange={handleFormInputChange}
                            name="title"
                            required
                        />
                    </Column>
                    {/* <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Buy Price
                        </Text>
                        <Input
                            value={values.buy_price}
                            type={"text"}
                            placeholder="Buy Price"
                            onChange={handleFormInputChange}
                            name="buy_price"
                            required
                        />
                    </Column> */}
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Unit Price
                        </Text>
                        <Input
                            value={values.unit_price}
                            type={"text"}
                            placeholder="Unit Price"
                            onChange={handleFormInputChange}
                            name="unit_price"
                            required
                        />
                    </Column>
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Unit in Stock
                        </Text>
                        <Input
                            value={values.quantity}
                            type={"text"}
                            placeholder="Quantity"
                            onChange={handleFormInputChange}
                            name="quantity"
                            required
                        />
                    </Column>
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Category
                        </Text>
                        <Input
                            value={values.category}
                            type={"text"}
                            placeholder="Category"
                            onChange={handleFormInputChange}
                            name="category"
                            required
                        />
                    </Column>
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Photo Url
                        </Text>
                        <Input
                            value={values.photo_url}
                            type={"text"}
                            placeholder="Photo URL"
                            onChange={handleFormInputChange}
                            name="photo_url"
                            required
                        />
                    </Column>
                    <Column style={{ marginBottom: "10px" }}>
                        <Text color="#fff" fWeight="bold">
                            Specifications
                        </Text>
                        <TextArea
                            rows={3}
                            value={values.description}
                            placeholder="Specifications"
                            onChange={handleFormInputChange}
                            name="description"
                            required
                        />
                    </Column>
                    <Row justify="space-between">
                        <Button htmlType="reset" type="default">
                            Reset
                        </Button>
                        <Button htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Row>
                </Column>
            </form>
        </div>
    );
};

export default ProductForm;
