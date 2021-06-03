import styled from "@emotion/styled";
import { Link, LinkProps } from "react-router-dom";
import colors from "../common/colors";

const BaseLink = styled(Link)`
  text-decoration: none;
  color: ${colors.linkColorLight};
`;

export function AppLink(props: LinkProps) {
  const { children, ...rest } = props;

  return <BaseLink {...rest}>{children}</BaseLink>;
}
