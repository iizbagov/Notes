import "../../index.css";
import Button from "../common/Button";
import { useState } from "react";
import { useContext } from "react";
import { createNote } from "../../store/actions";
import { AppContext } from "../Context";
import styled from "@emotion/styled";
import { centerAbsoluteCss } from "../common/Position";
import colors from "../common/colors";
import { Column } from "../common/Flex";
import { useHistory } from "react-router";

type Props = {
  setOpen: () => void;
};

const StyledCreateButton = styled(Button)`
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
  height: 50px;
  width: 200px;
  border-radius: 10px;
  font-size: 18px;
`;

const StyledDarkFone = styled(Button)`
  z-index: 10;
  content: "";
  height: 100vh;
  width: 100%;
  background: ${colors.popupBg};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 0;
`;

const PopupContainer = styled(Column)`
  ${centerAbsoluteCss}
  z-index: 15;
  background: ${({ theme }) => theme.mainBackground};
  height: 500px;
  width: 400px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const PopupInput = styled("input")`
  margin-bottom: 50px;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  font-size: 22px;
  border: 1px solid ${colors.headersColorLight};
  padding: 0 15px;
`;

const PopupTextarea = styled("textarea")`
  margin-bottom: 50px;
  padding: 15px;
  height: 150px;
  width: 250px;
  font-size: 22px;
  border: 1px solid ${colors.headersColorLight};
  border-radius: 10px;
  resize: none;
  letter-spacing: -0.09em;
`;

function Popup(props: Props) {
  const context = useContext(AppContext);
  const [noteValues, setNoteValues] = useState({
    title: "",
    text: "",
  });
  const dispatch = context.dispatchMiddleware;
  const notes = context.state.notes;
  const isAuth = context.state.isAuthenticated;
  const history = useHistory();

  function createNoteData() {
    const title = noteValues.title;
    const text = noteValues.text;
    if (title.trim() !== "" && text.trim() !== "") {
      dispatch(createNote, notes, noteValues);
      props.setOpen();
    }
  }

  return (
    <div>
      <PopupContainer>
        <PopupInput
          onChange={(e) =>
            setNoteValues((node) => ({ ...node, title: e.target.value }))
          }
          placeholder="Title"
        ></PopupInput>
        <PopupTextarea
          onChange={(e) =>
            setNoteValues((node) => ({ ...node, text: e.target.value }))
          }
          placeholder="Text"
        ></PopupTextarea>
        <StyledCreateButton onClick={createNoteData}>
          Create Note
        </StyledCreateButton>
      </PopupContainer>
      <StyledDarkFone
        onClick={() => {
          if (!isAuth) {
            history.push("/");
          }
          props.setOpen();
        }}
      >
        {" "}
      </StyledDarkFone>
    </div>
  );
}

export default Popup;
