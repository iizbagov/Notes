import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useCallback, useReducer, useState } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import { reducer, initialState } from "./store";
import { Action } from "./components/types/notesInterface";
import MyContext from "./components/Context";
import colors from "./components/common/colors";
import { ThemeProvider } from "@emotion/react";
import { ThemesEnum } from "./components/types/enums";

const lightTheme = {
  mainBackground: {
    light: colors.mainColorLight,
    dark: colors.mainColorDark,
  },
  titleColor: {
    light: colors.titleColorLight,
    dark: colors.titleColorDark,
  },
  headersColor: {
    light: colors.headersColorLight,
    dark: colors.headersColorDark,
  },
  buttonColor: {
    light: colors.activeLight,
    dark: colors.activeDark,
  },
  linkColor: {
    light: colors.linkColorLight,
    dark: colors.linkColorDark,
  },
  noteBgColor: {
    light: colors.noteBgLight,
    dark: colors.noteBgDark,
  },
  isCompleted: true,
};

const darkTheme = {
  mainBackground: {
    light: colors.mainColorLight,
    dark: colors.mainColorDark,
  },
  titleColor: {
    light: colors.titleColorLight,
    dark: colors.titleColorDark,
  },
  headersColor: {
    light: colors.headersColorLight,
    dark: colors.headersColorDark,
  },
  buttonColor: {
    light: colors.activeLight,
    dark: colors.activeDark,
  },
  linkColor: {
    light: colors.linkColorLight,
    dark: colors.linkColorDark,
  },
  noteBgColor: {
    light: colors.noteBgLight,
    dark: colors.noteBgDark,
  },
  isCompleted: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [themeState, setThemeState] = useState<
    ThemesEnum.light | ThemesEnum.dark
  >(ThemesEnum.light);

  const changeTheme = useCallback(
    (theme: ThemesEnum.light | ThemesEnum.dark) => {
      setThemeState(theme);
    },
    [setThemeState]
  );

  function asyncMiddleware(dispatch: (action: Action) => void) {
    return (
      action: (dispatch: (action: Action) => void, ...args: any[]) => void,
      ...args: any[]
    ) => {
      return action.apply(null, [dispatch, ...args]);
    };
  }

  return (
    <MyContext
      value={{
        state,
        dispatchMiddleware: asyncMiddleware(dispatch),
        themeState: themeState,
        themeChanger: changeTheme,
      }}
    >
      <div className="App">
        <ThemeProvider
          theme={themeState === ThemesEnum.light ? lightTheme : darkTheme}
        >
          <BrowserRouter>
            <Route exact path="/" render={() => <Notes />} />
            <Route
              path="/notes/:id"
              render={(props) => {
                return <Note />;
              }}
            />
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </MyContext>
  );
}

export default App;
