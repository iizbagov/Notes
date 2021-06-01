import { useHistory, useParams } from "react-router";
import "../../index.css";
import Button from "../Button";
import { library} from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faSave,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { getNotes, handleNoteChanges } from "../../store/actions";
import { removeNote } from "../../store/actions";
import ErrorPopup from "../ErrorPopup";
import SaveBunner from "../SaveBunner";
import { NoteData, Params } from "../types/notesInterface";
import { AppContext } from "../Context";

function Note<T>(props: T) {
  library.add(faTrash, faSave, faLongArrowAltLeft);
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;
  const hasError = context.state.error.hasError;
  const history = useHistory();
  const params: Params = useParams()
  const id: string = params.id;
  const [noteValues, setNoteValues] = useState<NoteData>({
    title: '',
    text: '',
    _id: ''
  });
  const [inputIsActive, setInputIsActive] = useState(false);
  const [textareaIsActive, setTextareaIsActive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (notes.length > 0) {
      const note = notes.find((note: NoteData) => {
        return note._id === id;
      });
      setNoteValues({
        title: note!.title,
        text: note!.text,
        _id: note!._id,
      });
    }
  }, [notes]);

  useEffect(() => {
    dispatch(getNotes);
  }, [getNotes]);

  useEffect(() => {}, [hasError]);

  function putSomeData() {
    dispatch(handleNoteChanges, notes, noteValues);
    setIsSaved(true);
  }

  function changeTitle(value: boolean) {
    setInputIsActive(value);
    textareaIsActive && setTextareaIsActive(!textareaIsActive);
  }

  function changeText(value: boolean) {
    inputIsActive && setInputIsActive(!inputIsActive);
    setTextareaIsActive(value);
  }

  function createNoteData() {
    inputIsActive && changeTitle(false);
    textareaIsActive && changeText(false);
    putSomeData();
  }

  function resetNote(index: string) {
    dispatch(removeNote, notes, index);
    history.push("/");
  }

  function goToNotes() {
    if (isSaved === false) {
      history.push("/");
      inputIsActive && changeTitle(false);
      textareaIsActive && changeText(false);
    }
  }

  function onClose() {
    setIsSaved(false);
  }

  return (
    <div className="note__container">
      {notes.length > 0 ? (
        <div className="note">
          {hasError ? <ErrorPopup /> : null}
          {isSaved ? <SaveBunner onClose={onClose} /> : null}
          <div className="note__header">
            <div className="note__header-back_button">
              <Button
                onClick={goToNotes}
              >
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Button>
            </div>
            <div
              className="note__header-title"
              onClick={() => changeTitle(true)}
            >
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
                  }}
                ></input>
              ) : (
                <h1>{noteValues.title}</h1>
              )}
            </div>
            <Button
              onClick={() => {
                !inputIsActive && !textareaIsActive
                  ? resetNote(id)
                  : createNoteData();
              }}
            ><FontAwesomeIcon icon={!inputIsActive && !textareaIsActive ? faTrash : faSave}/></Button>
          </div>
          <div className="note__wrapper">
            <div className="note__content" onClick={() => changeText(true)}>
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
                  }}
                ></textarea>
              ) : (
                <div>{noteValues.text}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Note;
