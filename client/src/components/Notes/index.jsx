import "../../index.css";
import Button from "../Button";
import Popup from "../Popup";
import { Link } from "react-router-dom";
import { Context } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import { getNotes } from "../../store";
import Loader from "../Loader";

function Notes(props) {
  const context = useContext(Context);
  const dispatch = context.dispatchMiddlaware;
  const notes = context.state.notes;
  const [open, setOpen] = useState(false);

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
          notes.map((note) => {
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
