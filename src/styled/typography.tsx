import ClampLines from "react-clamp-lines";
import styled, { css } from "styled-components";

interface TextProps {
    color?: string | undefined;
    size?: string | number | undefined;
    align?: string | undefined;
    fWeight?: string | undefined;
}

const commonTextProps = css<TextProps>`
    font-size: ${(props) => props.size && props.size};
    font-weight: ${(props) => props.fWeight && props.fWeight};
    text-align: ${(props) => props.align && props.align};
    color: ${(props: TextProps) => props.color && props.color};
`;

export const Text = styled.span<TextProps>`
    ${commonTextProps}
`;

export const ClampText = styled(ClampLines)<TextProps>`
    ${commonTextProps}
`;
