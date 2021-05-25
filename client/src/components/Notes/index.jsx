import "../../index.css";
import Header from "../Header";
import Button from "../Button";
import Popup from "../Popup";
import { Link } from "react-router-dom";
import { Context } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import { getNotes } from "../../store";
import { setOpen } from "../../store/actions";

// dispatchMiddlaware

function Notes(props) {
  const context = useContext(Context);
  const dispatch = context.dispatchMiddlaware;
  const notes = context.state.notes;
  const open = context.state.open;

  useEffect(() => dispatch(getNotes), [getNotes]);

  return (
    <div className="notes">
      {open ? <Popup /> : null}
      <Header />
      <Button
        onClick={() => {
          dispatch(setOpen, !open);
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
            <div className="notes__container-desc-text">
              Sorry but now you haven`t any note, if you want create it push on
              create button
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
