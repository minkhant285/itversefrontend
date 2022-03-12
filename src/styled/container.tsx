import styled from "styled-components";

interface RowProps {
    justify?: string | undefined;
    padding?: string | undefined;
}

export const Row = styled.div<RowProps>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props: RowProps) =>
        props.justify ? props.justify : "center"};
    padding: ${(props: RowProps) => (props.padding ? props.padding : "5px")};
`;

export const Column = styled.div<RowProps>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props: RowProps) =>
        props.justify ? props.justify : "center"};
    padding: ${(props: RowProps) => (props.padding ? props.padding : "5px")};
`;

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 2px 16px;
    height: 250px;
    margin-left: 10px;
    margin-right: 5px;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;
