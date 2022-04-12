import { Typography } from "antd";
import ClampLines from "react-clamp-lines";
import styled from "styled-components";

const { Title } = Typography;
interface TitleProps {
    size?: string | number | undefined;
}

interface TextProps {
    color?: string | undefined;
}

export const Tit = styled(Title)<TitleProps>`
    font-size: ${(props: TitleProps) => (props.size ? props.size : "small")};
    font-weight: bold;
    text-align: left;
`;

export const Text = styled.span<TextProps>`
    font-size: small;
    font-weight: bold;
    text-align: left;
    color: ${(props: TextProps) => props.color && props.color};
`;

export const ClampText = styled(ClampLines)<{ color?: string }>`
    font-size: small;
    font-weight: bold;
    text-align: left;
    color: ${(props: TextProps) => props.color && props.color};
`;
