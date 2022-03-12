import styled from "styled-components";

export const Input: React.FC<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
> = styled.input`
    margin-top: 15px;
    padding: 8px;
`;
