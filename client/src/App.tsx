import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useReducer } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import { reducer, initialState } from "./store";
import { Action } from "./components/types/notesInterface";
import MyContext from "./components/Context";
import colors from "./components/common/colors";
import { ThemeProvider } from "@emotion/react";
import { ThemeIterface } from "./components/types/styleIterface";

export const theme: ThemeIterface = {
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function asyncMiddleware(dispatch: (action: Action) => void) {
    return (
      action: (dispatch: (action: Action) => void, ...args: any[]) => void,
      ...args: any[]
    ) => {
      return action.apply(null, [dispatch, ...args]);
    };
  }

  console.log(`theme`, theme);

  return (
    <MyContext
      value={{
        state,
        dispatchMiddleware: asyncMiddleware(dispatch),
      }}
    >
      <div className="App">
        <ThemeProvider theme={theme}>
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
