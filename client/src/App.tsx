import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { createContext, useReducer } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import { reducer, initialState } from "./store";
import { Action, ContextState } from './store/types/notesInterface';

export const AppContext = createContext<ContextState>({} as ContextState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  function asyncMiddleware(dispatch: (action: Action) => void) {
    return (action:(dispatch: (action: Action) => void, ...args: any[]) => void, ...args: any[]) => {
      return action.apply(null, [dispatch, ...args]);
    };
  }

  console.log(dispatch);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatchMiddleware: asyncMiddleware(dispatch),
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" render={() => <Notes />} />
          <Route
            path="/notes/:id"
            render={(props) => {
              return <Note />;
            }}
          />
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
