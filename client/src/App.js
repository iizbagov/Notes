import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { useEffect, useReducer, useState } from "react";
import Notes from "./components/Notes";
import Note from "./components/Note";
import MyContext from "./components/MyContext";
import { reducer, initialState } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext
      value={{
        state,
        dispatch,
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
