import "../../index.css";
import { ButtonProps } from "../../store/types/notesInterface";

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

