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
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@emotion/react";
import { ThemesEnum } from "../types/enums";
import { useDarkMode } from "../../useDarkModeHook";

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
  background: ${({ theme }) =>
    theme.isCompleted
      ? theme.mainBackground.light
      : theme.mainBackground.dark}};
`;

const StyledHeader = styled("div")`
  text-align: center;
  margin-top: 25px;
  color: ${({ theme }) => {
    return theme.isCompleted ? theme.titleColor.light : theme.titleColor.dark;
  }};
`;
const StyledTitle = styled("h2")`
  margin-bottom: 25px;
  color: ${({ theme }) => {
    return theme.isCompleted ? theme.titleColor.light : theme.titleColor.dark;
  }};
`;
const StyledSubtitle = styled("h4")`
  color: ${({ theme }) => {
    return theme.isCompleted ? theme.titleColor.light : theme.titleColor.dark;
  }};
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
  background: ${({ theme }) =>
    theme.isCompleted ? theme.noteBgColor.light : theme.noteBgColor.dark};
  padding: 15px;
  border-radius: 10px;
  ${space.textBottomMargin}
  &:hover {
    box-shadow: 5px 5px 5px ${colors.noteShadow};
  }
`;
const NoteTitle = styled("h2")`
  color: ${({ theme }) =>
    theme.isCompleted ? theme.titleColor.light : theme.titleColor.dark};
  ${space.textBottomMargin}
`;

const NoteP = styled("p")`
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) =>
    theme.isCompleted ? theme.titleColor.light : theme.titleColor.dark};
`;

const ThemeToggler = styled(Button)`
  position: absolute;
  cursor: pointer;
  left: 50px;
  bottom: 50px;
  height: 50px;
  width: 50px;
  font-size: 24px;
`;

function Notes() {
  library.add(faSun, faMoon);

  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;
  const [open, setOpen] = useState<boolean>(false);
  const [themeState, toggleTheme] = useDarkMode();

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

      <ThemeToggler onClick={toggleTheme}>
        {themeState === ThemesEnum.light ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </ThemeToggler>
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
