import styled from "@emotion/styled";
import { useEffect } from "react";
import LightStyles from "../common/colors";

type Props = {
  onClose: () => void;
}

const StyledBunner = styled('div')`
  position: absolute;
  bottom: 50px;
  right: 50%;
  padding: 15px;
  background: ${LightStyles.activeLight};
  color: ${LightStyles.mainColorLight};
  transform: translate(50%, 0);
  border-radius: 10px;
`

function SaveBunner(props: Props) {
  useEffect(() => {
    setTimeout(() => {
      props.onClose();
    }, 2000);
  }, []);
  return <StyledBunner>Your data was successfully saved</StyledBunner>;
}

export default SaveBunner;
