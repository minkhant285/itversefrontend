import { Row } from "antd";
import React from "react";
import Login from "./Login";
import { Column, Text } from "./styled";

function Container() {
    return (
        <Column align="center" width="fit-content">
            <Row justify="center">
                <Login />
            </Row>
        </Column>
    );
}

export default Container;
