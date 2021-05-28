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
    type:string
    payload: Array<NoteData>;
  } | {
    type:string
    payload: Error;
  } | {
    type:string
    payload: { notes: Array<NoteData>; error: Error };
  };
