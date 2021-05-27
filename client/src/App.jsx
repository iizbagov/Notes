import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useReducer } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import MyContext from "./components/MyContext";
import { reducer, initialState } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function asyncMiddleware(dispatch) {
    return (action, ...args) => {
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
