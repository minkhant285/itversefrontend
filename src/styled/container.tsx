import styled from "styled-components";

interface RowProps {
    justify?: string | undefined;
    padding?: string | undefined;
    bgcolor?: string | undefined;
    flex?: number;
    height?: string | undefined;
    align?: string | undefined;
}

export const Row = styled.div<RowProps>`
    display: flex;
    flex-direction: row;
    flex: ${(props) => props.flex && props.flex};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bgcolor && props.bgcolor};
    justify-content: ${(props: RowProps) => props.justify};
    align-items: ${(props: RowProps) => props.align};
    padding: ${(props: RowProps) => (props.padding ? props.padding : "5px")};
`;

export const Column = styled.div<RowProps>`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.flex && props.flex};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bgcolor && props.bgcolor};
    justify-content: ${(props: RowProps) => props.justify};
    align-items: ${(props: RowProps) => props.align};
    padding: ${(props: RowProps) => (props.padding ? props.padding : "5px")};
`;

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 2px;
    height: 250px;
    margin-left: 10px;
    margin-right: 5px;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;
