import "../../index.css";

function Button(props) {
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
