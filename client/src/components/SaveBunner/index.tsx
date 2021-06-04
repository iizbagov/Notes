import styled from "@emotion/styled";
import { useEffect } from "react";
import colors from "../common/colors";

type Props = {
  onClose: () => void;
};

const StyledBunner = styled("div")`
  position: absolute;
  bottom: 50px;
  right: 50%;
  padding: 15px;
  background: ${({ theme }) =>
    theme.isCompleted ? theme.buttonColor.light : theme.buttonColor.dark};
  color: ${({ theme }) =>
    theme.isCompleted ? theme.mainBackground.light : theme.mainBackground.dark};
  transform: translate(50%, 0);
  border-radius: 10px;
`;

function SaveBunner(props: Props) {
  useEffect(() => {
    setTimeout(() => {
      props.onClose();
    }, 2000);
  }, []);
  return <StyledBunner>Your data was successfully saved</StyledBunner>;
}

export default SaveBunner;
