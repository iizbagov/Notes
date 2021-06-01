import { ReactElement } from "react";
import "../../index.css";

type ButtonProps = {
  onClick?: () => void;
  onDoubleClick?: () => void;
  children: ReactElement | string;
}

function Button(props: ButtonProps) {
  return (
    <div
      className="button"
      onClick={ props.onClick }
      onDoubleClick={
         props.onDoubleClick 
      }
    >
      <button>{props.children}</button>
    </div>
  );
}


export default Button;

