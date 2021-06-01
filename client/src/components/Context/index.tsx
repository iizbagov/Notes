import { createContext, ReactElement } from "react";
import { ContextState } from "../types/notesInterface";

type ContextProps = {
    value: ContextState;
    children: ReactElement;
}

export const AppContext = createContext<ContextState>({} as ContextState);


function MyContext (props: ContextProps) {
    return (
        <AppContext.Provider value={props.value}>{props.children}</AppContext.Provider>
    )
}

export default MyContext;