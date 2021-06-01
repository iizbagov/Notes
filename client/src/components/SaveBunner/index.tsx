import { useEffect } from "react";
import { SaveBunnerProps} from "../../store/types/notesInterface";

function SaveBunner(props: SaveBunnerProps) {
  useEffect(() => {
    setTimeout(() => {
      props.onClose();
    }, 3000);
  }, []);
  return <div className="save__bunner">Your data was successfully saved</div>;
}

export default SaveBunner;
