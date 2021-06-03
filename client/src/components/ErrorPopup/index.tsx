import { useContext } from "react";
import { AppContext } from "../Context";
import Button from "../common/Button";
import styled from "@emotion/styled";
import { centerAbsoluteCss } from "../common/Position";
import { Column, Row } from "../common/Flex";
import colors from "../common/colors";
import space from "../common/space";

const StyledErrorButton = styled(Button)`
  font-size: 22px;
  ${space.defaultTopMargin}
  width: 150px;
  height: 50px;
  margin-right: 20px;
`;
const ErrPopup = styled("div")`
  z-index: 100;
  content: "";
  height: 100vh;
  width: 100%;
  background: ${colors.popupBg};
  border-radius: 0;
`;

const ErrContainer = styled(Column)`
  ${centerAbsoluteCss}
  z-index: 15;
  background: #fff;
  height: 500px;
  width: 400px;
  font-size: 25px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const ErrButtons = styled(Row)``;

function ErrorPopup() {
  const context = useContext(AppContext);
  const error = context.state.error;

  return (
    <ErrPopup>
      <ErrContainer>
        <div>Your data don't be saved!!!</div>
        <ErrButtons>
          <StyledErrorButton onClick={error.onRetry}>
            Try again
          </StyledErrorButton>
          <StyledErrorButton onClick={error.onCancel}>Cansel</StyledErrorButton>
        </ErrButtons>
      </ErrContainer>
    </ErrPopup>
  );
}

export default ErrorPopup;
