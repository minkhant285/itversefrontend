import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { FormEvent, useEffect, useLayoutEffect } from "react";
import { productUpdate } from "./apis";
import { addProduct } from "./apis/itverse.post.api";
import { Product } from "./models";
import { Column, Row, Text } from "./styled";
import { useFormInput } from "./utils/hooks";

const ProductForm: React.FC = () => {
    const { values, handleFormInputChange } = useFormInput({});

    const addNewProduct = (e: FormEvent) => {
        e.preventDefault();
        addProduct({
            sku: values.sku,
            buy_price: values.buy_price,
            category_id: values.category,
            item_name: values.title,
            picture: values.photo_url,
            unit_in_stock: values.quantity,
            unit_price: values.unit_price,
            description: values.description,
        });
    };

    return (
        <div style={{ width: "500px" }}>
            <form onSubmit={(e: FormEvent) => addNewProduct(e)}>
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
                        value={values.title}
                        type={"text"}
                        placeholder="Title"
                        onChange={handleFormInputChange}
                        name="title"
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
                        value={values.quantity}
                        type={"text"}
                        placeholder="Quantity"
                        onChange={handleFormInputChange}
                        name="quantity"
                        required
                    />
                    <Text>Category</Text>
                    <Input
                        value={values.category}
                        type={"text"}
                        placeholder="Category"
                        onChange={handleFormInputChange}
                        name="category"
                        required
                    />
                    <Text>Photo Url</Text>
                    <Input
                        value={values.photo_url}
                        type={"text"}
                        placeholder="Photo URL"
                        onChange={handleFormInputChange}
                        name="photo_url"
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
                    <Row justify="space-between">
                        <button type="reset">Reset</button>
                        <button type="submit">Submit</button>
                    </Row>
                </Column>
            </form>
        </div>
    );
};

export default ProductForm;
