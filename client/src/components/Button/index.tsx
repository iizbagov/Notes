import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import "../../index.css";

type Props = {
  onClick: () => void;
  onDoubleClick?: () => void;
  children: ReactElement | string;
}

const StyledButton = styled('button')`
  color: #f8f8f8;
  background: #ffc102;
  border: none;
  border-radius: 10px;
`

// const btn = css`{
//   color: #f8f8f8;
//   background: #ffc102;
//   border: none;
//   border-radius: 10px;
// }
// `;

function Button(props: Props) {
  return (
    <div
      onClick={ props.onClick }
      onDoubleClick={
         props.onDoubleClick 
      }
    >
      <StyledButton>{props.children}</StyledButton>
    </div>
  );
}


export default Button;

