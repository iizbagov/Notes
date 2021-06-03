import "../../index.css";
import Button from "../common/Button";
import Popup from "../Popup";
import { useContext, useEffect, useState } from "react";
import { getNotes } from "../../store";
import Loader from "../Loader";
import { NoteData } from "../types/notesInterface";
import { AppContext } from "../Context";
import styled from "@emotion/styled";
import { Column, Row } from "../common/Flex";
import colors from "../common/colors";
import space from "../common/space";
import { AppLink } from "../common/AppLink";
import { Theme, useTheme } from "@emotion/react";

const StyledAddButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 36px;
  cursor: pointer;
`;

const StyledNotes = styled(Column)`
  position: relative;
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
  color: ${colors.titleColorLight};
`;
const StyledSubtitle = styled("h4")`
  color: ${colors.titleColorLight};
`;
const NotesContainer = styled("div")`
  ${space.defaultTopMargin}
  height: 100%;
  width: 600px;
`;
const NotesLoader = styled(Row)`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const NoteLink = styled("div")`
  width: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  ${space.textBottomMargin}
  &:hover {
    box-shadow: 5px 5px 5px ${colors.noteShadow};
  }
`;
const NoteTitle = styled("h2")<Theme>`
  color: ${(props: Theme) => {
    return props.theme.isCompleted
      ? props.theme.titleColor.light
      : props.theme.titleColor.dark;
  }};
  ${space.textBottomMargin}
`;

const NoteP = styled("p")`
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Notes() {
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;
  const [open, setOpen] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => dispatch(getNotes), [getNotes]);

  return (
    <StyledNotes>
      {open ? (
        <Popup
          setOpen={() => {
            setOpen(!open);
          }}
        />
      ) : null}
      <StyledHeader>
        <StyledTitle>Notes</StyledTitle>
        <StyledSubtitle>Enter your note or create a new note</StyledSubtitle>
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
                <AppLink to={`/notes/${note._id}`}>
                  <NoteLink>
                    <NoteTitle>{note.title}</NoteTitle>
                    <NoteP>{note.text}</NoteP>
                  </NoteLink>
                </AppLink>
              </div>
            );
          })
        ) : (
          <NotesLoader>
            <Loader />
          </NotesLoader>
        )}
      </NotesContainer>
    </StyledNotes>
  );
}

export default Notes;
