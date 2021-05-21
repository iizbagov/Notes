import { useHistory, useParams } from "react-router";
import "../../index.css";
import Button from "../Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faSave,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../MyContext";
import { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import Disclaimer from "../Disclaimer";
import { getNotes, handleNoteChanges } from "../../store/actions";
import { removeNote } from "../../store/actions";
//
function Note(props) {
  library.add(faTrash, faSave, faLongArrowAltLeft);
  const context = useContext(Context);
  const dispatch = context.dispatch;
  const notes = context.state.notes;
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  const [noteValues, setNoteValues] = useState({});
  const [inputIsActive, setInputIsActive] = useState(false);
  const [textareaIsActive, setTextareaIsActive] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(notes);
  useEffect(() => {
    console.log("changed", notes);
    if (notes.length > 0) {
      const note = notes.find((note) => {
        return note._id === id;
      });
      setNoteValues({
        title: note.title,
        text: note.text,
        id: note._id,
      });
    }
  }, [notes]);

  useEffect(() => getNotes()(dispatch), [dispatch]);

  function putSomeData() {
    handleNoteChanges(notes, noteValues)(dispatch);
  }

  function changeTitle(value) {
    setInputIsActive(value);
    textareaIsActive && setTextareaIsActive(!textareaIsActive);
  }

  function changeText(value) {
    inputIsActive && setInputIsActive(!inputIsActive);
    setTextareaIsActive(value);
  }

  function createNoteData() {
    const title = noteValues.title;
    const text = noteValues.text;
    if (title.trim() !== "" && text.trim() !== "") {
      setOpen(!open);
    }
    inputIsActive && changeTitle();
    textareaIsActive && changeText();
    putSomeData();
    setIsSaved(true);
    setShowAlert(false);
  }

  function resetNote(index) {
    removeNote(notes, index)(dispatch);
    history.push("/");
  }

  function goToNotes() {
    setShowAlert(true);
    if (isSaved !== false) {
      history.push("/");
      inputIsActive && changeTitle(false);
      textareaIsActive && changeText(false);
      setShowAlert(false);
    }
  }

  function saveChanges() {
    putSomeData();
    setIsSaved(true);
  }

  function toggleTitle() {
    changeTitle(true);
    setShowAlert(false);
  }

  function toggleText() {
    changeText(true);
    setShowAlert(false);
  }

  return (
    <div className="note">
      <div className="note__header">
        <div className="note__header-back_button">
          {showAlert && <Disclaimer />}
          <Button
            onClick={goToNotes}
            text={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
          />
        </div>
        <div className="note__header-title" onClick={toggleTitle}>
          {inputIsActive ? (
            <input
              value={noteValues.title}
              onChange={(e) => {
                setNoteValues((node) => {
                  return {
                    ...node,
                    title: e.target.value,
                  };
                });
                setIsSaved(false);
              }}
            ></input>
          ) : notes.length > 0 ? (
            <h1>{noteValues.title}</h1>
          ) : (
            <Loader />
          )}
        </div>
        <Button
          onClick={() => {
            !inputIsActive && !textareaIsActive
              ? resetNote(id)
              : createNoteData();
          }}
          text={
            <FontAwesomeIcon
              icon={!inputIsActive && !textareaIsActive ? faTrash : faSave}
            />
          }
        />
      </div>
      <div className="note__wrapper">
        <div className="note__content" onClick={toggleText}>
          {textareaIsActive ? (
            <textarea
              value={noteValues.text}
              onChange={(e) => {
                setNoteValues((node) => {
                  return {
                    ...node,
                    text: e.target.value,
                  };
                });
                setIsSaved(false);
              }}
            ></textarea>
          ) : notes.length > 0 ? (
            <div>{noteValues.text}</div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;