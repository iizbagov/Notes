import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useEffect, useReducer, useState } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import MyContext from "./components/MyContext";
import { reducer, initialState, getNotes } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function asyncMiddleware(dispatch) {
    return (action, ...args /*код тут*/) => action(dispatch, args);
  }

  // dispatchMiddlaware(action, notes)

  // action(dispatch, notes, 1,2,3,4)
  // getNotes()(dispatch) -> getNotes()

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
            onLeave={() => alert("stoj")}
          />
        </BrowserRouter>
      </div>
    </MyContext>
  );
}

export default App;
