import "../../index.css";
import Button from "../Button";
import { useState } from "react";
import { Context } from "../MyContext";
import { useContext } from "react";
import { setOpen, createNote } from "../../store/actions";

function Popup(props) {
  const context = useContext(Context);
  const [noteValues, setNoteValues] = useState({
    title: "",
    text: "",
  });
  const dispatch = context.dispatchMiddlaware;
  const open = context.state.open;
  const notes = context.state.notes;

  function createNoteData() {
    const title = noteValues.title;
    const text = noteValues.text;
    if (title.trim() !== "" && text.trim() !== "") {
      dispatch(createNote, notes, noteValues);
      dispatch(setOpen, !open);
    }
  }

  return (
    <div className="popup" to="/popup">
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
        <Button onClick={createNoteData} text="Create note" />
      </div>
      <Button
        onClick={() => {
          dispatch(setOpen, !open);
        }}
        text=""
      />
    </div>
  );
}

export default Popup;
