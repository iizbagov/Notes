import { InitialState, Action } from "./types/notesInterface";

const SET_OPEN = "SET_OPEN";
const HANDLE_NOTE_CHANGES = "HANDLE_NOTE_CHANGES";
const NOTE_CHANGE_ERROR = "NOTE_CHANGE_ERROR";
const REMOVE_NOTE = "REMOVE_NOTE";
const GET_NOTES = "GET_NOTES";
const CREATE_NOTE = "CREATE_NOTE";
const SAVE = "SAVE";

export const initialState: InitialState = {
  notes: [],
  error: {
    hasError: false,
    onRetry: () => {},
    onCancel: () => {},
  },
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case HANDLE_NOTE_CHANGES:
      return {
        ...state,
        notes: action.notes,
        error: { ...action.payload },
      };
    case NOTE_CHANGE_ERROR:
      return {
        ...state,
        error: {
          ...action.payload,
        },
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: action.notes,
      };
    case GET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: action.notes,
      };
    default:
      return state;
  }
}
