import { AutoComplete } from "antd";
import styled from "styled-components";

interface RowProps {
    justify?: string | undefined;
    padding?: string | undefined;
    bgcolor?: string | undefined;
    flex?: number;
    height?: string | undefined;
    width?: string | undefined;
    align?: string | undefined;
    spacing?: string | undefined;
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
    > * {
        margin: ${(props: RowProps) => props.spacing};
    }
`;

export const Column = styled.div<RowProps>`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.flex && props.flex};
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background-color: ${(props) => props.bgcolor && props.bgcolor};
    justify-content: ${(props: RowProps) => props.justify};
    align-items: ${(props: RowProps) => props.align};
    padding: ${(props: RowProps) => (props.padding ? props.padding : "0px")};
`;

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    transition: 0.3s;
    padding: 2px;
    /* height: 250px; */
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

export const ProductWrapper = styled.div`
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

export const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-content: center;
    row-gap: 10px;
    column-gap: 13px;
    width: 100%;
    padding: 8px;
    position: relative;
    @media (min-width: 650px) and (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
    }
`;

export const StyledAutoComplete = styled(AutoComplete)`
    width: 50%;

    @media (min-width: 650px) and (max-width: 900px) {
    }

    @media (max-width: 650px) {
    }
`;

export const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 70px;
    padding: 10px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

export const HomeContainer = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    overflow: auto;
    padding: 10px 30px;

    @media (min-width: 650px) and (max-width: 900px) {
        padding: 0px 0px;
    }

    @media (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 0px;
    }
`;

export const ProductDetailContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    padding: 20px;
    grid-auto-rows: minmax(100px,auto);

    @media (max-width: 650px) {
        grid-template-columns: repeat(1, 1fr);

    }
`;
