import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const LoaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

const DualRing = styled("div")`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.buttonColor};
    border-color: ${({ theme }) => theme.buttonColor} transparent
      ${({ theme }) => theme.buttonColor} transparent;
    animation: ${LoaderAnimation} 1.2s linear infinite;
  }
`;

function Loader() {
  return <DualRing></DualRing>;
}

export default Loader;
