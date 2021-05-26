import React from "react";

export const Context = React.createContext();

function MyContext(props) {
  return (
    <Context.Provider value={props.value}>{props.children}</Context.Provider>
  );
}

export default MyContext;
