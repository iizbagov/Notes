import "../../index.css";
import Button from "../common/Button";
import Popup from "../Popup";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getNotes } from "../../store";
import Loader from "../Loader";
import { NoteData } from "../types/notesInterface";
import { AppContext } from "../Context";
import styled from "@emotion/styled";
import { Flex, FlexCenter } from "../common/Position/Flex";
import { FixedBot } from "../common/Position/Position";
import LightStyles from "../common/colors";

const StyledAddButton = styled(Button)`
  ${FixedBot}
  right: 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 36px;
  cursor: pointer;
`;

const StyleNotes = styled("div")`
  position: relative;
  ${Flex}
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StyledHeader = styled("div")`
  text-align: center;
  margin-top: 25px;
`;
const StyledTitle = styled("h2")`
  margin-bottom: 25px;
`;
const NotesContainer = styled("div")`
  margin-top: 30px;
  height: 100%;
  width: 600px;
`;
const NotesLoader = styled("div")`
  height: 100%;
  ${FlexCenter}
`;

const NoteLink = styled('div')`
  width: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover {
    box-shadow: 5px 5px 5px ${LightStyles.noteShadow};
  }
`

const NoteP = styled('p')`
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

function Notes() {
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => dispatch(getNotes), [getNotes]);

  return (
    <StyleNotes>
      {open ? (
        <Popup
          setOpen={() => {
            setOpen(!open);
          }}
        />
      ) : null}
      <StyledHeader>
        <StyledTitle>Notes</StyledTitle>
        <h4>Enter your note or create a new note</h4>
      </StyledHeader>
      <StyledAddButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        +
      </StyledAddButton>
      <NotesContainer>
        {notes.length > 0 ? (
          notes.map((note: NoteData) => {
            return (
              <div key={note._id}>
                <Link to={`/notes/${note._id}`}>
                  <NoteLink>
                    <h2>{note.title}</h2>
                    <NoteP>{note.text}</NoteP>
                  </NoteLink>
                </Link>
              </div>
            );
          })
        ) : (
          <NotesLoader>
            <Loader />
          </NotesLoader>
        )}
      </NotesContainer>
    </StyleNotes>
  );
}

export default Notes;
