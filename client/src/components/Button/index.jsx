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

// 1 - tutorial typescript
// 2 - what is better to use for props (interface | type)
// 3 - Omit, Pick
// 4 - no any type in your code
// 5 - refactor ALL components
// 6 - generics
//
//
