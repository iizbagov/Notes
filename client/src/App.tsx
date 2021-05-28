import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useReducer } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import MyContext from "./components/MyContext";
import { reducer, initialState } from "./store";
import { argsArray, PropsT } from './store/types/notesInterface';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function asyncMiddleware(dispatch: Function) {
    return (action:Function, ...args: argsArray) => {
      return action.apply(null, [dispatch, ...args]);
    };
  }

  return (
    <MyContext
      value={{
        state,
        dispatchMiddlaware: asyncMiddleware(dispatch),
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" render={() => <Notes />} />
          <Route
            path="/notes/:id"
            render={(props: PropsT) => {
              return <Note />;
            }}
          />
        </BrowserRouter>
      </div>
    </MyContext>
  );
}

export default App;
