import { useContext } from "react";
import { AppContext } from "../Context";
import { } from "../types/notesInterface";
import Button from "../common/Button";
import styled from "@emotion/styled";
import { CenterAbsolute, PopupAbsolute } from "../common/Position/Position";
import { FlexCenter } from "../common/Position/Flex";
import LightStyles from "../common/colors";

const StyledErrorButton = styled(Button)`
    ${FlexCenter}
    font-size: 22px;
    margin-top: 30px;
    width: 150px;
    height: 50px;
    margin-right: 20px;
  `
const ErrPopup = styled('div')`
  z-index: 100;
  content: '';
  height: 100vh;
  width: 100%;
  background: ${LightStyles.shadowColor};
  ${PopupAbsolute}
  border-radius: 0;
`

const ErrContainer = styled('div')`
  ${CenterAbsolute}
  z-index: 15;
  background: #fff;
  height: 500px;
  width: 400px;
  font-size: 25px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`
const ErrButtons = styled('div')`
display: flex;
`

function ErrorPopup() {
  const context = useContext(AppContext);
  const error = context.state.error;

  

  return (
    <ErrPopup>
      <ErrContainer>
        <div>Your data don't be saved!!!</div>
        <ErrButtons>
          <StyledErrorButton
            onClick={error.onRetry
          }
          > Try again</StyledErrorButton>
          <StyledErrorButton
            onClick={error.onCancel}
          > Cansel</StyledErrorButton>
        </ErrButtons>
      </ErrContainer>
    </ErrPopup>
  );
}

export default ErrorPopup;
