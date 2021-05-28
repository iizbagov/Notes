import "../../index.css";
import Button from "../Button";
import Popup from "../Popup";
import { Link } from "react-router-dom";
import { Context } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import { getNotes } from "../../store";
import Loader from "../Loader";
import { PropsT, NoteData } from "../../store/types/notesInterface";

function Notes<T>(props: T) {
  const context = useContext(Context);
  console.log(context);
  const dispatch = context.dispatchMiddlaware;
  const notes = context.state.notes;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => dispatch(getNotes), [getNotes]);

  return (
    <div className="notes">
      {open ? (
        <Popup
          setOpen={() => {
            setOpen(!open);
          }}
        />
      ) : null}
      <div className="header">
        <h2 className="header-title">Notes</h2>
        <h4 className="header-subtitle">
          Enter your note or create a new note
        </h4>
      </div>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
        text="+"
      />
      <div className="notes__container">
        {notes.length > 0 ? (
          notes.map((note: NoteData) => {
            return (
              <div key={note._id} className="note-link_container">
                <Link to={`/notes/${note._id}`}>
                  <div className="note-link">
                    <h2>{note.title}</h2>
                    <p>{note.text}</p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="notes__container-desc">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
