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
import { Themes } from "./components/types/enums";
import Register from "./components/Register";
import LoginForm from "./components/LoginWindow";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

const lightTheme = {
  mainBackground: colors.mainColorLight,
  titleColor: colors.titleColorLight,
  headersColor: colors.headersColorLight,
  buttonColor: colors.activeLight,
  linkColor: colors.linkColorLight,
  noteBgColor: colors.noteBgLight,
};

const darkTheme = {
  mainBackground: colors.mainColorDark,
  titleColor: colors.titleColorDark,
  headersColor: colors.headersColorDark,
  buttonColor: colors.activeDark,
  linkColor: colors.linkColorDark,
  noteBgColor: colors.noteBgDark,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [themeContext, setthemeContext] = useState<Themes.light | Themes.dark>(
    Themes.light
  );

  const changeTheme = useCallback(
    (theme: Themes.light | Themes.dark) => {
      setthemeContext(theme);
    },
    [setthemeContext]
  );

  const middleware = useCallback(
    (
      action: (dispatch: (action: Action) => void, ...args: any[]) => void,
      ...args: any[]
    ) => {
      return action.apply(null, [dispatch, ...args]);
    },
    [dispatch]
  );

  function asyncMiddleware(dispatch: (action: Action) => void) {
    return middleware;
  }

  return (
    <MyContext
      value={{
        state,
        dispatchMiddleware: asyncMiddleware(dispatch),
        themeState: themeContext,
        themeChanger: changeTheme,
      }}
    >
      <div className="App">
        <ThemeProvider
          theme={state.theme === Themes.light ? lightTheme : darkTheme}
        >
          <BrowserRouter>
            <Route exact path="/" render={() => <LoginForm />} />
            <AuthenticatedRoute exact path="/notes" render={() => <Notes />} />
            <AuthenticatedRoute path="/notes/:id" render={() => <Note />} />
            <Route path="/register" render={() => <Register />} />
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </MyContext>
  );
}

export default App;
