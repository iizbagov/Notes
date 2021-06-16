import styled from "@emotion/styled";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
  text: string;
};

const StyledBunner = styled("div")`
  position: absolute;
  bottom: 50px;
  right: 50%;
  padding: 15px;
  background: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.mainBackground};
  transform: translate(50%, 0);
  border-radius: 10px;
`;

function Bunner(props: Props, text: string) {
  useEffect(() => {
    setTimeout(props.onClose, 2000);
  }, [props.onClose]);
  return <StyledBunner>{text}</StyledBunner>;
}

export default Bunner;
