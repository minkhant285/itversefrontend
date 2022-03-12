import styled from "styled-components";

interface TitleProps {
    size?: string | number | undefined;
}

interface TextProps {
    color?: string | undefined;
}

export const Title = styled.span<TitleProps>`
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
