import "../../index.css";
import Button from "../Button";
import { useState } from "react";
import { useContext } from "react";
import { createNote } from "../../store/actions";
import { AppContext } from "../Context";

type PopupProps = {
  setOpen: () => void;
}

function Popup(props: PopupProps) {
  const context = useContext(AppContext);
  const [noteValues, setNoteValues] = useState({
    title: "",
    text: "",
  });
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;

  function createNoteData() {
    const title = noteValues.title;
    const text = noteValues.text;
    if (title.trim() !== "" && text.trim() !== "") {
      dispatch(createNote, notes, noteValues);
      props.setOpen();
    }
  }

  return (
    <div className="popup">
      <div className="popup__container">
        <input
          onChange={(e) =>
            setNoteValues((node) => ({ ...node, title: e.target.value }))
          }
          placeholder="Title"
        ></input>
        <textarea
          onChange={(e) =>
            setNoteValues((node) => ({ ...node, text: e.target.value }))
          }
          placeholder="Text"
        ></textarea>
        <Button onClick={createNoteData}>Create Note</Button>
      </div>
      <Button
        onClick={() => {
          props.setOpen();
        }}
        
      > </Button>
    </div>
  );
}

export default Popup;
