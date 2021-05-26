import { useContext } from "react";
import Button from "../Button";
import { Context } from "../MyContext";

function ErrorPopup(props) {
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
