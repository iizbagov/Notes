import "../../index.css";
import Button from "../Button";
import { useState } from "react";
import { Context } from "../MyContext/index.js";
import { useContext } from "react";
import { createNote } from "../../store/actions";
import { PropsT } from "../../store/types/notesInterface";

function Popup(props: PropsT) {
  const context = useContext(Context);
  const [noteValues, setNoteValues] = useState({
    title: "",
    text: "",
  });
  const dispatch = context.dispatchMiddlaware;
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
        <Button onClick={createNoteData} text="Create note" />
      </div>
      <Button
        onClick={() => {
          props.setOpen();
        }}
        text=""
      />
    </div>
  );
}

export default Popup;
