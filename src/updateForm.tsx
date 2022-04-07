import React, { FormEvent } from "react";
import { Button, Input as AntInput } from "antd";
import { productUpdate } from "./apis";
import { Product } from "./models";
import { Column, Input, Row, Text } from "./styled";
import { useFormInput } from "./utils/hooks";
import "./App.css";

const UpdateForm: React.FC<{ product?: Product; setShow: Function }> = ({
    product,
    setShow,
}) => {
    const { values, handleFormInputChange } = useFormInput({
        sku: product?.sku,
        buy_price: product?.buy_price,
        category_id: product?.category_id,
        item_name: product?.item_name,
        picture: product?.picture,
        unit_in_stock: product?.unit_in_stock,
        unit_price: product?.unit_price,
    });

    const updateProduct = (e: FormEvent) => {
        e.preventDefault();
        productUpdate(product?.stock_id, {
            sku: values.sku,
            buy_price: values.buy_price,
            category_id: values.category,
            item_name: values.title,
            picture: values.picture,
            unit_in_stock: values.quantity,
            unit_price: values.unit_price,
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
                    <Row justify="space-around">
                        <Button type="primary" htmlType="reset">
                            Reset
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
