import { useContext } from "react";
import { AppContext } from "../Context";
import { } from "../types/notesInterface";
import Button from "../Button";

function ErrorPopup<T>(props: T) {
  const context = useContext(AppContext);
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
          > Try again</Button>
          <Button
            onClick={() => {
              error.onCancel();
            }}
          > Cansel</Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;
