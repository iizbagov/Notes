import "../../index.css";
import { PropsT } from "../../store/types/notesInterface";

function Button(props: PropsT) {
  return (
    <div
      className="button"
      onClick={props.onClick !== undefined ? props.onClick : null}
      onDoubleClick={
        props.onDoubleClick !== undefined ? props.onDoubleClick : null
      }
    >
      <button>{props.text}</button>
    </div>
  );
}


export default Button;

