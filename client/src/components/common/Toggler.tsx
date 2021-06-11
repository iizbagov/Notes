import styled from "@emotion/styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDarkMode } from "../../useDarkModeHook";
import { Themes } from "../types/enums";
import colors from "./colors";

type Props = {
  onClick: any;
};

const Switcher = styled("div")`
  position: absolute;
  left: 50px;
  bottom: 50px;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const BaseToggler = styled("input")`
    width: 0;
    height: 0;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &:before {
        content: '';
        position:absolute;
        display: block;
        background-color: ${({ theme }) => theme.buttonColor};
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
        height: 40px;
        width: 80px;
    }
    &:after {
        position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    top: 7px;
    left: 7px;
    background-color: ${({ theme }) => theme.noteBgColor};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    }

    &:checked:after {
        -webkit-transform: translateX(36px);
        -ms-transform: translateX(36px);
        transform: translateX(36px);
    }
  }
`;

const ThemeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 11px;
  ${({ theme }) =>
    theme.buttonColor === colors.activeLight ? "right: -8px" : "left: 8px"};
  color: ${({ theme }) => theme.noteBgColor};
`;

function Toggler(props: Props) {
  library.add(faSun, faMoon);
  const [themeState, toggleTheme] = useDarkMode();
  console.log(themeState);
  return (
    <Switcher>
      <BaseToggler
        type="checkbox"
        onClick={props.onClick}
        checked={
          window.localStorage.getItem("theme") === "light" ? false : true
        }
      />
      {window.localStorage.getItem("theme") === "light" ? (
        <ThemeIcon icon={faSun} />
      ) : (
        <ThemeIcon icon={faMoon} />
      )}
    </Switcher>
  );
}

export default Toggler;
