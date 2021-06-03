import styled from "@emotion/styled";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type Props = {
    to: string;
    children: ReactElement;
}

const BaseLink = styled(Link)`
color: #000;
text-decoration: none;
color: #828282;
`

export function AppLink(props : Props) {
    return(
        <BaseLink to={props.to}>{props.children}</BaseLink>
    )
}