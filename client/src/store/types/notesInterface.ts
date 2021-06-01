import { ReactElement } from "react";


export interface NoteData {
  title: string;
  text: string;
  _id: string;
}

export interface Error {
  hasError: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

export interface InitialState {
  notes: Array<NoteData>;
  error: Error;
}

export type Action =
  {
    type:string;
  } & ({
    notes: Array<NoteData>;
  } & {
    payload: Error;
  } | {
    notes: Array<NoteData>;
    payload: Error;
  });

export interface Params {
  id: string;
}
export interface PopupProps {
  setOpen: () => void;
}
export interface ButtonProps {
  onClick?: () => void;
  onDoubleClick?: () => void;
  children: ReactElement | string;
}

export interface SaveBunnerProps {
  onClose: () => void;
}
export interface ContextState {
  state: InitialState;
  dispatchMiddleware: Function;
}

export interface ErrorPopupProps {

}

