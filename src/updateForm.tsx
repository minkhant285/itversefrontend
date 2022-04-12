import React, { FormEvent } from "react";
import { Button, Input } from "antd";
import { deleteProduct, productUpdate } from "./apis";
import { Product } from "./models";
import { Column, Row, Text } from "./styled";
import { useFormInput } from "./utils/hooks";
import "./App.css";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const UpdateForm: React.FC<{ product?: Product; setShow: Function }> = ({
    product,
    setShow,
}) => {
    const navigate = useNavigate();
    const { values, handleFormInputChange } = useFormInput({
        sku: product?.sku,
        buy_price: product?.buy_price,
        category_id: product?.category_id,
        item_name: product?.item_name,
        picture: product?.picture,
        unit_in_stock: product?.unit_in_stock,
        unit_price: product?.unit_price,
        description: product?.description,
    });

    const updateProduct = (e: FormEvent) => {
        e.preventDefault();
        productUpdate(product?.stock_id, {
            sku: values.sku,
            buy_price: values.buy_price,
            category_id: values.category_id,
            item_name: values.item_name,
            picture: values.picture,
            unit_in_stock: values.unit_in_stock,
            unit_price: values.unit_price,
            description: values.description,
        });
        setShow(false);
    };

    return (
        <div style={{ width: "100%" }}>
            <form onSubmit={(e: FormEvent) => updateProduct(e)}>
                <Column>
                    <Text>SKU Number</Text>
                    <Input
                        value={values.sku}
                        type={"text"}
                        placeholder="SKU number"
                        onChange={handleFormInputChange}
                        name="sku"
                        required
                    />
                    <Text>Title</Text>
                    <Input
                        value={values.item_name}
                        type={"text"}
                        placeholder="Title"
                        onChange={handleFormInputChange}
                        name="item_name"
                        required
                    />
                    <Text>Buy Price</Text>
                    <Input
                        value={values.buy_price}
                        type={"text"}
                        placeholder="Buy Price"
                        onChange={handleFormInputChange}
                        name="buy_price"
                        required
                    />
                    <Text>Unit Price</Text>
                    <Input
                        value={values.unit_price}
                        type={"text"}
                        placeholder="Unit Price"
                        onChange={handleFormInputChange}
                        name="unit_price"
                        required
                    />
                    <Text>Unit in Stock</Text>
                    <Input
                        value={values.unit_in_stock}
                        type={"text"}
                        placeholder="unit_in_stock"
                        onChange={handleFormInputChange}
                        name="unit_in_stock"
                        required
                    />
                    <Text>Category</Text>
                    <Input
                        value={values.category_id}
                        type={"text"}
                        placeholder="Category"
                        onChange={handleFormInputChange}
                        name="category_id"
                        required
                    />
                    <Text>Photo Url</Text>
                    <Input
                        value={values.picture}
                        type={"text"}
                        placeholder="Photo URL"
                        onChange={handleFormInputChange}
                        name="picture"
                        required
                    />
                    <Text>Specifications</Text>
                    <TextArea
                        rows={5}
                        value={values.description}
                        placeholder="Specifications"
                        onChange={handleFormInputChange}
                        name="description"
                        required
                    />
                    <Row justify="space-around">
                        <Button type="default" htmlType="reset">
                            Reset
                        </Button>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                                deleteProduct(product?.stock_id);
                                navigate(`/page/${1}`);
                            }}
                        >
                            Delete
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Row>
                </Column>
            </form>
        </div>
    );
};

export default UpdateForm;
