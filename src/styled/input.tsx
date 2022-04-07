import styled from "styled-components";
import { Input as AntInput, InputProps } from "antd";
import React from "react";

export const Input: React.FC<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
> = styled.input`
    margin-top: 15px;
    padding: 8px;
`;
