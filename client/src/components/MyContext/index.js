import React from "react";
import { PropsT } from "../../store/types/notesInterface";

export const Context = React.createContext();

function MyContext(props) {
  return (
    <Context.Provider value={props.value}>{props.children}</Context.Provider>
  );
}

export default MyContext;
