import { useHistory, useParams } from "react-router";
import "../../index.css";
import Button from "../common/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
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
import Bunner from "../Bunner";
import { NoteData, Params } from "../types/notesInterface";
import { AppContext } from "../Context";
import styled from "@emotion/styled";
import { Column } from "../common/Flex";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import ThemeToggler from "../common/Toggler";
import { useDarkMode } from "../../useDarkModeHook";

const StyledRemoveButton = styled(Button)`
  position: absolute;
  top: 30px;
  right: 50px;
  height: 50px;
  width: 50px;
`;
const StyledBackButton = styled(Button)`
  position: absolute;
  top: 30px;
  left: 50px;
  height: 50px;
  width: 50px;
`;
const StyledNote = styled(Column)`
  position: relative;
  width: 100%;
  height: 100vh;
  align-items: center;
  background: ${({ theme }) => theme.mainBackground};
`;
const NoteHeader = styled("div")`
  text-align: center;
  margin: 30px 0;
  color: ${({ theme }) => theme.linkColor};
`;
const NoteWrapper = styled("div")`
  max-width: 1170px;
  min-width: 600px;
  margin: 0 auto;
`;
const NoteContent = styled("div")`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.linkColor};
`;
const NoteInput = styled(Input)`
  margin-top: -10px;
  width: 600px;
  height: 50px;
  border-radius: 10px;
  font-size: 22px;
  border: 1px solid ${({ theme }) => theme.headersColor};
  padding: 0 15px;
`;
const NoteTextarea = styled(Textarea)`
  margin-bottom: 50px;
  padding: 15px;
  height: 400px;
  width: 600px;
  font-size: 22px;
  border: 1px solid ${({ theme }) => theme.headersColor};
  border-radius: 10px;
  resize: none;
`;

function Note() {
  library.add(faTrash, faSave, faLongArrowAltLeft);

  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;
  const hasError = context.state.error.hasError;
  const history = useHistory();
  const params: Params = useParams();
  const id: string = params.id;
  const [, toggleTheme] = useDarkMode();
  const [noteValues, setNoteValues] = useState<NoteData>({
    title: "",
    text: "",
    _id: "",
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
  }, [notes, id]);

  useEffect(() => {
    dispatch(getNotes);
  }, [dispatch]);

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
    history.push("/notes");
  }

  function goToNotes() {
    if (isSaved === false) {
      history.push("/notes");
      inputIsActive && changeTitle(false);
      textareaIsActive && changeText(false);
    }
  }

  function onClose() {
    setIsSaved(false);
  }

  return (
    <div>
      {notes.length > 0 ? (
        <StyledNote>
          <ThemeToggler onClick={toggleTheme} />
          {hasError ? <ErrorPopup /> : null}
          {isSaved ? (
            <Bunner
              text={"Your data was successfully saved"}
              onClose={onClose}
            />
          ) : null}
          <NoteHeader>
            <div>
              <StyledBackButton onClick={goToNotes}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </StyledBackButton>
            </div>
            <div onClick={() => changeTitle(true)}>
              {inputIsActive ? (
                <NoteInput
                  value={noteValues.title}
                  onChange={(e) => {
                    setNoteValues((node) => {
                      return {
                        ...node,
                        title: e.target.value,
                      };
                    });
                  }}
                ></NoteInput>
              ) : (
                <h1>{noteValues.title}</h1>
              )}
            </div>
            <StyledRemoveButton
              onClick={() => {
                !inputIsActive && !textareaIsActive
                  ? resetNote(id)
                  : createNoteData();
              }}
            >
              <FontAwesomeIcon
                icon={!inputIsActive && !textareaIsActive ? faTrash : faSave}
              />
            </StyledRemoveButton>
          </NoteHeader>
          <NoteWrapper>
            <NoteContent onClick={() => changeText(true)}>
              {textareaIsActive ? (
                <NoteTextarea
                  value={noteValues.text}
                  onChange={(e) => {
                    setNoteValues((node) => {
                      return {
                        ...node,
                        text: e.target.value,
                      };
                    });
                  }}
                ></NoteTextarea>
              ) : (
                <div>{noteValues.text}</div>
              )}
            </NoteContent>
          </NoteWrapper>
        </StyledNote>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Note;
