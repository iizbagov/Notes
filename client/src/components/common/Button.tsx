import styled from "@emotion/styled";
import { ReactElement } from "react";

type Props = {
  onClick: () => void;
  onDoubleClick?: () => void;
  className?: string;
  children: ReactElement | string;
};

const BaseButton = styled("button")`
  border-radius: 12px;
  border: none;
  background-color: #ffc102;
  color: #f8f8f8;
  cursor: pointer;
`;

const StyledButton = ({ className, children }: Props) => {
  return <BaseButton className={className}>{children}</BaseButton>;
};

function Button(props: Props) {
  return (
    <div onClick={props.onClick} onDoubleClick={props.onDoubleClick}>
      <StyledButton onClick={props.onClick} className={props.className}>
        {props.children}
      </StyledButton>
    </div>
  );
}

export default Button;
