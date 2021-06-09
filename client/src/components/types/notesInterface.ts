import { Themes } from "./enums";

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
  theme: Themes.light | Themes.dark;
}

export type Action = {
  type: string;
  payload:
    | {
        notes: Array<NoteData>;
      }
    | {
        error: Error;
      }
    | {
        notes: Array<NoteData>;
        error: Error;
      }
    | {
        theme: Themes.light | Themes.dark;
      };
};

export interface Params {
  id: string;
}

export interface ContextState {
  state: InitialState;
  dispatchMiddleware: (dispatch: (...args: any) => void, ...args: any) => void;
  themeState: Themes.light | Themes.dark;
  themeChanger: (text: Themes.light | Themes.dark) => void;
}
