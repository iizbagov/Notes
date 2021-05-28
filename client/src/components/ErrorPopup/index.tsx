import { useContext } from "react";
import { PropsT } from "../../store/types/notesInterface";
import Button from "../Button";
import { Context } from "../MyContext/index.js";

function ErrorPopup(props: PropsT) {
  const context = useContext(Context);
  const error = context.state.error;

  return (
    <div className="error__popup">
      <div className="error__popup-container">
        <div>Your data don't be saved!!!</div>
        <div className="error__popup-buttons">
          <Button
            onClick={() => {
              error.onRetry();
            }}
            text="Try again"
          />
          <Button
            onClick={() => {
              error.onCancel();
            }}
            text="Cansel"
          />
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;
