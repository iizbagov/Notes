import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useReducer } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import { reducer, initialState } from "./store";
import { Action } from './components/types/notesInterface';
import MyContext from "./components/Context";



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  function asyncMiddleware(dispatch: (action: Action) => void) {
    return (action:(dispatch: (action: Action) => void, ...args: any[]) => void, ...args: any[]) => {
      return action.apply(null, [dispatch, ...args]);
    };
  }

  return (
    <MyContext
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
    </MyContext>
  );
}

export default App;
