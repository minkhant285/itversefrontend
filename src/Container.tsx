import { Row } from "antd";
import React from "react";
import Login from "./Login";
import { Column, Tit } from "./styled";

function Container() {
    return (
        <Column align="center" width="fit-content">
            <Tit level={2}>ITVerse</Tit>
            <Row justify="center">
                <Login />
            </Row>
        </Column>
    );
}

export default Container;
