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

export interface ContextState {
  state: InitialState;
  dispatchMiddleware: (dispatch: (...args: any) => void, ...args: any) => void;
}


